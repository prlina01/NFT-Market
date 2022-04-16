![Screenshot from 2022-04-16 01-17-26](https://user-images.githubusercontent.com/36077702/163651815-2c3eef91-046a-43d3-9257-8bc57903feb7.png)

NFTs, as blockchain-based immutable ownership records of digital assets, are quite popular, particularly in the space of art and collectables. However, the potential of NFTs extends beyond digital artworks. They are used for buying digital lands in virtual worlds, publishing and licensing next-generation music ownership and accessing special sales or limited-edition products such as tickets.

NFT marketplace, as the name implies, is a decentralized platform where users can create, buy, sell, and store non-fungible tokens. An NFT marketplace facilities NFT minting and trading at a global scale, while blockchain as its underlying technology ensures transparency and immutable recording of the digital asset tokenization and trading process. The marketplace also takes care of NFT storage.

## You can access the application here: https://nft-marketplace-lime.vercel.app/
*To interact with the app you will need a wallet connected to the **rinkeby** testnet network.

![za-dok2](https://user-images.githubusercontent.com/36077702/163671070-97b7d5c8-1827-493a-8884-b830dfe86a12.png)


# Steps to set up the project on your local machine
**We are going to work with _rinekby_ testnet network while connecting to _Alchemy_.**

Rinkeby is an Ethereum test network that allows for blockchain development testing without paying gas fees with real money like on the mainnet.

Alchemy is a node provider. It helps your app communicate with contracts on the blockchain like a bridge.
### Setup
- install `npm` and `npx` on your machine
- run `npm install` to set up all the dependencies (hardhat, ethers, etc.)
- set up a [Metamask](https://metamask.io/download.html) wallet
- get free eth on rinkeby testnet [here](https://www.rinkebyfaucet.com//)
- set up an Alchemy account [here](https://alchemy.com/?a=641a319005)
- create`.env` file and then fill in the following environment variables with your own info
```shell
  ETHERSCAN_API_KEY=
  API_URL=
  PRIVATE_KEY=
```


### Commands:
- run `npx hardhat compile` if you want to compile your smart contracts
- run `npx hardhat run scripts/deploy.js --network rinkeby` to deploy the contract to the Rinkeby testnet
- modify `.config.ts` file with addresses from the previous command
- run `npm run dev` to start the local server; you should be able to access the app on `localhost:3000`
- run `npx hardhat test` to run unit tests
- run `npx hardhat verify --network rinkeby <DEPLOYED_CONTRACT_ADDRESS> <CONSTRUCTOR_PARAMS> ` to verify your contract on Etherscan
