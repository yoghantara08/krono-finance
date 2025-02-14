// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {IERC20} from "openzeppelin-contracts/contracts/token/ERC20/IERC20.sol";
import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract TokenFaucet is Ownable {
    uint256 public constant FAUCET_AMOUNT = 1000 * 10 ** 18;
    uint256 public cooldownTime = 1 days;

    mapping(address => uint256) public lastClaimed;
    mapping(string => address) public tokenAddresses;

    event TokensClaimed(address indexed user, string token, uint256 amount);

    constructor() Ownable(msg.sender) {
        tokenAddresses["USDC"] = 0x47a347287D6178591208c6681fD4c7bffd9DA6fB;
        tokenAddresses["USDT"] = 0x2F2DD40B0111fe8659d1B7e36BaB815480075167;
        tokenAddresses["WBTC"] = 0xAc69Dc846063E0C0cefec2036a84FeF9A4a7061a;
        tokenAddresses["MANTA"] = 0x77f0bd951088fE4b8Cd756F1a0E0fc904C5eC981;
    }

    function claimTokens(string memory tokenSymbol) external {
        require(
            block.timestamp >= lastClaimed[msg.sender] + cooldownTime,
            "Wait before claiming again"
        );

        address tokenAddress = tokenAddresses[tokenSymbol];
        require(tokenAddress != address(0), "Invalid token");

        IERC20 token = IERC20(tokenAddress);
        require(
            token.balanceOf(address(this)) >= FAUCET_AMOUNT,
            "Faucet is empty!"
        );

        lastClaimed[msg.sender] = block.timestamp;
        token.transfer(msg.sender, FAUCET_AMOUNT);

        emit TokensClaimed(msg.sender, tokenSymbol, FAUCET_AMOUNT);
    }

    function refillFaucet(address token, uint256 amount) external onlyOwner {
        IERC20(token).transferFrom(msg.sender, address(this), amount);
    }

    function setCooldown(uint256 newCooldown) external onlyOwner {
        cooldownTime = newCooldown;
    }

    function setTokenAddress(
        string memory tokenSymbol,
        address tokenAddress
    ) external onlyOwner {
        tokenAddresses[tokenSymbol] = tokenAddress;
    }
}
