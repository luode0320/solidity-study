// 导入hardhat运行函数
const { run } = require("hardhat")

/**
 * 验证合约是否已经在区块链网络上验证过
 * @param {string} contractAddress - 合约的地址
 * @param {array} args - 合约构造函数的参数
 */
const verify = async (contractAddress, args) => {
  console.log(".验证合同..")
  try {
    // 调用hardhat的verify插件来验证合约
    await run("verify:verify", {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (e) {
    // 如果合约已经验证过，则打印“Already verified!”
    if (e.message.toLowerCase().includes("already verified")) {
      console.log("Already verified!")
    } else {
      // 其他错误则打印错误信息
      console.log(e)
    }
  }
}

// 导出verify函数以便在其他模块中使用
module.exports = { verify }