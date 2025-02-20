// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/LendingPool.sol";

contract DeployLendingPool is Script {
    function run() external {
        vm.startBroadcast();
        new LendingPool(
            0xF242275d3a6527d877f2c927a82D9b057609cc71,
            0x05D032ac25d322df992303dCa074EE7392C117b9,
            0x03C7054BCB39f7b2e5B2c7AcB37583e32D70Cfa3
        );
        vm.stopBroadcast();
    }
}
