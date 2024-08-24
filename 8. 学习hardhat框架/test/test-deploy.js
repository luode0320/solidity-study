// 导入hardhat的ethers模块，用于智能合约的部署和交互
const { ethers } = require("hardhat")
// 导入chai的expect和assert方法，用于测试中的断言
const { expect, assert } = require("chai")

describe("SimpleStorage", function () {
  // 声明simpleStorageFactory和simpleStorage变量
  let simpleStorageFactory, simpleStorage

  // 每个测试用例（it）执行前的初始化工作
  beforeEach(async function () {
    // 获取SimpleStorage合约工厂
    simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
    // 部署SimpleStorage合约
    simpleStorage = await simpleStorageFactory.deploy()
  })

  it("测试用例: 检查初始最喜欢的数字是否为0", async function () {
    // 获取当前存储的最喜欢的数字
    const currentValue = await simpleStorage.retrieve()
    const expectedValue = "0"
    // 断言：检查初始最喜欢的数字是否为0
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("测试用例: 用store函数后,存储的最喜欢的数字应更新", async function () {
    const expectedValue = "7"
    // 调用store函数来存储新的最喜欢的数字
    const transactionResponse = await simpleStorage.store(expectedValue)
    // 等待交易确认
    await transactionResponse.wait(1)
    // 获取更新后的最喜欢的数字
    const currentValue = await simpleStorage.retrieve()
    // 断言：检查更新后的最喜欢的数字是否为7
    assert.equal(currentValue.toString(), expectedValue)
  })

  it("额外测试用例: 验证people结构和数组的正确性", async function () {
    const expectedPersonName = "luode"
    const expectedFavoriteNumber = "26"

    // 添加一个人到people数组
    const transactionResponse = await simpleStorage.addPerson(
      expectedPersonName,
      expectedFavoriteNumber
    )

    // 等待交易确认
    await transactionResponse.wait(1)
    // 获取刚添加的人的信息
    const { favoriteNumber, name } = await simpleStorage.people(0)

    // 断言：检查添加的人的姓名和最喜欢的数字是否正确
    assert.equal(name, expectedPersonName)
    assert.equal(favoriteNumber, expectedFavoriteNumber)
  })
})