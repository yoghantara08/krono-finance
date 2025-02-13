// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Ownable} from "openzeppelin-contracts/contracts/access/Ownable.sol";

contract PriceOracle is Ownable {
    mapping(address => uint256) public tokenPrices;

    error InvalidToken();

    event PriceUpdated(address token, uint256 price);

    constructor() Ownable(msg.sender) {}

    function setTokenPrice(address token, uint256 price) external onlyOwner {
        tokenPrices[token] = price;
        emit PriceUpdated(token, price);
    }

    function getTokenPrice(address token) external view returns (uint256) {
        uint256 price = tokenPrices[token];
        if (price == 0) revert InvalidToken();
        return price;
    }
}
