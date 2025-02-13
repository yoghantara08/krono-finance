// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/LendingConfig.sol";
import "../src/PriceOracle.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();
        new LendingConfig();
        new PriceOracle();
        vm.stopBroadcast();
    }
}
