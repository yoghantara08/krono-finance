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
    error UnhealthyPosition();
    error HealthyPosition();

    struct UserAccount {
        uint256 supplyShares;
        uint256 borrowShares;
        mapping(address => uint256) collateral;
    }

    struct MarketData {
        uint256 totalSupply;
        uint256 totalBorrow;
        uint256 supplyApy;
        uint256 borrowApy;
    }

    address public immutable usdc;
    address public immutable usdt;
    address public immutable wbtc;
    address public immutable manta;

    PriceOracle public immutable priceOracle;
    LendingConfig public immutable config;

    uint256 public totalSupplyAssets;
    uint256 public totalSupplyShares;
    uint256 public totalBorrowAssets;
    uint256 public totalBorrowShares;
    uint256 public lastAccrued;

    mapping(address => UserAccount) public userAccounts;
    mapping(address => uint256) public totalDeposits;
    mapping(address => uint256) public totalBorrows;

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
        address _wbtc,
        address _manta,
        address _priceOracle,
        address _config
    ) Ownable(msg.sender) {
        usdc = _usdc;
        usdt = _usdt;
        wbtc = _wbtc;
        manta = _manta;
        priceOracle = PriceOracle(_priceOracle);
        config = LendingConfig(_config);
        lastAccrued = block.timestamp;
    }

    // View functions for dashboard
    function getUserNetWorth(address user) external view returns (uint256) {
        UserAccount storage account = userAccounts[user];

        // Calculate supplies in USD
        uint256 supplyValue = (account.supplyShares * totalSupplyAssets) /
            totalSupplyShares;

        // Calculate borrows in USD
        uint256 borrowValue = (account.borrowShares * totalBorrowAssets) /
            totalBorrowShares;

        // Calculate collateral in USD
        uint256 collateralValue = (account.collateral[wbtc] *
            priceOracle.getTokenPrice(wbtc)) +
            (account.collateral[manta] * priceOracle.getTokenPrice(manta));

        return (supplyValue + collateralValue) - borrowValue;
    }

    function getMarketData(
        address token
    ) external view returns (MarketData memory) {
        return
            MarketData({
                totalSupply: totalDeposits[token],
                totalBorrow: totalBorrows[token],
                supplyApy: _getSupplyApy(),
                borrowApy: config.borrowRate()
            });
    }

    // Core functions
    function supply(address token, uint256 amount) external nonReentrant {
        if (token != usdc && token != usdt) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        _accrueInterest();

        uint256 shares = totalSupplyShares == 0
            ? amount
            : (amount * totalSupplyShares) / totalSupplyAssets;

        if (!IERC20(token).transferFrom(msg.sender, address(this), amount))
            revert();

        totalSupplyAssets += amount;
        totalSupplyShares += shares;
        userAccounts[msg.sender].supplyShares += shares;
        totalDeposits[token] += amount;

        emit Supply(msg.sender, token, amount, shares);
    }

    function withdraw(address token, uint256 shares) external nonReentrant {
        UserAccount storage account = userAccounts[msg.sender];
        if (token != usdc && token != usdt) revert InvalidToken();
        if (shares == 0 || shares > account.supplyShares)
            revert InsufficientShares();

        _accrueInterest();

        uint256 amount = (shares * totalSupplyAssets) / totalSupplyShares;
        if (IERC20(token).balanceOf(address(this)) < amount)
            revert InsufficientLiquidity();

        totalSupplyAssets -= amount;
        totalSupplyShares -= shares;
        account.supplyShares -= shares;
        totalDeposits[token] -= amount;

        if (!IERC20(token).transfer(msg.sender, amount)) revert();

        emit Withdraw(msg.sender, token, shares, amount);
    }

    function supplyCollateral(
        address token,
        uint256 amount
    ) external nonReentrant {
        if (token != wbtc && token != manta) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        if (!IERC20(token).transferFrom(msg.sender, address(this), amount))
            revert();

        userAccounts[msg.sender].collateral[token] += amount;

        emit SupplyCollateral(msg.sender, token, amount);
    }

    function withdrawCollateral(
        address token,
        uint256 amount
    ) external nonReentrant {
        UserAccount storage account = userAccounts[msg.sender];
        if (token != wbtc && token != manta) revert InvalidToken();
        if (amount > account.collateral[token]) revert InsufficientCollateral();
        if (!_isHealthy(msg.sender)) revert UnhealthyPosition();

        account.collateral[token] -= amount;
        if (!IERC20(token).transfer(msg.sender, amount)) revert();

        emit WithdrawCollateral(msg.sender, token, amount);
    }

    function borrow(address token, uint256 amount) external nonReentrant {
        if (token != usdc && token != usdt) revert InvalidToken();
        if (amount == 0) revert InvalidAmount();

        _accrueInterest();

        uint256 shares = totalBorrowShares == 0
            ? amount
            : (amount * totalBorrowShares) / totalBorrowAssets;

        totalBorrowAssets += amount;
        totalBorrowShares += shares;
        userAccounts[msg.sender].borrowShares += shares;
        totalBorrows[token] += amount;

        if (!_isHealthy(msg.sender)) revert UnhealthyPosition();
        if (IERC20(token).balanceOf(address(this)) < amount)
            revert InsufficientLiquidity();

        if (!IERC20(token).transfer(msg.sender, amount)) revert();

        emit Borrow(msg.sender, token, amount, shares);
    }

    function repay(address token, uint256 shares) external nonReentrant {
        UserAccount storage account = userAccounts[msg.sender];
        if (token != usdc && token != usdt) revert InvalidToken();
        if (shares == 0 || shares > account.borrowShares)
            revert InsufficientShares();

        _accrueInterest();

        uint256 amount = (shares * totalBorrowAssets) / totalBorrowShares;

        totalBorrowAssets -= amount;
        totalBorrowShares -= shares;
        account.borrowShares -= shares;
        totalBorrows[token] -= amount;

        if (!IERC20(token).transferFrom(msg.sender, address(this), amount))
            revert();

        emit Repay(msg.sender, token, shares, amount);
    }

    // Internal functions
    function _accrueInterest() internal {
        uint256 elapsedTime = block.timestamp - lastAccrued;
        if (elapsedTime > 0 && totalBorrowAssets > 0) {
            uint256 interestPerYear = (totalBorrowAssets *
                config.borrowRate()) / 100;
            uint256 interest = (interestPerYear * elapsedTime) / 365 days;

            uint256 platformFee = (interest * config.platformFee()) / 100;
            uint256 supplierInterest = interest - platformFee;

            totalBorrowAssets += interest;
            totalSupplyAssets += supplierInterest;
            lastAccrued = block.timestamp;
        }
    }

    function _isHealthy(address user) internal view returns (bool) {
        UserAccount storage account = userAccounts[user];
        if (account.borrowShares == 0) return true;

        uint256 borrowValue = (account.borrowShares * totalBorrowAssets) /
            totalBorrowShares;
        uint256 collateralValue = (account.collateral[wbtc] *
            priceOracle.getTokenPrice(wbtc)) +
            (account.collateral[manta] * priceOracle.getTokenPrice(manta));

        return
            (borrowValue * 100) <=
            (collateralValue * config.liquidationThreshold()) / 100;
    }

    function _getSupplyApy() internal view returns (uint256) {
        uint256 borrowRate = config.borrowRate();
        uint256 platformFee = config.platformFee();
        return (borrowRate * (100 - platformFee)) / 100;
    }
}
