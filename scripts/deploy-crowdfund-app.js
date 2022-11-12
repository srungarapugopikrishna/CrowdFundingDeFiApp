const hre = require("hardhat");

async function deployApp() {
  const CFA = await hre.ethers.getContractFactory("CrowdFundingApp");
  const crowdFundingApp = await CFA.deploy();

  //Deploying contract
  await crowdFundingApp.deployed();
  console.log("CrowdFundingApp deployed To: ", crowdFundingApp.address);
}

async function main() {
  deployApp();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
