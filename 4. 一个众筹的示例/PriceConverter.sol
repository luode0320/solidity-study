// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

// 为什么这是一个库而不是抽象合约？为什么不是一个接口？
// 作为一个库，它可以被多个合约复用，而不需要部署多个实例。
// 如果是抽象合约或接口，它只能定义行为，不能包含具体的实现逻辑。
library PriceConverter {
    // 为什么这个函数是内部的（internal）而不是公共的（public）？
    // 因为我们希望这个函数只在这个库内部使用，避免外部直接访问。
    function getPrice() internal view returns (uint256) {
        // Sepolia 测试网络上的 ETH / USD 价格馈送地址
        // https://docs.chain.link/data-feeds/price-feeds/addresses#Sepolia%20Testnet
        AggregatorV3Interface priceFeed = AggregatorV3Interface(
            0x694AA1769357215DE4FAC081bf1f309aDC325306
        );

        // 调用 latestRoundData 方法获取最新一轮的价格数据
        (, int256 answer, , , ) = priceFeed.latestRoundData();

        // ETH/USD 价格，单位为 18 个小数位
        // 注意，Chainlink 价格馈送返回的价格是以 8 个小数位的形式给出的。
        // 为了得到以 18 个小数位形式的价格，我们需要乘以 10^10。
        return uint256(answer * 10000000000);
        // 或者（两者结果相同）
        // return uint256(answer * 1e10); // 1* 10 ** 10 == 10000000000
    }

    // 获取指定数量以太币对应的美元价值
    function getConversionRate(uint256 ethAmount)
        internal
        view
        returns (uint256)
    {
        // 获取 ETH/USD 的价格
        uint256 ethPrice = getPrice();

        // 计算指定数量以太币对应的美元价值
        // 乘以以太币的价格，然后除以 10^18，因为以太币的价格是以 18 个小数位的形式给出的。
        uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1000000000000000000;
        // 或者（两者结果相同）
        // uint256 ethAmountInUsd = (ethPrice * ethAmount) / 1e18; // 1 * 10 ** 18 == 1000000000000000000
        
        // 返回实际的 ETH/USD 转换率，调整额外的 0。
        return ethAmountInUsd;
    }
}