const hre = require("hardhat");

async function main() {
  const HazzyToken = await hre.ethers.getContractFactory("HazzyToken");
  const hazzyToken = await HazzyToken.deploy();

  await hazzyToken.deployed();

  console.log(`hazzyToken with 1 ETH deployed to ${hazzyToken.address}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
