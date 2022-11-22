const hre = require("hardhat");
const fs = require("fs");
// const CrowdFundingAppJson = require("../CrowdFundingApp.json");

async function deployAppWithGasEstimation() {
  const CFA = await ethers.getContractFactory("CrowdFundingApp");

  const gasPrice = await CFA.signer.getGasPrice();
  console.log(`Current gas price: ${gasPrice}`);

  const estimatedGas = await CFA.signer.estimateGas(CFA.getDeployTransaction());
  console.log(`Estimated gas: ${estimatedGas}`);

  const deploymentPrice = gasPrice.mul(estimatedGas);
  const deployerBalance = await CFA.signer.getBalance();
  console.log(
    `Deployer balance:  ${ethers.utils.formatEther(deployerBalance)}`
  );
  console.log(
    `Deployment price:  ${ethers.utils.formatEther(deploymentPrice)}`
  );
  if (deployerBalance.lt(deploymentPrice)) {
    throw new Error(
      `Insufficient funds. Top up your account balance by ${ethers.utils.formatEther(
        deploymentPrice.sub(deployerBalance)
      )}`
    );
  }

  const crowdFundingApp = await CFA.deploy();
  await crowdFundingApp.deployed();
  console.log("CrowdFundingApp deployed To: ", crowdFundingApp.address);
  const data = {
    address: crowdFundingApp.address,
    abi: JSON.parse(crowdFundingApp.interface.format("json")),
  };

  fs.writeFileSync("./CrowdFundingApp.json", JSON.stringify(data));
  fs.writeFileSync(
    "../crowdfundapp-fe/src/CrowdFundingApp.json",
    JSON.stringify(data)
  );
}

async function deployApp() {
  const CFA = await hre.ethers.getContractFactory("CrowdFundingApp");
  const crowdFundingApp = await CFA.deploy();
  console.log("Deploying crowdFundingApp");
  //Deploying contract
  await crowdFundingApp.deployed();
  console.log("CrowdFundingApp deployed To: ", crowdFundingApp.address);

  const data = {
    address: crowdFundingApp.address,
    abi: JSON.parse(crowdFundingApp.interface.format("json")),
  };

  fs.writeFileSync("./CrowdFundingApp.json", JSON.stringify(data));
  fs.writeFileSync(
    "../crowdfundapp-fe/src/CrowdFundingApp.json",
    JSON.stringify(data)
  );
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
  deployAppWithGasEstimation();
  // deployApp();
  // createAPost();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
