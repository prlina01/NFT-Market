// require("@nomiclabs/hardhat-waffle");

require('dotenv').config()
require('@nomiclabs/hardhat-etherscan')
require('@nomiclabs/hardhat-ethers')
const {API_KEY, PRIVATE_KEY, ETHERSCAN_API_KEY} = process.env;


module.exports = {
  networks: {
    hardhat: {
      chainId: 1337
    },
    mumbai: {
      url: `https://polygon-mumbai.g.alchemy.com/v2${API_KEY}`,
      accounts: [`0x${PRIVATE_KEY}`]
    },
    mainnet: {
      url: `https://polygon-mumbai.g.alchemy.com/v2${API_KEY}`,
      accoutns: [`0x${PRIVATE_KEY}`]
    }
  },
  solidity: "0.8.4",
};
