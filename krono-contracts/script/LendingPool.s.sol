// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "forge-std/Script.sol";
import "../src/LendingPool.sol";

contract DeployLendingPool is Script {
    function run() external {
        vm.startBroadcast();
        new LendingPool(
            0x47a347287D6178591208c6681fD4c7bffd9DA6fB,
            0x2F2DD40B0111fe8659d1B7e36BaB815480075167,
            0xAc69Dc846063E0C0cefec2036a84FeF9A4a7061a,
            0x77f0bd951088fE4b8Cd756F1a0E0fc904C5eC981,
            0xa1b13cBdfC252CBE586295A1ca832C184d782bde,
            0x6E8E2E6EEcd9665fEB4812AEe524e299dBB8d983
        );
        vm.stopBroadcast();
    }
}
