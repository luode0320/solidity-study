// imports 导入
const { ethers, run, network } = require("hardhat")

// 异步主函数，用于部署和交互智能合约
async function main() {
  console.log(`网络信息: `)
  console.log(network.config)

  // 获取SimpleStorage合约工厂
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("部署合约...")
  const simpleStorage = await SimpleStorageFactory.deploy()
  // 注意：.deployed()在最新的hardhat版本已经被弃用，改为.waitForDeployment()----->
  const deployedSimpleStorage = await simpleStorage.deployed()
  console.log(`已部署合约: https://sepolia.etherscan.io/address/${simpleStorage.address}`)
  //______________________________________________

  // 当在指定网络部署时，等待区块确认并验证合约, 使得可以在区块浏览器查看源码
  if (network.config.chainId === 11155111 && process.env.ETHERSCAN_API_KEY) {
    console.log("等待区块确认...")

    // 新版
    // await simpleStorage.deploymentTransaction().wait(1)

    // 旧版: 查找部署交易
    // 查找部署交易
    const deploymentTransactionHash = deployedSimpleStorage.deployTransaction.hash;
    await deployedSimpleStorage.provider.getTransactionReceipt(deploymentTransactionHash);

    // 等待至少6个区块确认
    await deployedSimpleStorage.provider.waitForTransaction(deploymentTransactionHash, 6);

    // 验证合约
    await verify(deployedSimpleStorage.address, []);

    //______________________________________________

  }

  console.log("让我们调用一下合约的函数！请稍候...")

  // 获取并打印当前值
  const currentValue = await simpleStorage.retrieve()
  console.log(`调用合约 retrieve() 查询当前存储的号码: ${currentValue}`)

  console.log("调用合约  store(7) 存储号码...")
  const transactionResponse = await simpleStorage.store(7)
  console.log("等待确认完成...")
  await transactionResponse.wait(1)

  const updatedValue = await simpleStorage.retrieve()
  console.log(`调用合约 retrieve() 查询当前存储的号码: ${updatedValue}`)

  console.log(`区块浏览器: https://sepolia.etherscan.io/address/${simpleStorage.address}`)
}

// 异步函数用于验证智能合约
// @param contractAddress 合约地址
// @param args 合约构造函数的参数
const verify = async (contractAddress, args) => {
  console.log("验证合同...")
  try {
    // 调用run函数执行验证操作
    // @param address 合约地址
    // @param constructorArguments 合约构造函数的参数
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {

    // 捕获并处理验证过程中的错误
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("已验证!")
    } else {
      console.log(e)
    }

  }
}

// 主函数执行入口
main()
  // 主函数执行成功后，退出进程，状态码为0，表示正常退出
  .then(() => process.exit(0))
  // 若主函数执行过程中发生错误，输出错误信息到标准错误流，并退出进程，状态码为1，表示异常退出
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
