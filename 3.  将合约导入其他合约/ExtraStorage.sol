// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "./SimpleStorage.sol";

contract ExtraStorage is SimpleStorage {
    // 从SimpleStorage合约中 override 重写存储功能
    function store(uint256 _favoriteNumber) public override {
        // 在存储之前将favoriteNumber增加5
        favoriteNumber = _favoriteNumber + 5;
    }
}