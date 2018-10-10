const Web3 = require('web3');
const solc = require('solc');
const path = require('path');
const fs = require('fs');

const joinPath = (dir) => path.join(__dirname, dir);
const dataDir = joinPath(`../data/`);
const contractDir = joinPath(`../contracts/`);

const GAS_PRICE = 10000000000;
const GAS_LIMIT = 5000000;

async function deployTask1() {

    let configTask1 = require(joinPath('../test/configTask1.json'));
    const deployer = configTask1.metadata.deployer;
    const deployerPriv = configTask1.metadata.deployerPriv;

    /* Connect to provider */
    const web3 = new Web3(new Web3.providers.HttpProvider(configTask1.metadata.network));

    /* Compile ABI and Bytecode */
    const contractInput = fs.readFileSync(`${contractDir}/MultiEthSender.sol`, 'utf8');
    const input = { 'MultiEthSender.sol': contractInput };
    const output = solc.compile({ sources: input }, 1);

    const contractABI = output.contracts['MultiEthSender.sol:MultiEthSender'].interface;
    fs.writeFile(`${dataDir}/MultiEthSender.abi`, contractABI, (err) => {
        if (err) throw err;
        console.log('MultiEthSender ABI done');
    });
    const contract = new web3.eth.Contract(JSON.parse(contractABI));

    const contractBytecode = output.contracts['MultiEthSender.sol:MultiEthSender'].bytecode;
    const deployOptions = {
        data: contractBytecode,
        arguments: []
    };
    const data = contract.deploy(deployOptions).encodeABI();
    fs.writeFile(`${dataDir}/MultiEthSender.bytecode`, data, (err) => {
        if (err) throw err;
        console.log('MultiEthSender Bytecode done');
    });

    /* Deploy contract MultiEthSender */
    const newContract = await contract.deploy(deployOptions).send({
        from: deployer,
        gasPrice: GAS_PRICE,
        gas: GAS_LIMIT
    });
    configTask1.metadata.address = newContract.options.address;
    configTask1.metadata.abi = JSON.parse(contractABI);

    console.log(`configTask1.metadata.address changed to ${newContract.options.address}`);
    fs.writeFileSync(joinPath('../test/configTask1.json'), JSON.stringify(configTask1, null, 4), { encoding: 'utf8', flag: 'w' });
}

async function deployMITH() {

    let configTask2 = require(joinPath('../test/configTask2.json'));
    const deployer = configTask2.metadata.deployer;
    const deployerPriv = configTask2.metadata.deployerPriv;

    /* Connect to provider */
    const web3 = new Web3(new Web3.providers.HttpProvider(configTask2.metadata.network));

    /* Compile ABI and Bytecode */
    const contractInput = fs.readFileSync(`${contractDir}/MithrilToken.sol`, 'utf8');
    const input = { 'MithrilToken.sol': contractInput };
    const output = solc.compile({ sources: input }, 1);

    const contractABI = output.contracts['MithrilToken.sol:MithrilToken'].interface;
    fs.writeFile(`${dataDir}/MithrilToken.abi`, contractABI, (err) => {
        if (err) throw err;
        console.log('MithrilToken ABI done');
    });
    const contract = new web3.eth.Contract(JSON.parse(contractABI));

    const contractBytecode = output.contracts['MithrilToken.sol:MithrilToken'].bytecode;
    const deployOptions = {
        data: contractBytecode,
        arguments: []
    };
    const data = contract.deploy(deployOptions).encodeABI();
    fs.writeFile(`${dataDir}/MithrilToken.bytecode`, data, (err) => {
        if (err) throw err;
        console.log('MithrilToken Bytecode done');
    });

    /* Deploy contract MithrilToken */
    const newContract = await contract.deploy(deployOptions).send({
        from: deployer,
        gasPrice: GAS_PRICE,
        gas: GAS_LIMIT
    });
    configTask2.metadata.address = newContract.options.address;
    configTask2.metadata.abi = JSON.parse(contractABI);

    console.log(`configTask2.metadata.address changed to ${newContract.options.address}`);
    fs.writeFileSync(joinPath('../test/configTask2.json'), JSON.stringify(configTask2, null, 4), { encoding: 'utf8', flag: 'w' });
}

deployTask1();
deployMITH();