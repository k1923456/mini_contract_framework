# Task1 以及 Task3

Task1 在 mainnet上 的 address:

[0x11352d75f63804d5f8FDb88bddf9efE9B52d6723](https://etherscan.io/address/0x11352d75f63804d5f8fdb88bddf9efe9b52d6723)

Task2 的 code 在 test 內, 建議直接執行test, 使用 web3-1.0.0-beta.36

Task3 在 mainnet 上的 transaction:

[0x6f91db168059d7f637c4b07ac7fcb7c476b78e9a1a3350eecc7db0f0bd3fceac](https://etherscan.io/tx/0x6f91db168059d7f637c4b07ac7fcb7c476b78e9a1a3350eecc7db0f0bd3fceac)  
  

# 環境設定

1. 調整 configTask1.json 及 configTask2.json 的 network, deployer, deployerPriv 以及 inputs

需要有 ethereum mainnet node (geth/parity) 或是 local testing environment (ganache-cli)

2. 測試環境架設

此步驟將在 local 端建立 EVM 測試環境，port 為 8545

```
brew install docker
git clone https://github.com/trufflesuite/ganache-cli.git
bash ./start_ganache.sh
```

3. 安裝套件

使用 npm 6.1.0, node js v10.7.0

```
npm install
```

# Deploy MultiEthSender/MithrilToken

```
npm run deploy
```

# 測試 Task1 及 Task2

```
npm run test
```

# 代碼結構

```
mithril
|
|--- contracts
|    |
|    |--- MithrilToken.sol   # 測試 task2 用
|    |
|    |--- MultiEthSender.sol # Task1 答案
|
|--- data # Deploy 完 contract 後產生 MithrilToken/MultiEthSender 的 ABI 及 Bytecode
|
|--- src
|    |
|    |--- deployContracts.js # Deploy 2個 contract
|    |
|    |--- encodeAnswer.js    # 將 answer encode 成 Hex format
|
|--- test
|    |
|    |--- configTask1.json  # 測試 Task1 用的 config
|    |
|    |--- configTask2.json  #測試 Task2 用的 config
|    |
|    |--- santai-web3dev.js # Task2 答案
|
|--- answer # Task3 答案
```