const { ethers } = require("hardhat");
const { expect } = require("chai");

// describe("DeployCrowdFund", function () {
//   let crowdFundingApp;
//   beforeEach(async () => {
//     const CFA = await hre.ethers.getContractFactory("CrowdFundingApp");
//     crowdFundingApp = await CFA.deploy();
//     //Deploying contract
//     await crowdFundingApp.deployed();
//   });
// //   it("Shoud be able to create a post", async function () {
// //     const createPost = await crowdFundingApp.createPost(
// //       "PostTitle",
// //       "This is post Desc, Please fund amount",
// //       {
// //         value: ethers.utils.parseEther("0.001"),
// //       }
// //     );

// //     const postIdInreturn = await createPost.wait();
// //     console.log("=====>>>>Create Post<<<<====");
// //     console.log("PlatformCharge:::", postIdInreturn.platformCharge);
// //     expect(postIdInreturn).to.equal(1);
// //   });
// });

describe("CrowdFundAppTester", function () {
  it("Should check the platformCharge", async function () {
    const CFA = await hre.ethers.getContractFactory("CrowdFundingApp");
    const crowdFundingApp = await CFA.deploy();
    await crowdFundingApp.deployed();

    expect(await crowdFundingApp.getplatformChargePercentage()).to.equal(2);
  });
});

describe("CrowdFundPost", function () {
  it("Should check the post", async function () {
    const CFA = await hre.ethers.getContractFactory("CrowdFundingApp");
    const crowdFundingApp = await CFA.deploy();
    await crowdFundingApp.deployed();
    const createPost = await crowdFundingApp.createPost(
      "PostTitle",
      "This is post Desc, Please fund amount",
      {
        value: ethers.utils.parseEther("0.001"),
      }
    );
    const postData = await crowdFundingApp.getPostByPostId(1);
    const postPercentage = await crowdFundingApp.getplatformChargePercentage();
    console.log(postData);
    // expect(await crowdFundingApp.getplatformChargePercentage()).to.equal(2);
  });
});
