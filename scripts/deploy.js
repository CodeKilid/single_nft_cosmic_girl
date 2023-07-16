const { network } = require("hardhat");
const { developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");
require("dotenv").config();

console.log(process.env.RPC_URL);
module.exports = async function ({ deployments, getNamedAccounts }) {
  const { deploy, log } = deployments;
  const { deployer } = await getNamedAccounts();
  log(deployer);
  const args = [];

  const cosmicGirl = await deploy("CosmicGirl", {
    from: deployer,
    log: true,
    args: args,
  });
  log(process.env.ETHERSCAN_API_KEY);
  if (
    !developmentChains.includes(network.name) &&
    process.env.ETHERSCAN_API_KEY
  ) {
    log("Verifying...");
    await verify(cosmicGirl.address, args);
  }
  log("Deployed.");
  log("-----------------------------------------------------------");
};

module.exports.tags = ["all", "CosmicGirl"];

// mumbai testnet contract address = 0x1aaFdaD0df01546935aabAf64F5E9738281E452E
// sepolia testnet contract address = 0x719f567537E7d274b40a8Eb0Af7F3ADe632F7C1a
