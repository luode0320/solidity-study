const { task } = require("hardhat/config")

// yarn hardhat block-number --network sepolia
task("block-number", "打印当前区块高度").setAction(
  // const blockTask = async function() => {}
  // async function blockTask() {}
  async (taskArgs, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`当前区块高度: ${blockNumber}`)
  }
)

module.exports = {}
