const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log(deployer)
    const args = []

    const cosmicGirl = await deploy("CosmicGirl", {
        from: deployer,
        log: true,
        args: args,
    })

    log(process.env.ETHERSCAN_API_KEY)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(cosmicGirl.address, args)
    }
    log("Deployed.")
    log("-----------------------------------------------------------")
}

module.exports.tags = ["all", "CosmicGirl"]

// 0x28E9FBe8D14E9Ffd99cF0a72A0B8D710c4e8F1f1
