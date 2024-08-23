# 安装solc

```shell
yarn add solc
```

# 编译sol

```shell
# yarn compile solcjs --bin --abi --include-path node_modules/ --base-path . -o . SimpleStorage.sol
yarn compile
```

# 测试网络环境ganache
你需要先下载他: [https://archive.trufflesuite.com/ganache/](https://archive.trufflesuite.com/ganache/)

注意: 已经不再更新, 之后会使用hardhat

![alt text](./img/image.png)
![alt text](./img/image2.png)

# 安装ethers
用于连接测试网络和钱包
```shell
yarn add ethers
```

# 安装fs-extra
用于要读取编译完成的abi文件和bytecode二进制文件
```shell
yarn add fs-extra
```

# 部署sol合约

```shell
node deploy.js
```