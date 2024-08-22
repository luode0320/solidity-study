// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

// 注意: 这个现象是在 solidity < 0.8 的版本出现的, 之后的版本会检查精度溢出的情况
contract SafeMathTest{
    // uint8最大值255
    uint8 public bigNumber = 255;

    // 如果 bigNumber 超过了255, 继续 add 加一, 就会变成 0。
    // 注意: 这个现象是在 solidity < 0.8 的版本出现的
    function add() public {
        bigNumber = bigNumber+1;

        // 如果使用 0.8 版本以上, 使用 uncheched 可能会让你减少 gas, 但是他会出现精度溢出的情况
        // uncheched {bigNumber = bigNumber+1;}
    }
}