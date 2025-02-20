// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";
import {PriceOracle} from "./PriceOracle.sol";
import {LendingConfig} from "./LendingConfig.sol";

contract LendingPool is Ownable, ReentrancyGuard {
    error InvalidToken();
    error InvalidAmount();
    error InsufficientShares();
    error InsufficientCollateral();
    error InsufficientLiquidity();

    struct UserAccount {
        mapping(address => uint256) supplyShares;
        mapping(address => uint256) borrowShares;
        mapping(address => uint256) collateral;
    }

    struct MarketData {
        uint256 totalSupply;
        uint256 totalBorrow;
        uint256 supplyApy;
        uint256 borrowApy;
    }

    struct TokenState {
        uint256 totalSupplyAssets;
        uint256 totalSupplyShares;
        uint256 totalBorrowAssets;
        uint256 totalBorrowShares;
        uint256 lastAccrued;
    }

    mapping(address => UserAccount) private userAccounts;
    mapping(address => TokenState) public tokenStates;

    address public immutable usdc;
    address public immutable usdt;
    address public immutable wbtc;

    uint256 public borrowRate = 5;
    uint256 public liquidationThreshold = 75;
    uint256 public liquidationBonus = 5;
    uint256 public platformFee = 10;

    event Supply(
        address indexed user,
        address token,
        uint256 amount,
        uint256 shares
    );
    event Withdraw(
        address indexed user,
        address token,
        uint256 shares,
        uint256 amount
    );
    event SupplyCollateral(address indexed user, address token, uint256 amount);
    event WithdrawCollateral(
        address indexed user,
        address token,
        uint256 amount
    );
    event Borrow(
        address indexed user,
        address token,
        uint256 amount,
        uint256 shares
    );
    event Repay(
        address indexed user,
        address token,
        uint256 shares,
        uint256 amount
    );
    event Liquidation(
        address indexed user,
        address liquidator,
        address collateralToken,
        uint256 amount
    );

    constructor(
        address _usdc,
        address _usdt,
        address _wbtc
    ) Ownable(msg.sender) {
        usdc = _usdc;
        usdt = _usdt;
        wbtc = _wbtc;
        tokenStates[usdc].lastAccrued = block.timestamp;
        tokenStates[usdt].lastAccrued = block.timestamp;
    }

    function supply(address token, uint256 amount) external nonReentrant {
        if (token != usdc && token != usdt) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        TokenState storage state = tokenStates[token];

        _accrueInterest(state);

        uint256 shares = state.totalSupplyShares == 0
            ? amount
            : (amount * state.totalSupplyShares) / state.totalSupplyAssets;

        if (!IERC20(token).transferFrom(msg.sender, address(this), amount))
            revert();

        state.totalSupplyAssets += amount;
        state.totalSupplyShares += shares;
        userAccounts[msg.sender].supplyShares[token] += shares;

        emit Supply(msg.sender, token, amount, shares);
    }

    function withdraw(address token, uint256 shares) external nonReentrant {
        UserAccount storage account = userAccounts[msg.sender];
        TokenState storage state = tokenStates[token];

        if (token != usdc && token != usdt) revert InvalidToken();
        if (shares == 0 || shares > account.supplyShares[token])
            revert InsufficientShares();

        _accrueInterest(state);

        uint256 amount = (shares * state.totalSupplyAssets) /
            state.totalSupplyShares;
        if (IERC20(token).balanceOf(address(this)) < amount)
            revert InsufficientLiquidity();

        state.totalSupplyAssets -= amount;
        state.totalSupplyShares -= shares;
        account.supplyShares[token] -= shares;

        if (!IERC20(token).transfer(msg.sender, amount)) revert();

        emit Withdraw(msg.sender, token, shares, amount);
    }

    function borrow(address token, uint256 amount) external nonReentrant {
        if (token != usdc && token != usdt) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        TokenState storage state = tokenStates[token];

        _accrueInterest(state);

        uint256 shares = state.totalBorrowShares == 0
            ? amount
            : (amount * state.totalBorrowShares) / state.totalBorrowAssets;

        state.totalBorrowAssets += amount;
        state.totalBorrowShares += shares;
        userAccounts[msg.sender].borrowShares[token] += shares;

        if (IERC20(token).balanceOf(address(this)) < amount)
            revert InsufficientLiquidity();

        if (!IERC20(token).transfer(msg.sender, amount)) revert();

        emit Borrow(msg.sender, token, amount, shares);
    }

    function repay(address token, uint256 shares) external nonReentrant {
        UserAccount storage account = userAccounts[msg.sender];
        TokenState storage state = tokenStates[token];

        if (token != usdc && token != usdt) revert InvalidToken();
        if (shares == 0 || shares > account.borrowShares[token])
            revert InsufficientShares();

        _accrueInterest(state);

        uint256 amount = (shares * state.totalBorrowAssets) /
            state.totalBorrowShares;

        state.totalBorrowAssets -= amount;
        state.totalBorrowShares -= shares;
        account.borrowShares[token] -= shares;

        if (!IERC20(token).transferFrom(msg.sender, address(this), amount))
            revert();

        emit Repay(msg.sender, token, shares, amount);
    }

    function supplyCollateral(
        address token,
        uint256 amount
    ) external nonReentrant {
        if (token != wbtc) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        if (!IERC20(token).transferFrom(msg.sender, address(this), amount))
            revert();

        userAccounts[msg.sender].collateral[token] += amount;
        tokenStates[token].totalSupplyAssets += amount;

        emit SupplyCollateral(msg.sender, token, amount);
    }

    function withdrawCollateral(
        address token,
        uint256 amount
    ) external nonReentrant {
        UserAccount storage account = userAccounts[msg.sender];
        if (token != wbtc) revert InvalidToken();
        if (amount > account.collateral[token]) revert InsufficientCollateral();

        account.collateral[token] -= amount;
        tokenStates[token].totalSupplyAssets -= amount;

        if (!IERC20(token).transfer(msg.sender, amount)) revert();

        emit WithdrawCollateral(msg.sender, token, amount);
    }

    // Internal functions
    function _accrueInterest(TokenState storage state) internal {
        uint256 elapsedTime = block.timestamp - state.lastAccrued;

        if (elapsedTime > 0 && state.totalBorrowAssets > 0) {
            uint256 utilizationRate = (state.totalBorrowAssets * 100) /
                state.totalSupplyAssets;

            uint256 interestPerYear = (state.totalBorrowAssets *
                borrowRate *
                utilizationRate) / 10000;
            uint256 interest = (interestPerYear * elapsedTime) / 365 days;

            uint256 _platformFee = (interest * platformFee) / 100;
            uint256 supplierInterest = interest - _platformFee;

            state.totalBorrowAssets += interest;
            state.totalSupplyAssets += supplierInterest;
            state.lastAccrued = block.timestamp;
        } else {
            state.lastAccrued = block.timestamp;
        }
    }

    function _getSupplyApy(address token) internal view returns (uint256) {
        TokenState storage state = tokenStates[token];
        if (state.totalSupplyAssets == 0) return 0;

        uint256 utilization = (state.totalBorrowAssets * 100) /
            state.totalSupplyAssets;

        // APY is affected by utilization rate
        return (borrowRate * utilization * (100 - platformFee)) / 10000;
    }

    function getMarketData(
        address token
    ) external view returns (MarketData memory) {
        TokenState storage state = tokenStates[token];

        uint256 _supplyApy = (token == usdc || token == usdt)
            ? _getSupplyApy(token)
            : 0;
        uint256 _borrowApy = (token == usdc || token == usdt) ? borrowRate : 0;

        return
            MarketData({
                totalSupply: state.totalSupplyAssets,
                totalBorrow: state.totalBorrowAssets,
                supplyApy: _supplyApy,
                borrowApy: _borrowApy
            });
    }

    function getUserSupplyShares(
        address user,
        address token
    ) external view returns (uint256) {
        return userAccounts[user].supplyShares[token];
    }

    function getUserBorrowShares(
        address user,
        address token
    ) external view returns (uint256) {
        return userAccounts[user].borrowShares[token];
    }

    function getUserCollateral(
        address user,
        address token
    ) external view returns (uint256) {
        return userAccounts[user].collateral[token];
    }
}
