const hre = require("hardhat");
const fs = require("fs");
const CrowdFundingAppJson = require("../CrowdFundingApp.json");

async function deployApp() {
  const CFA = await hre.ethers.getContractFactory("CrowdFundingApp");
  const crowdFundingApp = await CFA.deploy();

  //Deploying contract
  await crowdFundingApp.deployed();
  console.log("CrowdFundingApp deployed To: ", crowdFundingApp.address);

  const data = {
    address: crowdFundingApp.address,
    abi: JSON.parse(crowdFundingApp.interface.format("json")),
  };

  fs.writeFileSync("./CrowdFundingApp.json", JSON.stringify(data));
}

async function createAPost() {
  const contract = getDeployedContract();
  console.log(contract);
}

async function getDeployedContract() {
  const MyContract = await ethers.getContractFactory("CrowdFundingApp");
  const deployedContract = await MyContract.attach(CrowdFundingAppJson.address);
  return deployedContract;
}

async function main() {
  //   deployApp();
  createAPost();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
