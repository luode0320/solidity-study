# 初始化项目

```shell
yarn init
```


# 安装hardhat

```shell
yarn add --dev hardhat
```

# 使用hardhat搭建脚手架

```shell
yarn hardhat
```

# 脚手架完成啦!
入门结束


# 命令解释

```shell
全局选项:
选项	            描述
--config	        指定一个 Hardhat 配置文件。
--emoji	            在消息中使用表情符号。
--flamegraph	    为你的 Hardhat 任务生成火焰图。
--help	            显示此帮助信息，或如果提供了任务名称，则显示该任务的帮助信息。
--max-memory	    设置 Hardhat 可使用的最大内存量。
--network	        指定连接的网络。
--show-stack-traces	显示堆栈跟踪（在 CI 服务器上始终启用）。
--tsconfig	        指定一个 TypeScript 配置文件。
--typecheck	        启用 TypeScript 对你的脚本/测试进行类型检查。
--verbose	        启用 Hardhat 的详细日志记录。
--version	        显示 Hardhat 的版本。

可用的任务:
任务	            描述
block-number	    打印当前区块号。
check	            检查你需要的任何内容。
clean	            清除缓存并删除所有制品。
compile	            编译整个项目，构建所有制品。
console	            打开一个 Hardhat 控制台。
coverage	        为测试生成代码覆盖率报告。
flatten	            展平并打印合约及其依赖项。如果没有指定文件，则展平项目中的所有合约。
gas-reporter:merge	（未提供详细描述）
help	            打印此帮助信息。
node	            启动一个基于 Hardhat Network 的 JSON-RPC 服务器。
run	                在编译项目后运行用户定义的脚本。
test	            运行 Mocha 测试。
verify	            在 Etherscan 或 Sourcify 上验证合约。

可用的任务范围:
范围	            描述
vars	            管理你的配置变量。
```