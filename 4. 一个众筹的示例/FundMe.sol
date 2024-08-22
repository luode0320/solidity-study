// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

// 导入了 Chainlink 的价格馈送接口和 PriceConverter.sol 文件
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "./PriceConverter.sol";

// 0.8.4版本后可以自定义错误类型，用于处理非合约所有者的操作尝试
error NotOwner();

// sepolia 测试网地址: 0x474aaBf6A33d427C541be3Ed3DA6933Ee6716acA(没有静态关键字) 0x96A6392f615C652de300F942B2f10f2347Da1F02(有静态关键字)
contract FundMe {
    using PriceConverter for uint256;

    // 映射每个地址到其捐赠的金额
    mapping(address => uint256) public addressToAmountFunded;
    // 存储所有捐赠者的地址列表, 用于遍历, 因为 map 不能遍历
    address[] public funders;

    // 合约所有者的地址，初始化时设置, immutable: 一次赋值后不可改变可以节省gas
    address public immutable i_owner;
    // 设置最低捐款额= 0.001 美元, constant: 静态变量可以节省gas
    uint256 public constant MINIMUM_USD = 0.001 * 10 ** 18;
    
    // 构造函数，在部署合约时执行
    constructor() {
        // 设置合约所有者为部署合约的人
        i_owner = msg.sender;
    }

    // 允许用户向合约捐赠以太币
    function fund() public payable {
        // 要求捐赠的以太币价值至少达到设定的最低美元值
        require(msg.value.getConversionRate() >= MINIMUM_USD, "You need to spend more ETH!");

        // 更新捐赠者地址对应的捐赠金额
        addressToAmountFunded[msg.sender] += msg.value;
        // 将捐赠者地址添加到捐赠者列表中
        funders.push(msg.sender);
    }
    
    // 获取价格馈送版本号
    function getVersion() public view returns (uint256){
        // ETH/USD Sepolia 网络的价格馈送地址。
        // 创建一个价格馈送接口实例
        AggregatorV3Interface priceFeed = AggregatorV3Interface(0x694AA1769357215DE4FAC081bf1f309aDC325306);
        // 返回价格馈送的版本号
        return priceFeed.version();
    }

    // 获取收到的筹款
    function getMoney() public view returns (uint256){
        return address(this).balance;
    }

    // modifier: 可以直接在函数声明中添加自定义的关键字
    modifier onlyOwner {
        // 如果调用者不是合约所有者，则抛出 NotOwner 错误,自定义错误比require要节省gas, 但是可读性会差 
        // require(msg.sender == i_owner, "You can't search this way");
        if (msg.sender != i_owner) revert NotOwner();
        //  _; 表示继续执行被修饰的方法, 执行前或者执行后执行自定义的逻辑
        _;
    }
    
    // 允许合约所有者提取合约中的所有以太币
    function withdraw() public onlyOwner {
        // 遍历所有捐赠者并重置他们的捐赠记录
        for (uint256 funderIndex=0; funderIndex < funders.length; funderIndex++){
            address funder = funders[funderIndex];
            // 将捐赠者的捐赠金额重置为 0
            addressToAmountFunded[funder] = 0;
        }
        // 清空捐赠者列表
        funders = new address[](0);
        
        // transfer: 简单的转账, 消耗2300gas, 失败会出现异常, 回滚
        // payable(msg.sender).transfer(address(this).balance);
        
        // send: 简单的转账账, 消耗2300gas, 失败会返回false, 不会回滚
        // bool sendSuccess = payable(msg.sender).send(address(this).balance);
        // require(sendSuccess, "Send failed");
        
        // call: 底层通用函数,转移所有gas到调用的位置,不仅仅可以调用转账
        // 参数:
        //      (""): 表示不选择指定函数当作一个转账使用
        //      {value: address(this).balance}: 调用的参数
        // 返回值: 
        //      callSuccess: 是否成功
        //      returns: 调用函数的返回值, 可以有多个
        // (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        // require(callSuccess, "Call failed");

        // 使用低级的 `call` 方法来转移合约中的所有以太币给合约所有者
        (bool callSuccess, ) = payable(msg.sender).call{value: address(this).balance}("");
        // 如果转账失败则抛出错误
        require(callSuccess, "Call failed");
    }

    // 解释者来自: https://solidity-by-example.org/fallback/
    // 以太币被发送到合约
    //      is msg.data empty?
    //          /   \ 
    //         yes  no
    //         /     \
    //    receive()?  fallback() 
    //     /   \ 
    //   yes   no
    //  /        \
    //receive()  fallback()
    // 当接收到数据的但是函数不存在是时调用的方法（当接收到包含数据的交易时被调用）
    // 如果一个人没有调用fund捐赠方法， 但是却向这个合约地址调用了一个不存在的方法转账， 默认会触发fund捐赠方法
    fallback() external payable {
        // 直接调用 fund 方法
        fund();
    }

    // 当接收到没有数据的以太币时调用的方法（如果存在 receive 函数则优先调用 receive 函数）
    // 如果一个人没有调用fund捐赠方法， 但是却向这个合约地址转账， 默认会触发fund捐赠方法
    receive() external payable {
        // 直接调用 fund 方法
        fund();
    }

}

// 我们尚未涉及的概念（将在后面的章节中介绍）
// 1. 枚举 (Enum)
// 2. 事件 (Events)
// 3. 异常处理 (Try / Catch)
// 4. 函数选择器 (Function Selector)
// 5. 编码和解码 (abi.encode / decode)
// 6. 使用 keccak256 进行哈希计算
// 7. Yul / Assembly 语言


