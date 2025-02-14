// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/TokenFaucet.sol";

contract DeployTokenFaucet is Script {
    function run() external {
        vm.startBroadcast();
        new TokenFaucet();
        vm.stopBroadcast();
    }
}
