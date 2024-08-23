// 引入ethers库，用于以太坊相关的操作和交互
const ethers = require("ethers")
// 引入fs-extra库，用于文件系统的操作，比如读写文件，因为我们下面要读取编译完成的abi文件和bytecode二进制文件
const fs = require("fs-extra")
// 加载环境变量，.env文件中通常存放了一些敏感信息或配置，比如私钥、合约地址等，这样做可以提高代码的可移植性和安全性
require("dotenv").config()

async function main() {
    // 加载环境的私钥, 可以从env也可以直接从命令中获取去
    const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)

    // 用密码加密私钥
    const encryptedJsonKey = await wallet.encrypt(
        process.env.PRIVATE_KEY_PASSWORD
    )


    // 写入加密后的私钥
    console.log(encryptedJsonKey)

    fs.writeFileSync("./.encryptedKey.json", encryptedJsonKey)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
