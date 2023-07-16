const { getNamedAccounts, ethers } = require("hardhat")

async function main() {
    await deployments.fixture(["all", "CosmicGirl"])
    const { deployer } = await getNamedAccounts()

    console.log("getting deployed contract ...")
    const nftContract = await ethers.getContractFactory("CosmicGirl")
    const cosmicGirl = await nftContract.deploy()

    console.log("Minting CosmicGirl ...")
    await cosmicGirl.safeMint(deployer)

    console.log("CosmicGirl Minted!")
}

main()
    .then(() => {
        process.exit(0)
    })
    .catch((error) => {
        console.log(error)
        process.exit(1)
    })
