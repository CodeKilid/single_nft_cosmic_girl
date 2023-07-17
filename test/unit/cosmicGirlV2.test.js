const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("Cosmic Girl V2 Tests", () => {
    // variables and contract deploying
    let deployer, player, cosmicGirlV2
    // const PRICE = ethers.utils.parseEther("0.1")
    const TOKEN_ID = 0
    beforeEach(async () => {
        const accounts = await ethers.getSigners()
        // accounts
        deployer = accounts[0]
        player = accounts[1]

        // await deployments.fixture(["all"]) // deploy all of those contracts across deploy directory

        // contracts

        // nft --> ERC721 contract
        const nftContract = await ethers.getContractFactory("cosmicGirlV2")
        cosmicGirlV2 = await nftContract.deploy()
        // await cosmicGirlV2.safeMint(deployer.address)

        // other describes
        // cosmicGirlV2 -> contract name
        // account name ---> deployer, user
    })

    describe("constructor", function () {
        it("Intializing", async () => {
            const name = await cosmicGirlV2.name()
            const symbol = await cosmicGirlV2.symbol()
            const initialTokenId = await cosmicGirlV2.getTokenId()
            const expectedTokenId = 0

            assert.equal(name, "cosmicGirlV2")
            assert.equal(symbol, "CS")
            assert.equal(initialTokenId, expectedTokenId)
        })
    })

    describe("SafeMint", function () {
        it("want sure minting works", async () => {
            expect(await cosmicGirlV2.safeMint(deployer.address))
        })
        it("sure the owner of nft after changing", async () => {
            let tokenId

            await cosmicGirlV2.safeMint(deployer.address)
            tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            console.log(`first : ${tokenId}`)
            const currentOwner = await cosmicGirlV2.ownerOf(tokenId)

            // expect deployer that minted be the owner
            expect(currentOwner).to.equal(deployer.address)
            console.log(`current owner: ${currentOwner}`)

            // Change ownership of the NFT from the deployer to the player
            await cosmicGirlV2.safeTransferFrom(deployer.address, player.address, tokenId)
            await cosmicGirlV2.connect(player).safeMint(player.address)

            tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            const afterOwner = await cosmicGirlV2.ownerOf(tokenId)
            console.log(`second : ${tokenId}`)
            expect(afterOwner).to.equal(player.address)
        })
    })

    describe("TokenURI", function () {
        it("getting token uri", async () => {
            const expectedTokenUri =
                "https://ipfs.io/ipfs/Qma2rdJ7JxmSbn3tydFrU27Er9eJPeTYNHk19mFiF9FeDv"
            const tokenUri = await cosmicGirlV2.getTokenUri()
            assert.equal(expectedTokenUri, tokenUri)
        })
    })
})
