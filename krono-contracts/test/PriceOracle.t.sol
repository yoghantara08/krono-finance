// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/PriceOracle.sol";

contract PriceOracleTest is Test {
    PriceOracle oracle;
    address owner = address(this);
    address tokenA = address(0x123);

    function setUp() public {
        oracle = new PriceOracle();
    }

    function testSetTokenPrice() public {
        oracle.setTokenPrice(tokenA, 1000);
        assertEq(oracle.tokenPrices(tokenA), 1000);
    }

    function testFailSetTokenPrice_NotOwner() public {
        vm.prank(address(0x456)); // Impersonate another address
        oracle.setTokenPrice(tokenA, 1000); // Should fail
    }

    function testGetTokenPrice() public {
        oracle.setTokenPrice(tokenA, 500);
        assertEq(oracle.getTokenPrice(tokenA), 500);
    }

    function testFailGetTokenPrice_InvalidToken() public view {
        oracle.getTokenPrice(address(0x789)); // Should revert
    }

    function testMultipleTokenPrices() public {
        address tokenB = address(0x222);
        address tokenC = address(0x333);
        address tokenD = address(0x444);

        oracle.setTokenPrice(tokenA, 1500);
        oracle.setTokenPrice(tokenB, 3000);
        oracle.setTokenPrice(tokenC, 500);
        oracle.setTokenPrice(tokenD, 8000);

        assertEq(oracle.getTokenPrice(tokenA), 1500);
        assertEq(oracle.getTokenPrice(tokenB), 3000);
        assertEq(oracle.getTokenPrice(tokenC), 500);
        assertEq(oracle.getTokenPrice(tokenD), 8000);
    }
}
