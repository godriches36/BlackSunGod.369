const { ethers } = require("hardhat");

async function main() {
  const Organism = await ethers.getContractFactory("ANBSN_Sovereign_Organism");
  console.log("Deploying Layer 7:1 Sovereign Organism...");
  const organism = await Organism.deploy();
  await organism.deployed();
  console.log("ANBSN Organism Deployed to:", organism.address);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
