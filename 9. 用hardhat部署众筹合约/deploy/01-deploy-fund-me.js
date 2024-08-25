// 导入必要的模块和配置
const { network } = require("hardhat")
const { networkConfig, developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")
require("dotenv").config()

// 修复超时的问题
// https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/2247#discussioncomment-5496669
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
setGlobalDispatcher(proxyAgent);

// 部署FundMe合约的主要函数
module.exports = async ({ getNamedAccounts, deployments }) => {
    // 解构赋值，提取deployments和日志功能
    const { deploy, log } = deployments
    // 获取部署账户
    const { deployer } = await getNamedAccounts()
    // 获取当前网络的链ID
    const chainId = network.config.chainId

    // 定义以太坊/美元价格饲料的地址
    let ethUsdPriceFeedAddress
    // 如果是本地硬编码网络，使用模拟的价格饲料
    if (chainId == 31337) {
        const ethUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddress = ethUsdAggregator.address
    } else {
        // 否则，使用实际网络配置的价格饲料地址
        ethUsdPriceFeedAddress = networkConfig[chainId]["ethUsdPriceFeed"]
    }

    // 开始部署日志
    log("----------------------------------------------------")
    log("部署FundMe并等待确认...")
    // 部署FundMe合约
    const fundMe = await deploy("FundMe", {
        from: deployer,
        args: [ethUsdPriceFeedAddress],
        log: true, // 开启交易日志
        waitConfirmations: network.config.blockConfirmations || 1, // 等待确认
    })
    // 部署成功日志
    log(`部署成功: ${fundMe.address}`)

    // 验证合约，除非在开发链上且有Etherscan API密钥
    if (
        !developmentChains.includes(network.name) &&
        process.env.ETHERSCAN_API_KEY
    ) {
        await verify(fundMe.address, [ethUsdPriceFeedAddress])
    }
}

// 定义部署标签
module.exports.tags = ["all", "fundme"]