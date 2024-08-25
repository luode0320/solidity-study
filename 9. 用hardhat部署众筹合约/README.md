# 依赖

```json
"devDependencies": {
  // 用于验证部署在以太坊主网上的智能合约
  "@nomicfoundation/hardhat-verify": "^2.0.3",
  
  // 使用hardhat-deploy-ethers替代标准的@nomiclabs/hardhat-ethers插件
  "@nomiclabs/hardhat-ethers": "npm:hardhat-deploy-ethers@^0.3.0-beta.13",

  // 用于将智能合约部署到以太坊网络，并自动上传源代码到Etherscan进行验证
  "@nomiclabs/hardhat-etherscan": "^3.0.0",

  // 提供了编译、部署智能合约所需的工具，以及集成测试环境
  "@nomiclabs/hardhat-waffle": "^2.0.2",

  // JavaScript断言库，用于编写测试用例
  "chai": "^4.3.4",

  // 用于构建以太坊应用程序的库，提供了Web3 API的现代替代方案
  "ethereum-waffle": "^3.4.0",

  // 一个现代以太坊JavaScript库
  "ethers": "^5.5.3",

  // 一个现代以太坊开发框架
  "hardhat": "^2.8.3",

  // 用于自动化部署智能合约的硬帽插件
  "hardhat-deploy": "^0.9.29",

  // 用于报告Gas消耗的硬帽插件
  "hardhat-gas-reporter": "^1.0.7",

  // 用于测量和报告Solidity智能合约的代码覆盖率
  "solidity-coverage": "^0.7.18",

  // 提供Chainlink预言机的智能合约模板
  "@chainlink/contracts": "^0.3.1",

  // 用于管理环境变量的Node.js模块
  "dotenv": "^14.2.0",

  // Prettier插件，用于格式化Solidity代码
  "prettier-plugin-solidity": "^1.0.0-beta.19",

  // Solidity语法检查工具
  "solhint": "^3.3.7",

  // 一个轻量级的HTTP客户端，用于替代Node.js的原生http模块
  "undici": "^6.19.8"
}
```


# 命令解释

```shell
全局选项:
选项	              描述
--config	          指定一个 Hardhat 配置文件。
--emoji	            在消息中使用表情符号。
--flamegraph	      为你的 Hardhat 任务生成火焰图。
--help	            显示此帮助信息，或如果提供了任务名称，则显示该任务的帮助信息。
--max-memory	      设置 Hardhat 可使用的最大内存量。
--network	          指定连接的网络。
--show-stack-traces	显示堆栈跟踪（在 CI 服务器上始终启用）。
--tsconfig	        指定一个 TypeScript 配置文件。
--typecheck	        启用 TypeScript 对你的脚本/测试进行类型检查。
--verbose	          启用 Hardhat 的详细日志记录。
--version	          显示 Hardhat 的版本。

可用的任务:
任务	              描述
check	              检查你需要的任何内容。
clean	              清除缓存并删除所有制品。
compile	            编译整个项目，构建所有制品。
console	            打开一个 Hardhat 控制台。
coverage	          为测试生成代码覆盖率报告。
deploy              部署合同
etherscan-verify    向etherscan提交合约源代码
export              将指定网络的合约部署导出到一个文件中
export-artifacts
flatten	            展平并打印合约及其依赖项。如果没有指定文件，则展平项目中的所有合约。
gas-reporter:merge	（未提供详细描述）
help	              打印此帮助信息。
node	              启动一个基于 Hardhat Network 的 JSON-RPC 服务器。
run	                在编译项目后运行用户定义的脚本。
sourcify            将合同源代码提交给sourcify (https://sourcify.dev)
test	              运行 Mocha 测试。
verify	            在 Etherscan 或 Sourcify 上验证合约。

可用的任务范围:
范围	              描述
vars	            管理你的配置变量。
```

# 部署

```shell
yarn hardhat deploy --network sepolia
```