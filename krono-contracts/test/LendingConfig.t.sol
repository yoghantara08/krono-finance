// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Test.sol";
import "../src/LendingConfig.sol";

contract LendingConfigTest is Test {
    LendingConfig lendingConfig;
    address owner = address(this);

    function setUp() public {
        lendingConfig = new LendingConfig();
    }

    function testInitialValues() public view {
        assertEq(lendingConfig.borrowRate(), 5);
        assertEq(lendingConfig.liquidationThreshold(), 75);
        assertEq(lendingConfig.liquidationBonus(), 5);
        assertEq(lendingConfig.platformFee(), 10);
    }

    function testSetBorrowRate() public {
        lendingConfig.setBorrowRate(8);
        assertEq(lendingConfig.borrowRate(), 8);
    }

    function testSetLiquidationThreshold() public {
        lendingConfig.setLiquidationThreshold(80);
        assertEq(lendingConfig.liquidationThreshold(), 80);
    }

    function testSetLiquidationBonus() public {
        lendingConfig.setLiquidationBonus(7);
        assertEq(lendingConfig.liquidationBonus(), 7);
    }

    function testSetPlatformFee() public {
        lendingConfig.setPlatformFee(12);
        assertEq(lendingConfig.platformFee(), 12);
    }
}
