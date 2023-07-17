const { network } = require("hardhat")
const { developmentChains } = require("../helper-hardhat-config")
const { verify } = require("../utils/verify")

module.exports = async function ({ deployments, getNamedAccounts }) {
    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    log(deployer)
    const args = []

    const cosmicGirlV2 = await deploy("CosmicGirlV2", {
        from: deployer,
        log: true,
        args: args,
    })

    log(process.env.ETHERSCAN_API_KEY)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(cosmicGirlV2.address, args)
    }
    log("Deployed.")
    log("-----------------------------------------------------------")
}

module.exports.tags = ["all", "CosmicGirlV2"]

//
