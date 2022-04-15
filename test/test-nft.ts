import {ethers} from "hardhat"
import { NFT, NFTMarket } from "../typechain";
import { BigNumber } from "ethers";
import { expect } from "chai";

describe("NFTMarket", function() {

  let market: NFTMarket
  let nft: NFT
  let nftContractAddress: string
  let listingPrice: number | BigNumber | string
  let auctionPrice: BigNumber

  beforeEach(async () => {
    const Market = await ethers.getContractFactory("NFTMarket")
    market = await Market.deploy()
    await market.deployed()
    const marketAddress = market.address
    const NFT = await ethers.getContractFactory("NFT")
    nft = await NFT.deploy(marketAddress)
    await nft.deployed()
    nftContractAddress = nft.address
    listingPrice = await market.getListingPrice()
    listingPrice = listingPrice.toString()
    auctionPrice = ethers.utils.parseUnits('1', 'ether')

    await nft.createToken("https://location1.com")
    await nft.createToken("https://location2.com")
  })
  it("Should create and execute market sales", async function() {


    const [sellerAddress, buyerAddress] = await ethers.getSigners()


    await market.connect(sellerAddress).createMarketItem(nftContractAddress, 1, auctionPrice, { value: listingPrice })
    await market.connect(sellerAddress).createMarketItem(nftContractAddress, 2, auctionPrice, { value: listingPrice })
    let num = await market.connect(sellerAddress).fetchItemsCreated()
    expect(num.length.toString()).to.equal('2')

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 1, { value: auctionPrice})
    num = await market.connect(buyerAddress).fetchMyNFTs()
    expect(num.length.toString()).to.equal('1')

    await market.connect(buyerAddress).createMarketSale(nftContractAddress, 2, { value: auctionPrice})

    num = await market.connect(buyerAddress).fetchMyNFTs()
    expect(num.length.toString()).to.equal('2')

    let items = await market.fetchMarketItems()
    let items_1 = await Promise.all(items.map(async i => {
      const tokenUri = await nft.tokenURI(i.tokenId)
      let item = {
        price: i.price.toString(),
        tokenId: i.tokenId.toString(),
        seller: i.seller,
        owner: i.owner,
        tokenUri
      }
      return item
    }))
    expect(items_1.length.toString()).to.equal('0')
    console.log('items: ', items_1)
  })
})