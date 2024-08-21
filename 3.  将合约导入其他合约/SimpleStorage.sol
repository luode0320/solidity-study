// SPDX-License-Identifier: MIT
// Solidity版本声明
pragma solidity ^0.8.8;

// sepolia 测试网合约地址: 0x6a13C698E3ad3672aa53bc49bABbf33a843f23F9
contract SimpleStorage {
    uint256 favoriteNumber; // 状态变量，用于存储单个收藏夹数字

    // 存储收藏号码的功能, 并且这个函数是可以被 virtual 重写的
    function store(uint256 _favoriteNumber) public  virtual {
        favoriteNumber = _favoriteNumber;
    }

    // 检索存储的收藏夹号码的功能
    function retrieve() public view returns (uint256) {
        return favoriteNumber;
    }

    // 结构用于存储一个人最喜欢的号码和姓名
    struct People {
        uint256 favoriteNumber;
        string name;
    }

    People[] public people; // 用于存储多个People结构的数组

    mapping(string => uint256) public nameToFavoriteNumber; // 按名称映射到存储喜爱的数字

    // 功能用于添加一个新用户，并添加他们最喜欢的号码和姓名
    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        people.push(People(_favoriteNumber, _name)); // 将新的People结构体添加到People数组中
        nameToFavoriteNumber[_name] = _favoriteNumber; // 用新的收藏夹数字更新映射
    }
}