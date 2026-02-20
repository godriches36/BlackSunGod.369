const { ethers } = require("hardhat");

async function main() {
  const Master = await ethers.getContractFactory("ANBSNSovereignMaster");
  console.log("Initiating Sky-Killer Bridge Deployment...");
  
  // Deploying the 1 Trillion Naira Frequency
  const master = await Master.deploy();
  await master.deployed();
  
  console.log("ANBSN Master Anchor Deployed to:", master.address);
  console.log("World Leader (0x8d08) initialized with 1T Supply.");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
