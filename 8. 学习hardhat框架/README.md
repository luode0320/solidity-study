# 依赖说明

```json
"devDependencies": {
  // 用于验证部署在以太坊主网上的智能合约
  "@nomicfoundation/hardhat-verify": "^2.0.3",

  // 允许使用Ethers.js作为硬帽（Hardhat）的任务运行器插件
  "@nomiclabs/hardhat-ethers": "^2.0.4",

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
  "hardhat": "^2.22.9",

  // 用于报告Gas消耗的硬帽插件
  "hardhat-gas-reporter": "^1.0.7",

  // 用于测量和报告Solidity智能合约的代码覆盖率
  "solidity-coverage": "^0.7.18",

  // 一个轻量级的HTTP客户端，用于替代Node.js的原生http模块
  "undici": "^6.19.8"
}
```

# 安装hardhat

```shell
cd 8.\ 学习hardhat框架/
yarn add --dev hardhat
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
block-number	      打印当前区块号。
check	              检查你需要的任何内容。
clean	              清除缓存并删除所有制品。
compile	            编译整个项目，构建所有制品。
console	            打开一个 Hardhat 控制台。
coverage	          为测试生成代码覆盖率报告。
flatten	            展平并打印合约及其依赖项。如果没有指定文件，则展平项目中的所有合约。
gas-reporter:merge	（未提供详细描述）
help	              打印此帮助信息。
node	              启动一个基于 Hardhat Network 的 JSON-RPC 服务器。
run	                在编译项目后运行用户定义的脚本。
test	              运行 Mocha 测试。
verify	            在 Etherscan 或 Sourcify 上验证合约。

可用的任务范围:
范围	              描述
vars	            管理你的配置变量。
```

# 编译

```shell
yarn hardhat compile
```

# 在编译项目后运行用户定义的脚本
run: 隐含了编译步骤
```shell
yarn hardhat run scripts/deploy.js
```

指定名称的测试网络

```shell
# 默认
yarn hardhat run scripts/deploy.js --network hardhat
# sepolia 测试网
yarn hardhat run scripts/deploy.js --network sepolia
```

# 启动一个网络

```shell
# 单独以恶搞窗口启动
yarn hardhat node
# 允许一个脚本运行在网络中
yarn hardhat run scripts/deploy.js  --network localhost
# 你还可以单独打开一个 javascript 控制台使用
yarn hardhat console  --network localhost
```

# 测试环节

```shell
# 启动所有测试用例
yarn hardhat test
# 只启动包含 额外 的测试
yarn hardhat test --grep "额外"
```

启用测试gas消耗[获取api key](https://coinmarketcap.com/)


# 代码覆盖率
会检测我们的测试案例, 提醒我们有多少代码没有被测试
```shell
yarn hardhat coverage
```