const Web3 = require('web3');
const BN = require('bignumber.js');

const GAS_PRICE = 10000000000;
const GAS_LIMIT = 5000000;


describe('Test Task-1', () => {

    const configTask1 = require('./configTask1.json');
    const web3 = new Web3(new Web3.providers.HttpProvider(configTask1.metadata.network));
    const abi = configTask1.metadata.abi;
    const address = configTask1.metadata.address;
    const contract = new web3.eth.Contract(abi, address);
    const deployer = configTask1.metadata.deployer;
    const deployerPriv = configTask1.metadata.deployerPriv;

    it('test send ETH to contract', async () => {
        const value = configTask1.input.value;

        await web3.eth.sendTransaction({
            from: deployer,
            to: address,
            value: value,
            gasPrice: GAS_PRICE,
            gas: GAS_LIMIT
        });
        const contractBalance = await web3.eth.getBalance(address);

        console.log(`Contract Balance is ${contractBalance}`);
    });
    it('test execute multiSendEth', async () => {
        const amount = web3.utils.toHex(configTask1.input.amount);
        const addresses = configTask1.input.addresses;
        await contract.methods.multiSendEth(amount, addresses)
            .send({
                from: deployer,
                gasPrice: GAS_PRICE,
                gas: GAS_LIMIT
            });
        const results = await Promise.all(addresses.map(async (address) => {
            const balance = await web3.eth.getBalance(address);

            return { "address": address, "balance": balance };
        }));

        results.map((element) => {
            console.log(`${element.address}'s ether balance is ${element.balance}`);
        });
    });
});


describe('Test Task-2', () => {
    const configTask2 = require('./configTask2.json');
    const web3 = new Web3(new Web3.providers.HttpProvider(configTask2.metadata.network));

    const abi = configTask2.metadata.abi;
    const address = configTask2.metadata.address;
    const contract = new web3.eth.Contract(abi, address);
    const deployer = configTask2.metadata.deployer;
    const deployerPriv = configTask2.metadata.deployerPriv;

    it('Init MITH', async () => {
        let vault = await contract.methods.vault.call().call();
        if (vault === '0x0000000000000000000000000000000000000000') {
            const supply = new BN(1000000 * 10 ** 18);
            await contract.methods.init(web3.utils.toHex(supply), deployer, deployer)
                .send({
                    from: deployer,
                    gasPrice: GAS_PRICE,
                    gas: GAS_LIMIT
                });
            vault = await contract.methods.vault.call().call();

            console.log(`Vault is initialized with ${vault}`);
        }
    });

    it('Check balance of all addresses', async () => {
        const input = configTask2.input;
        const results = await Promise.all(input.map(async (element) => {
            const balance = await web3.eth.getBalance(element.address);

            return { "address": element.address, "balance": balance };
        }));

        results.map((element) => {
            console.log(`${element.address}'s ether balance is ${element.balance}`);
        });
    });

    it('Send MITH to all addresses', async () => {
        const input = configTask2.input;
        const results = await Promise.all(input.map(async (element) => {
            const value = web3.utils.toHex(new BN(element.value));
            const receipt = await contract.methods.transfer(element.address, value)
                .send({
                    from: deployer,
                    gasPrice: GAS_PRICE,
                    gas: GAS_LIMIT
                });
            const balance = await contract.methods.balanceOf(element.address).call();
            return {
                "address": element.address,
                "value": element.value,
                "hash": receipt.transactionHash,
                "balance": balance
            };
        }));

        results.map((element) => {
            console.log(`Sent ${element.value} MITH to ${element.address} and txhash:`);
            console.log(element.hash);
            console.log(`MITH balance of ${element.address} = ${element.balance}`);
        });
    });
});