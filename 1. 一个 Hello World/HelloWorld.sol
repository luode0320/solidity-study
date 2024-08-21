// SPDX-License-Identifier: MIT
// Solidity版本声明
pragma solidity ^0.8.0;

// sepolia 测试网合约地址: 0xEaE27D9ad1AAd678B9B391375d3642843A566961
contract HelloWorld {
    // 网络:  事件声明
    event Log(address indexed sender, string message);

    // 构造的功能
    address owner;

    // 构造的功能
    constructor() {
        owner = msg.sender; // 设置的合同部署人员作为所有者
    }

    // 发出Log事件的外部函数
    function test() external {
        emit Log(msg.sender, "Hello EVM!"); // 发送带有发件人地址和消息的日志事件
    }

    // 外部视图功能，用于获取问候信息
    function get() external view returns (string memory greeting) {
        if (owner == msg.sender) {
            return greeting = "Hello, world!"; // 如果来电者是主人，则返回问候信息
        }
    }
}
