const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("Nft Marketplace Tests", () => {
    // variables and contract deploying
    let deployer, user, cosmicGirl
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
        const nftContract = await ethers.getContractFactory("CosmicGirl")
        cosmicGirl = await nftContract.deploy()
        await cosmicGirl.safeMint(deployer.address)
        // await cosmicGirl.deployed()
        // other describes
        // cosmicGirl -> contract name
        // account name ---> deployer, user
    })

    describe("constructor", function () {
        it("Intializing", async () => {
            const name = await cosmicGirl.name()
            const symbol = await cosmicGirl.symbol()
            // tokenId = 0

            assert.equal(name, "CosmicGirl")
            assert.equal(symbol, "CS")
        })
    })

    describe("SafeMint", function () {
        it("want sure minting works", async () => {
            expect(await cosmicGirl.safeMint(deployer.address))
        })
        it("sure the owner of nft after changing", async () => {
            cosmicGirl.safeTransferFrom()
        })
    })

    describe("BeforeTokenTransfer", function () {
        it("", async () => {})
    })

    describe("Burn", function () {
        it("", async () => {})
    })

    describe("TokenURI", function () {
        it("getting token uri", async () => {
            const expectedTokenUri =
                "https://ipfs.io/ipfs/Qma2rdJ7JxmSbn3tydFrU27Er9eJPeTYNHk19mFiF9FeDv"
            const tokenUri = await cosmicGirl.getTokenUri()
            assert.equal(expectedTokenUri, tokenUri)
        })
    })

    describe("SupportsInterface", function () {
        it("", async () => {})
    })
})
