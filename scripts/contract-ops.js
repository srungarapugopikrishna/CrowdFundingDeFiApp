const hre = require("hardhat");
const CrowdFundingAppJson = require("../CrowdFundingApp.json");

async function getAllPosts() {
  const contract = await getDeployedContract();
  const allPosts = await contract.getAllPosts();
  console.log(allPosts);
}

async function getAllVaiableValues() {
  const contract = await getDeployedContract();
  const platformCharge = await contract.getPlatformCharge();
  const platformChargePercentage = await contract.getplatformChargePercentage();
  const postIdLatest = await contract._postIdCounter();
  const postByID = await contract.getPostByPostId(postIdLatest);

  console.log("platformCharge:::", platformCharge);
  console.log("platformChargePercentage:::", platformChargePercentage);
  console.log("postIdLatest:::", postIdLatest);
  console.log("postByID:::", postByID);
}

async function getDeployedContract() {
  const MyContract = await ethers.getContractFactory("CrowdFundingApp");
  const deployedContract = await MyContract.attach(CrowdFundingAppJson.address);
  return deployedContract;
}

async function createPost() {
  const contract = await getDeployedContract();
  const [signer0, signer1, signer2] = await hre.ethers.getSigners();
  const createPost1Tx = await contract
    .connect(signer0)
    .createPost("This is my first Post", "Post descriptoion is please fund me");
}

async function main() {
  //   getAllPosts();
  //   getAllVaiableValues();
  createPost();
  getAllPosts();
  getAllVaiableValues();
}
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
