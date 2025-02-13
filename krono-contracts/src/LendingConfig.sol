// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract LendingConfig is Ownable {
    uint256 public borrowRate = 5;
    uint256 public liquidationThreshold = 75;
    uint256 public liquidationBonus = 5;
    uint256 public platformFee = 10;

    event ConfigUpdated(string parameter, uint256 value);

    constructor() Ownable(msg.sender) {}

    function setBorrowRate(uint256 newRate) external onlyOwner {
        borrowRate = newRate;
        emit ConfigUpdated("borrowRate", newRate);
    }

    function setLiquidationThreshold(uint256 newThreshold) external onlyOwner {
        liquidationThreshold = newThreshold;
        emit ConfigUpdated("liquidationThreshold", newThreshold);
    }

    function setLiquidationBonus(uint256 newBonus) external onlyOwner {
        liquidationBonus = newBonus;
        emit ConfigUpdated("liquidationBonus", newBonus);
    }

    function setPlatformFee(uint256 newFee) external onlyOwner {
        platformFee = newFee;
        emit ConfigUpdated("platformFee", newFee);
    }
}
