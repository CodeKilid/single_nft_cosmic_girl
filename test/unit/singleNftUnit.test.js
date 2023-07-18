const { expect, assert } = require("chai")
const { ethers } = require("hardhat")

describe("Cosmic Girl V2 Tests", () => {
    // variables and contract deploying
    let deployer, player, cosmicGirl
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
        // await cosmicGirl.safeMint(deployer.address)

        // other describes
        // cosmicGirl -> contract name
        // account name ---> deployer, user
    })

    describe("constructor", function () {
        it("Intializing", async () => {
            const name = await cosmicGirl.name()
            const symbol = await cosmicGirl.symbol()
            const initialTokenId = await cosmicGirl.getTokenId()
            const expectedTokenId = 0

            assert.equal(name, "CosmicGirl")
            assert.equal(symbol, "CS")
            assert.equal(initialTokenId, expectedTokenId)
        })
    })

    describe("SafeMint", function () {
        it("want sure minting works", async () => {
            expect(await cosmicGirl.safeMint(deployer.address))
        })
        it("sure the owner of nft after changing V2", async () => {
            let tokenId

            await cosmicGirl.safeMint(deployer.address)
            tokenId = Number(await cosmicGirl.getTokenId()) - 1
            console.log(`first : ${tokenId}`)
            const currentOwner = await cosmicGirl.ownerOf(tokenId)

            // expect deployer that minted be the owner
            expect(currentOwner).to.equal(deployer.address)
            console.log(`current owner: ${currentOwner}`)

            // Change ownership of the NFT from the deployer to the player
            await cosmicGirl.safeTransferFrom(currentOwner, player.address, tokenId)
            tokenId = Number(await cosmicGirl.getTokenId()) - 1
            const afterOwner = await cosmicGirl.ownerOf(tokenId)
            console.log(`second : ${tokenId}`)
            console.log(`second owner: ${await cosmicGirl.ownerOf(tokenId)}`)
            expect(afterOwner).to.equal(player.address)
        })

        it("only owner can mint the nft", async () => {
            await expect(cosmicGirl.connect(player).safeMint(player.address)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
        })

        it("it can be minted only once", async () => {
            await cosmicGirl.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirl.getTokenId()) - 1
            await cosmicGirl.safeTransferFrom(deployer.address, player.address, tokenId)
            await expect(cosmicGirl.connect(player).safeMint(player.address)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
        })
    })

    describe("TokenURI", function () {
        it("getting token uri V2", async () => {
            await cosmicGirl.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirl.getTokenId()) - 1
            const expectedTokenUri =
                "https://ipfs.io/ipfs/Qma2rdJ7JxmSbn3tydFrU27Er9eJPeTYNHk19mFiF9FeDv"
            const tokenUri = await cosmicGirl.tokenURI(tokenId)

            assert.equal(expectedTokenUri, tokenUri)
        })
    })

    describe("Burn Nft", function () {
        it("only owner can burn the nft", async () => {
            await cosmicGirl.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirl.getTokenId()) - 1
            await expect(cosmicGirl.connect(player).burnToken(tokenId)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
        })

        // after burning NFT , token id will lose its owner and will be free
        it("nft should be burend correctly by owner", async () => {
            //Minting NFT
            await cosmicGirl.safeMint(deployer.address)
            //In Use Token ID and The Owner
            const tokenId = Number(await cosmicGirl.getTokenId()) - 1
            const currentOwner = await cosmicGirl.ownerOf(tokenId)

            //burning token
            await cosmicGirl.burnToken(tokenId)

            assert.equal(currentOwner, deployer.address)
            await expect(cosmicGirl.ownerOf(tokenId)).to.be.revertedWith(
                "ERC721: invalid token ID",
            )
        })

        it("a burned nft can't be mint again by new owner", async () => {
            //First time mint
            await cosmicGirl.safeMint(deployer.address)
            const tokenId = Number(await cosmicGirl.getTokenId()) - 1
            const currentOwner = await cosmicGirl.ownerOf(tokenId)

            //Burning token
            await cosmicGirl.burnToken(tokenId)

            //Mint again by owner or deployer
            await cosmicGirl.safeMint(deployer.address)
            const assingTokenIdAfterBurn = Number(await cosmicGirl.getTokenId()) - 1
            const expectedTokenIdAfterBurn = 1
            const secondTimeMintOwner = await cosmicGirl.ownerOf(assingTokenIdAfterBurn)

            //Assertions
            assert.equal(currentOwner, deployer.address)
            await expect(cosmicGirl.connect(player).safeMint(player.address)).to.be.revertedWith(
                "Ownable: caller is not the owner",
            )
            assert.equal(secondTimeMintOwner, deployer.address)
            assert.equal(assingTokenIdAfterBurn, expectedTokenIdAfterBurn)
        })
    })
})
