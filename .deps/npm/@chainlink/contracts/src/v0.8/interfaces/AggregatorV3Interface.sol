// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


// 定义一个接口，用于与 Chainlink 价格馈送交互
interface AggregatorV3Interface {
  // 返回价格馈送的小数位数
  function decimals() external view returns (uint8);

  // 返回价格馈送的描述字符串
  function description() external view returns (string memory);

  // 返回价格馈送的版本号
  function version() external view returns (uint256);

  // 返回指定轮次的数据
  // 参数说明：
  // roundId: 轮次的唯一标识符。
  // answer: 该轮次的价格。
  // startedAt: 轮次开始的时间戳。
  // updatedAt: 轮次最后更新的时间戳。
  // answeredInRound: 价格是在哪个轮次确定的
  function getRoundData(
    uint80 _roundId
  ) external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);

  // 返回最新轮次的数据
  // 参数说明：
  // roundId: 轮次的唯一标识符。
  // answer: 该轮次的价格。
  // startedAt: 轮次开始的时间戳。
  // updatedAt: 轮次最后更新的时间戳。
  // answeredInRound: 价格是在哪个轮次确定的
  function latestRoundData()
    external
    view
    returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound);
}
