require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  networks: {
    goerli: {
      // url: process.env.GOERLI_URL,
      // accounts: [process.env.ACC_PRIVATE_KEY],
      url: "https://eth-goerli.g.alchemy.com/v2/VjSnVmpD6gRO3EqVwps-TUbn2eLEtSn-",
      accounts: [
        "3a5f61e1340574cc80f2f9b4508dc4184529589376962273c23c1df24d52f1e7",
      ],
    },
  },
};
