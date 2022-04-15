import { ethers } from 'ethers'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Web3Modal from "web3modal"

import {
  nftmarketaddress, nftaddress
} from '../.config'

import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import { useRouter } from "next/router";
import { Card, Col, Grid, Row, Text } from "@nextui-org/react";

export default function CreatorDashboard() {

  const [nfts, setNfts] = useState<INft[]>([])
  const [sold, setSold] = useState<INft[]>([])
  const [loadingState, setLoadingState] = useState('not-loaded')
  const router = useRouter()
  useEffect(() => {
    void loadNFTs()
  }, [])

  interface INft {
    price: number,
    tokenId: ethers.BigNumber,
    seller: string,
    owner: string,
    sold: boolean,
    image: string,
    name: string
  }


  async function loadNFTs() {

    if (typeof window.ethereum == "undefined") {
      router.push('/')
      return
    }

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()

    const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, signer)
    const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
    const data = await marketContract.fetchItemsCreated()

    const items = await Promise.all(data.map(async (i: INft) => {
      const tokenUri = await tokenContract.tokenURI(i.tokenId)
      const meta = await axios.get(tokenUri)
      let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
      let item = {
        price,
        tokenId: i.tokenId.toNumber(),
        seller: i.seller,
        owner: i.owner,
        sold: i.sold,
        image: meta.data.image,
        name: meta.data.name
      }
      return item
    }))
    /* create a filtered array of items that have been sold */
    const soldItems = items.filter(i => i.sold)
    setSold(soldItems)
    setNfts(items)
    setLoadingState('loaded')
  }
  if (loadingState === 'loaded' && !nfts.length) return (<h1 className="py-10 px-20 text-3xl">No assets created</h1>)
  return (
    <div>
      <div className="p-4">
        <h2 className="text-2xl py-2">Items Created</h2>
          {
            <Grid.Container gap={2} justify="center">
              {
                nfts.map((nft, i) => (
                    <Grid xs={12} sm={4} lg={3} key={i} >
                      <Card>
                        <Card.Header css={{ position: "absolute", zIndex: 1, bgColor: '$blue900'}}>
                          <Col>
                            <Text
                              size={20}
                              weight="bold"
                              transform="uppercase"
                              css={{
                                textGradient: "45deg, $blue500 -20%, $pink500 50%", textAlign: "center" }}
                            >
                              {nft.name}
                            </Text>
                            {/*<Text h4 css={{*/}
                            {/*    textGradient: "45deg, $blue500 -20%, $pink500 50%", }}>*/}
                            {/*    {nft.description}*/}
                            {/*</Text>*/}
                          </Col>
                        </Card.Header>
                        <Card.Image
                          src={nft.image}
                          height={340}
                          width="100%"
                          // objectFit="cover"
                          alt="Card image background"
                        />
                        <Card.Footer
                          // className={"backdrop-blur-sm"}
                          css={{
                            bgColor: '$blue900',
                            position: "absolute",
                            borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                            bottom: 0,
                            zIndex: 1,
                          }}
                        >
                          <Row>
                            <Col>
                              <Text size={25} css={{
                                textGradient: "45deg, $blue500 -20%, $pink500 50%", }}
                              >
                                {nft.price.toString()} ETH
                              </Text>
                            </Col>
                            <Col>
                            </Col>
                          </Row>
                        </Card.Footer>

                      </Card>
                    </Grid>
                  )
                )
              }
            </Grid.Container>
          }
      </div>
      <div className="px-4">
        {
          Boolean(sold.length) && (
            <div>
              <h2 className="text-2xl py-2">Items sold</h2>
                {
                  <Grid.Container gap={2} justify="center">
                    {
                      sold.map((nft, i) => (
                          <Grid xs={12} sm={4} lg={3} key={i} >
                            <Card>
                              <Card.Header css={{ position: "absolute", zIndex: 1, bgColor: '$blue900'}}>
                                <Col>
                                  <Text
                                    size={20}
                                    weight="bold"
                                    transform="uppercase"
                                    css={{
                                      textGradient: "45deg, $blue500 -20%, $pink500 50%", textAlign: "center" }}
                                  >
                                    {nft.name}
                                  </Text>
                                  {/*<Text h4 css={{*/}
                                  {/*    textGradient: "45deg, $blue500 -20%, $pink500 50%", }}>*/}
                                  {/*    {nft.description}*/}
                                  {/*</Text>*/}
                                </Col>
                              </Card.Header>
                              <Card.Image
                                src={nft.image}
                                height={340}
                                width="100%"
                                // objectFit="cover"
                                alt="Card image background"
                              />
                              <Card.Footer
                                // className={"backdrop-blur-sm"}
                                css={{
                                  bgColor: '$blue900',
                                  position: "absolute",
                                  borderTop: "$borderWeights$light solid rgba(255, 255, 255, 0.2)",
                                  bottom: 0,
                                  zIndex: 1,
                                }}
                              >
                                <Row>
                                  <Col>
                                    <Text size={25} css={{
                                      textGradient: "45deg, $blue500 -20%, $pink500 50%", }}
                                    >
                                      {nft.price.toString()} ETH
                                    </Text>
                                  </Col>
                                  <Col>
                                  </Col>
                                </Row>
                              </Card.Footer>

                            </Card>
                          </Grid>
                        )
                      )
                    }
                  </Grid.Container>

                }
            </div>
          )
        }
      </div>
    </div>
  )
}