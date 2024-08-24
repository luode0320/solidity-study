// 引入以太坊网络测试环境配置
require("@nomiclabs/hardhat-waffle");
// 引入gas费用报告生成器
require("hardhat-gas-reporter");
// 引入自定义的任务，如获取区块编号。yarn hardhat block-number --network sepolia
require("./tasks/block-number");
// 引入环境变量配置，用于安全管理敏感信息
require("dotenv").config();
// 引入代码覆盖率分析工具
require("solidity-coverage");
// 引入合约验证工具，方便在区块链浏览器上验证合约
require("@nomicfoundation/hardhat-verify");

// 修复超时的问题
// https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/2247#discussioncomment-5496669
const { ProxyAgent, setGlobalDispatcher } = require("undici");
const proxyAgent = new ProxyAgent("http://127.0.0.1:7890");
setGlobalDispatcher(proxyAgent);

// 定义配置对象，用于配置Hardhat工具
// 更多配置信息可参考：https://hardhat.org/config/
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

// 设置CoinMarketCap API密钥，用于获取加密货币市场数据
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY;

// 设置Sepolia测试网RPC URL，用于连接以太坊测试网络
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL;

// 设置私钥，用于签署交易
// 注意：私钥应安全保管，避免在公开仓库中明文存储
const PRIVATE_KEY = process.env.PRIVATE_KEY;

// 设置Etherscan API密钥，用于访问Etherscan服务
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

// 导出一个配置对象，用于Hardhat工具的设置
module.exports = {
  // 默认网络设置为hardhat，这是一个本地开发网络
  defaultNetwork: "hardhat",

  // 不同网络的配置
  networks: {
    // 本地开发网络配置
    hardhat: {},

    // Sepolia测试网配置
    sepolia: {
      // Sepolia网络的RPC URL
      url: SEPOLIA_RPC_URL,
      // 用于连接Sepolia网络的账户私钥
      accounts: [PRIVATE_KEY],
      // Sepolia网络的链ID
      chainId: 11155111,
    },

    // 本地主机网络配置
    localhost: {
      // 本地以太坊节点URL
      url: "http://127.0.0.1:8545",
      // 本地网络的链ID
      chainId: 31337,
    },
  },

  // Solidity编译器版本设置
  solidity: "0.8.8",

  // Etherscan配置，用于访问以太坊区块链数据
  etherscan: {
    // Etherscan API密钥
    apiKey: ETHERSCAN_API_KEY,
  },

  // Gas报告器配置，用于生成并输出gas费用报告
  gasReporter: {
    // 启用gas报告功能
    enabled: true,
    // 报告中使用的货币单位
    currency: "USD",
    // CoinMarketCap API密钥，用于获取加密货币价格
    coinmarketcap: COINMARKETCAP_API_KEY,
    // 不同的网络，gas报告会根据网络不同而变化, 默认是 Ethereum 是 ETH, Polygon 是 MATIC
    token: "ETH",
    // gas报告的输出文件: 如果输出到文件就不会在控制台输出
    // outputFile: "gas-report.txt",
    // // 禁用报告中的颜色输出
    // noColors: true,
  },
}
