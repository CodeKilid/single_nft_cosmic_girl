// require("@nomiclabs/hardhat-waffle")
require("hardhat-gas-reporter")
require("@nomiclabs/hardhat-etherscan")
require("dotenv").config()
require("solidity-coverage")
require("hardhat-deploy")
require("@nomicfoundation/hardhat-chai-matchers")
require("./tasks/accounts")
require("./tasks/balance")
require("./tasks/block-number")

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more
/**
 * @type import('hardhat/config').HardhatUserConfig
 */

const MAINNET_RPC_URL = process.env.MAINNET_RPC_URL
const RPC_URL = process.env.RPC_URL
const COINMARKETCAP_API_KEY = process.env.COINMARKETCAP_API_KEY || ""
const GOERLI_RPC_URL = process.env.GOERLI_RPC_URL
const PRIVATE_KEY = process.env.PRIVATE_KEY
const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY || "KPFKND5CNVIRKXPNPAUYWY6I336TZKISXM"
const SEPOLIA_RPC_URL = process.env.SEPOLIA_RPC_URL
const MUMBAI_RPC_URL = process.env.MUMBAI_RPC_URL
const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY
// const MAINNET_POLYGON_URL = process.env.MAINNET_POLYGON_URL

module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        // polygon: {
        //     url: MAINNET_POLYGON_URL,
        //     accounts: [PRIVATE_KEY],
        //     chainId: 137,
        // },
        hardhat: {
            chainId: 31337,
            forking: {
                url: MAINNET_RPC_URL,
            },
            allowUnlimitedContractSize: true,
        },
        localhost: {
            url: RPC_URL,
            chainid: 31337,
            allowUnlimitedContractSize: true,
            // gas: 2100000,
            // gasPrice: 1315849061700,
        },
        goerli: {
            url: GOERLI_RPC_URL,
            accounts: [PRIVATE_KEY],
            chainId: 5,
            blockConfirmations: 6,
            saveDeployments: true,
            allowUnlimitedContractSize: true,
        },
        sepolia: {
            url: SEPOLIA_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            chainId: 11155111,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },
        mumbai: {
            url: MUMBAI_RPC_URL,
            accounts: [PRIVATE_KEY],
            saveDeployments: true,
            chainId: 80001,
            gas: 2100000,
            gasPrice: 8000000000,
            blockConfirmations: 6,
            allowUnlimitedContractSize: true,
        },
    },
    solidity: {
        compilers: [
            {
                version: "0.8.7",
            },
            {
                version: "0.8.8",
            },
            {
                version: "0.6.12",
            },
            {
                version: "0.4.19",
            },
            {
                version: "0.6.0",
            },
            {
                version: "0.8.9",
            },
            {
                version: "0.8.14",
            },
        ],
    },
    etherscan: {
        apiKey: POLYGON_SCAN_API_KEY,
    },
    gasReporter: {
        enabled: true,
        currency: "USD",
        outputFile: "gas-report.txt",
        noColors: true,
        // coinmarketcap: COINMARKETCAP_API_KEY,
    },
    namedAccounts: {
        deployer: {
            default: 0, // here this will by default take the first account as deployer
            1: 0, // similarly on mainnet it will take the first account as deployer. Note though that depending on how hardhat network are configured, the account 0 on one network can be different than on another
        },
        player: {
            default: 1,
        },
    },
    // gasReporter: {
    //     enabled: REPORT_GAS,
    //     currency: "USD",
    //     outputFile: "gas-report.txt",
    //     noColors: true,
    //     coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    // },
    mocha: {
        timeout: 200000, // 200 seconds max for running tests
    },
}
