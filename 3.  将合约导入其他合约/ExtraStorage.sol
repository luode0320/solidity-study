// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

// sepolia 测试网合约地址: 0xd0EaC75a55304146058A5dFE4B7E9D6592fB162e
contract ExtraStorage is SimpleStorage {
    // 从SimpleStorage合约中 override 重写存储功能
    function store(uint256 _favoriteNumber) public override {
        // 在存储之前将favoriteNumber增加5
        favoriteNumber = _favoriteNumber + 5;
    }
}