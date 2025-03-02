// solc是Solidity编译器，用于编译Solidity代码，此处被注释掉，可能是因为后续代码中并未直接进行合约编译操作
// const solc = require("solc") 

// 引入ethers库，用于以太坊相关的操作和交互
const ethers = require("ethers")
// 引入fs-extra库，用于文件系统的操作，比如读写文件，因为我们下面要读取编译完成的abi文件和bytecode二进制文件
const fs = require("fs-extra")
// 加载环境变量，.env文件中通常存放了一些敏感信息或配置，比如私钥、合约地址等，这样做可以提高代码的可移植性和安全性
require("dotenv").config()

async function main() {
    // 首先，编译这个！
    // 确保你的ganache网络正常运行！
    // 旧的方式可以在下面看到：
    // let provider=new ethers.providers。JsonRpcProvider（进程.env.RPC_URL）
    // 在以太坊6及以上版本上，你应该这样使用
    // let provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // let wallet = new ethers.Wallet(process.env.PRIVATE_KEY, provider)

    // 使用加密过的私钥连接上一个钱包
    //let provider = new ethers.JsonRpcProvider(process.env.RPC_URL)
    // const encryptedJson = fs.readFileSync("./.encryptedKey.json", "utf8");
    // let wallet = ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJson,
    //     process.env.PRIVATE_KEY_PASSWORD
    // );
    // wallet = wallet.connect(provider);


    // 使用geth加密过的私钥连接上一个钱包
    // let provider = new ethers.JsonRpcProvider(process.env.GETH_RPC_URL)
    // const encryptedJson = fs.readFileSync("./.gethencryptedKey.json", "utf8");
    // let wallet = ethers.Wallet.fromEncryptedJsonSync(
    //     encryptedJson,
    //     process.env.GETH_PRIVATE_KEY_PASSWORD
    // );
    // wallet = wallet.connect(provider);

    // 使用 infura 的私钥连接一个钱包
    let provider = new ethers.JsonRpcProvider(process.env.INFURA_RPC_URL);
    let wallet = new ethers.Wallet(process.env.INFURA_PRIVATE_KEY, provider)

    // 现在我们已经连接上了 process.env.RPC_URL 的 ganache 测试网络
    // 并且使用 process.env.PRIVATE_KEY 私钥, 连接上了一个钱包

    // 读取abi文件
    const abi = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.abi", "utf8")
    // 读取bytecode文件
    const binary = fs.readFileSync("./SimpleStorage_sol_SimpleStorage.bin", "utf8")

    // 创建一个合约, 并通过钱包的私钥签名
    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log("正在部署，请稍候...")

    // 部署, await 表示将等待部署完成
    // const contract = await contractFactory.deploy()
    const contract = await contractFactory.deploy({ gasPrice: 100000000000 })
    console.log(contract)

    // 等待一个区块确认
    console.log("等待确认完成...")
    const deploymentReceipt = await contract.deploymentTransaction().wait(1, 120 * 1000)
    console.log("这是收据:")
    console.log(deploymentReceipt)

    console.log(`区块浏览器: https://sepolia.etherscan.io/address/${deploymentReceipt.contractAddress}`)

    // console.log("让我们部署另一个测试交易, 尽管正常我们不会这么做！请稍候...")

    // // 自定义一个交易
    // const nonce = await wallet.getNonce()
    // tx = {
    //     nonce: nonce,
    //     gasPrice: 100000000000,
    //     gasLimit: 1000000,
    //     to: null,
    //     value: 0,
    //     data: "0x608060405234801561001057600080fd5b50610771806100206000396000f3fe608060405234801561001057600080fd5b50600436106100575760003560e01c80632e64cec11461005c5780636057361d1461007a5780636f760f41146100965780638bab8dd5146100b25780639e7a13ad146100e2575b600080fd5b610064610113565b604051610071919061052a565b60405180910390f35b610094600480360381019061008f919061046d565b61011c565b005b6100b060048036038101906100ab9190610411565b610126565b005b6100cc60048036038101906100c791906103c8565b6101b6565b6040516100d9919061052a565b60405180910390f35b6100fc60048036038101906100f7919061046d565b6101e4565b60405161010a929190610545565b60405180910390f35b60008054905090565b8060008190555050565b6001604051806040016040528083815260200184815250908060018154018082558091505060019003906000526020600020906002020160009091909190915060008201518160000155602082015181600101908051906020019061018c9291906102a0565b505050806002836040516101a09190610513565b9081526020016040518091039020819055505050565b6002818051602081018201805184825260208301602085012081835280955050505050506000915090505481565b600181815481106101f457600080fd5b906000526020600020906002020160009150905080600001549080600101805461021d9061063e565b80601f01602080910402602001604051908101604052809291908181526020018280546102499061063e565b80156102965780601f1061026b57610100808354040283529160200191610296565b820191906000526020600020905b81548152906001019060200180831161027957829003601f168201915b5050505050905082565b8280546102ac9061063e565b90600052602060002090601f0160209004810192826102ce5760008555610315565b82601f106102e757805160ff1916838001178555610315565b82800160010185558215610315579182015b828111156103145782518255916020019190600101906102f9565b5b5090506103229190610326565b5090565b5b8082111561033f576000816000905550600101610327565b5090565b60006103566103518461059a565b610575565b90508281526020810184848401111561037257610371610704565b5b61037d8482856105fc565b509392505050565b600082601f83011261039a576103996106ff565b5b81356103aa848260208601610343565b91505092915050565b6000813590506103c281610724565b92915050565b6000602082840312156103de576103dd61070e565b5b600082013567ffffffffffffffff8111156103fc576103fb610709565b5b61040884828501610385565b91505092915050565b600080604083850312156104285761042761070e565b5b600083013567ffffffffffffffff81111561044657610445610709565b5b61045285828601610385565b9250506020610463858286016103b3565b9150509250929050565b6000602082840312156104835761048261070e565b5b6000610491848285016103b3565b91505092915050565b60006104a5826105cb565b6104af81856105d6565b93506104bf81856020860161060b565b6104c881610713565b840191505092915050565b60006104de826105cb565b6104e881856105e7565b93506104f881856020860161060b565b80840191505092915050565b61050d816105f2565b82525050565b600061051f82846104d3565b915081905092915050565b600060208201905061053f6000830184610504565b92915050565b600060408201905061055a6000830185610504565b818103602083015261056c818461049a565b90509392505050565b600061057f610590565b905061058b8282610670565b919050565b6000604051905090565b600067ffffffffffffffff8211156105b5576105b46106d0565b5b6105be82610713565b9050602081019050919050565b600081519050919050565b600082825260208201905092915050565b600081905092915050565b6000819050919050565b82818337600083830152505050565b60005b8381101561062957808201518184015260208101905061060e565b83811115610638576000848401525b50505050565b6000600282049050600182168061065657607f821691505b6020821081141561066a576106696106a1565b5b50919050565b61067982610713565b810181811067ffffffffffffffff82111715610698576106976106d0565b5b80604052505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b61072d816105f2565b811461073857600080fd5b5056fea264697066735822122005f4761e428b272cff3be71d18d77c255fd57b725a8cec4f019c4e1beb4ada8164736f6c63430008070033",
    //     chainId: 1337,
    // }

    // // 用私钥签名交易, 实际上方法的方法 sendTransaction 内部会帮我们签名的, 所以我们不需要显示的签名
    // // let resp = await wallet.signTransaction(tx)
    // // console.log(resp)

    // // 用私钥签名交易(内部实现), 并发送交易
    // const sentTxResponse = await wallet.sendTransaction(tx);
    // console.log(sentTxResponse)

    console.log("让我们调用一下合约的函数！请稍候...")

    // 调用 合约的 retrieve() 方法
    let currentFavoriteNumber = await contract.retrieve()
    // JavaScript中如果需要变量和日志一起生效, 使用反引号 `
    console.log(`调用合约 retrieve() 查询当前存储的号码: ${currentFavoriteNumber}`)

    console.log("调用合约  store(7) 存储号码...")
    let transactionResponse = await contract.store(7)
    console.log("等待确认完成...")
    await transactionResponse.wait()

    currentFavoriteNumber = await contract.retrieve()
    console.log(`调用合约 retrieve() 查询当前存储的号码: ${currentFavoriteNumber}`)

    console.log(`区块浏览器: https://sepolia.etherscan.io/address/${deploymentReceipt.contractAddress}`)
}

// 调用main, 开始等待异步响应, 如果出现错误则打印
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// synchronous [solidity]
// asynchronous [javascript]

// cooking
// Synchronous
// 1. Put popcorn in microwave -> Promise
// 2. Wait for popcorn to finish
// 3. Pour drinks for everyone

// Asynchronous
// 1. Put popcorn in the mircrowave
// 2. Pour drinks for everyone
// 3. Wait for popcorn to finish

// Promise
// Pending
// Fulfilled
// Rejected