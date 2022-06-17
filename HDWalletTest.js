import Web3 from 'web3'

import { createRequire } from "module";
const require = createRequire(import.meta.url);

const HDWalletProvider = require("@truffle/hdwallet-provider");

require('dotenv').config()

// Datas for testing
const identity = "0x268c970A5FBFdaFfdf671Fa9d88eA86Ee33e14B1"
const delegate = "0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC"
const testSignature = "0x67de2d20880a7d27b71cdcb38817ba95800ca82dff557cedd91b96aacb9062e80b9e0b8cb9614fd61ce364502349e9079c26abaa21890d7bc2f1f6c8ff77f6261c"

// Create Web3
console.log(process.env.RPC_URL_BSC_TESTNET)

const hdWalletProvider = new HDWalletProvider(
    process.env.PRIVATE_KEY, 
    process.env.RPC_URL_BSC_TESTNET
)

console.log("Accounts = ", hdWalletProvider.addresses)

const didRegistryABI = require('./abi/VeridaDIDRegistry.json')


async function hdTest() {
    const web3 = new Web3(hdWalletProvider);

    const contract = new web3.eth.Contract(
        didRegistryABI.abi,
        process.env.CONTRACT_ADDRESS_RPC_URL_BSC_TESTNET_DidRegistry
    )

    const accounts = await web3.eth.getAccounts();
    console.log('Account = ', accounts[0])

    const tx = await contract.methods.changeOwner(
        identity,
        delegate,
        testSignature
    ).send({
        from: accounts[0]
    })

    console.log('Tx = ', tx)

    hdWalletProvider.engine.stop();
}
hdTest()
