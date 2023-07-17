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
        const nftContract = await ethers.getContractFactory("CosmicGirlV2")
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

            assert.equal(name, "CosmicGirl")
            assert.equal(symbol, "CS")
            assert.equal(initialTokenId, expectedTokenId)
        })
    })

    describe("SafeMint", function () {
        it("want sure minting works", async () => {
            expect(await cosmicGirlV2.safeMint(deployer.address))
        })
        it("sure the owner of nft after changing V2", async () => {
            let tokenId

            await cosmicGirlV2.safeMint(deployer.address)
            tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            console.log(`first : ${tokenId}`)
            const currentOwner = await cosmicGirlV2.ownerOf(tokenId)

            // expect deployer that minted be the owner
            expect(currentOwner).to.equal(deployer.address)
            console.log(`current owner: ${currentOwner}`)

            // Change ownership of the NFT from the deployer to the player
            await cosmicGirlV2.safeTransferFrom(currentOwner, player.address, tokenId)
            tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            const afterOwner = await cosmicGirlV2.ownerOf(tokenId)
            console.log(`second : ${tokenId}`)
            console.log(`second owner: ${await cosmicGirlV2.ownerOf(tokenId)}`)
            expect(afterOwner).to.equal(player.address)
        })

        it("only owner can mint the nft", async () => {
            await expect(cosmicGirlV2.connect(player).safeMint(player.address)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
        })

        it("it can be minted only once", async () => {
            await cosmicGirlV2.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            await cosmicGirlV2.safeTransferFrom(deployer.address, player.address, tokenId)
            await expect(cosmicGirlV2.connect(player).safeMint(player.address)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
        })
    })

    describe("TokenURI", function () {
        it("getting token uri V2", async () => {
            await cosmicGirlV2.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            const expectedTokenUri =
                "https://ipfs.io/ipfs/Qma2rdJ7JxmSbn3tydFrU27Er9eJPeTYNHk19mFiF9FeDv"
            const tokenUri = await cosmicGirlV2.tokenURI(tokenId)

            assert.equal(expectedTokenUri, tokenUri)
        })
    })

    describe("Burn Nft", function () {
        it("only owner can burn the nft", async () => {
            await cosmicGirlV2.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            expect(await cosmicGirlV2.connect(player).burnToken(tokenId)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
        })
        it("should burn the nft", async () => {
            await cosmicGirlV2.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirlV2.getTokenId()) - 1
            const contractAddress = await cosmicGirlV2.burnToken(tokenId)

            console.log(contractAddress)
        })
    })
})
