const { getNamedAccounts } = require("hardhat")

async function main() {
    await deployments.fixture(["all", "CosmicGirl"])
    const { deployer } = await getNamedAccounts()
}
