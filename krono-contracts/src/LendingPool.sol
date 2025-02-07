// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "openzeppelin-contracts/contracts/utils/ReentrancyGuard.sol";

contract LendingPool is Ownable, ReentrancyGuard {
    error InvalidToken();
    error InvalidAmount();
    error InsufficientShares();
    error InsufficientCollateral();
    error InsufficientLiquidity();
    error UnhealthyPosition();
    error HealthyPosition();

    address public immutable usdc;
    address public immutable usdt;
    address public immutable weth;
    address public immutable wbtc;

    uint256 public totalSupplyAssets;
    uint256 public totalSupplyShares;
    uint256 public totalBorrowAssets;
    uint256 public totalBorrowShares;
    uint256 public lastAccrued;

    mapping(address => uint256) public userSupplyShares;
    mapping(address => uint256) public userBorrowShares;
    mapping(address => mapping(address => uint256)) public userCollaterals;

    uint256 public constant BORROW_RATE = 5;
    uint256 public constant LIQUIDATION_THRESHOLD = 75;
    uint256 public constant LIQUIDATION_BONUS = 5;
    uint256 public constant PLATFORM_FEE = 10;

    mapping(address => uint256) public tokenPrices;

    event Supply(address indexed user, uint256 amount, uint256 shares);
    event Withdraw(address indexed user, uint256 shares, uint256 amount);
    event SupplyCollateral(address indexed user, address token, uint256 amount);
    event WithdrawCollateral(
        address indexed user,
        address token,
        uint256 amount
    );
    event Borrow(address indexed user, uint256 amount, uint256 shares);
    event Repay(address indexed user, uint256 shares, uint256 amount);
    event Liquidation(
        address indexed user,
        address liquidator,
        address collateralToken,
        uint256 amount
    );

    constructor(
        address _usdc,
        address _usdt,
        address _weth,
        address _wbtc
    ) Ownable(msg.sender) {
        usdc = _usdc;
        usdt = _usdt;
        weth = _weth;
        wbtc = _wbtc;
        lastAccrued = block.timestamp;
    }

    // SUPPLY (USDC or USDT)
    function supply(address _token, uint256 _amount) external nonReentrant {
        if (_token != usdc && _token != usdt) revert InvalidToken();
        if (_amount == 0) revert InvalidAmount();

        _accrueInterest();

        uint256 shares = totalSupplyShares == 0
            ? _amount
            : (_amount * totalSupplyShares) / totalSupplyAssets;

        if (!IERC20(_token).transferFrom(msg.sender, address(this), _amount))
            revert();

        totalSupplyAssets += _amount;
        totalSupplyShares += shares;
        userSupplyShares[msg.sender] += shares;

        emit Supply(msg.sender, _amount, shares);
    }

    // WITHDRAW SUPPLY (USDC or USDT)
    function withdraw(address _token, uint256 _shares) external nonReentrant {
        if (_token != usdc && _token != usdt) revert InvalidToken();
        if (_shares == 0 || _shares > userSupplyShares[msg.sender])
            revert InsufficientShares();

        _accrueInterest();

        uint256 amount = (_shares * totalSupplyAssets) / totalSupplyShares;
        if (IERC20(_token).balanceOf(address(this)) < amount)
            revert InsufficientLiquidity();

        totalSupplyAssets -= amount;
        totalSupplyShares -= _shares;
        userSupplyShares[msg.sender] -= _shares;

        if (!IERC20(_token).transfer(msg.sender, amount)) revert();

        emit Withdraw(msg.sender, _shares, amount);
    }

    // SUPPLY COLLATERAL (WETH or WBTC)
    function supplyCollateral(
        address _token,
        uint256 _amount
    ) external nonReentrant {
        if (_token != weth && _token != wbtc) revert InvalidToken();
        if (_amount == 0) revert InvalidAmount();

        if (!IERC20(_token).transferFrom(msg.sender, address(this), _amount))
            revert();

        userCollaterals[msg.sender][_token] += _amount;

        emit SupplyCollateral(msg.sender, _token, _amount);
    }

    // WITHDRAW COLLATERAL
    function withdrawCollateral(
        address _token,
        uint256 _amount
    ) external nonReentrant {
        if (_token != weth && _token != wbtc) revert InvalidToken();
        if (_amount > userCollaterals[msg.sender][_token])
            revert InsufficientCollateral();
        if (!_isHealthy(msg.sender)) revert UnhealthyPosition();

        userCollaterals[msg.sender][_token] -= _amount;
        if (!IERC20(_token).transfer(msg.sender, _amount)) revert();

        emit WithdrawCollateral(msg.sender, _token, _amount);
    }

    // BORROW (USDC or USDT)
    function borrow(address _token, uint256 _amount) external nonReentrant {
        if (_token != usdc && _token != usdt) revert InvalidToken();
        if (_amount == 0) revert InvalidAmount();

        _accrueInterest();

        uint256 shares = totalBorrowShares == 0
            ? _amount
            : (_amount * totalBorrowShares) / totalBorrowAssets;

        totalBorrowAssets += _amount;
        totalBorrowShares += shares;
        userBorrowShares[msg.sender] += shares;

        if (!_isHealthy(msg.sender)) revert UnhealthyPosition();
        if (IERC20(_token).balanceOf(address(this)) < _amount)
            revert InsufficientLiquidity();

        if (!IERC20(_token).transfer(msg.sender, _amount)) revert();

        emit Borrow(msg.sender, _amount, shares);
    }

    // REPAY DEBT
    function repay(address _token, uint256 _shares) external nonReentrant {
        if (_token != usdc && _token != usdt) revert InvalidToken();
        if (_shares == 0 || _shares > userBorrowShares[msg.sender])
            revert InsufficientShares();

        _accrueInterest();

        uint256 amount = (_shares * totalBorrowAssets) / totalBorrowShares;

        totalBorrowAssets -= amount;
        totalBorrowShares -= _shares;
        userBorrowShares[msg.sender] -= _shares;

        if (!IERC20(_token).transferFrom(msg.sender, address(this), amount))
            revert();

        emit Repay(msg.sender, _shares, amount);
    }

    // LIQUIDATION
    function liquidate(
        address _user,
        address _collateralToken
    ) external nonReentrant {
        if (_isHealthy(_user)) revert HealthyPosition();
        if (_collateralToken != weth && _collateralToken != wbtc)
            revert InvalidToken();

        uint256 collateralAmount = userCollaterals[_user][_collateralToken];
        if (collateralAmount == 0) revert InsufficientCollateral();

        uint256 bonus = (collateralAmount * LIQUIDATION_BONUS) / 100;
        uint256 totalCollateralToLiquidator = collateralAmount + bonus;

        userCollaterals[_user][_collateralToken] = 0;
        if (
            !IERC20(_collateralToken).transfer(
                msg.sender,
                totalCollateralToLiquidator
            )
        ) revert();

        emit Liquidation(
            _user,
            msg.sender,
            _collateralToken,
            totalCollateralToLiquidator
        );
    }

    function _accrueInterest() internal {
        uint256 elapsedTime = block.timestamp - lastAccrued;
        if (elapsedTime > 0 && totalBorrowAssets > 0) {
            uint256 interestPerYear = (totalBorrowAssets * BORROW_RATE) / 100;
            uint256 interest = (interestPerYear * elapsedTime) / 365 days;

            uint256 platformFee = (interest * PLATFORM_FEE) / 100;
            uint256 supplierInterest = interest - platformFee;

            totalBorrowAssets += interest;
            totalSupplyAssets += supplierInterest;
            lastAccrued = block.timestamp;
        }
    }

    function _isHealthy(address _user) internal view returns (bool) {
        if (userBorrowShares[_user] == 0) return true;

        uint256 borrowValue = (userBorrowShares[_user] * totalBorrowAssets) /
            totalBorrowShares;
        uint256 collateralValue = (userCollaterals[_user][weth] *
            tokenPrices[weth]) +
            (userCollaterals[_user][wbtc] * tokenPrices[wbtc]);

        return
            (borrowValue * 100) <=
            (collateralValue * LIQUIDATION_THRESHOLD) / 100;
    }

    function setTokenPrice(address _token, uint256 _price) external onlyOwner {
        if (_token != weth && _token != wbtc) revert InvalidToken();
        tokenPrices[_token] = _price;
    }
}
