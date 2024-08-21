// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

// sepolia 测试网合约地址: 0xB71fA27060F9c901746360317f9Cd98AFE3e2d22
contract StorageFactory {
    SimpleStorage[] public simpleStorageArray;

    // 创建新的SimpleStorage合约并将其添加到数组中
    function createSimpleStorageContract() public {
        SimpleStorage simpleStorage = new SimpleStorage();
        simpleStorageArray.push(simpleStorage);
    }

    // 在数组中的特定SimpleStorage合约中存储一个数字
    function sfStore(uint256 _simpleStorageIndex, uint256 _simpleStorageNumber) public {
        simpleStorageArray[_simpleStorageIndex].store(_simpleStorageNumber);
    }

    // 从数组中的特定SimpleStorage合约获取一个数字
    function sfGet(uint256 _simpleStorageIndex) public view returns (uint256) {
        return simpleStorageArray[_simpleStorageIndex].retrieve();
    }
}