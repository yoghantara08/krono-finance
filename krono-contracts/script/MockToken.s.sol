// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import {Script} from "forge-std/Script.sol";
import {MockToken} from "../src/MockToken.sol";

contract Deploy is Script {
    function run() external {
        vm.startBroadcast();

        // Deploy mock tokens
        new MockToken("USD Coin", "USDC");
        new MockToken("Tether USD", "USDT");
        new MockToken("Wrapped Bitcoin", "WBTC");
        new MockToken("Manta", "MANTA");

        vm.stopBroadcast();
    }
}
