import {ethers} from 'ethers'
import {useEffect, useState} from 'react'
import axios from 'axios'

import {nftaddress, nftmarketaddress} from '../.config'

import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import NFTMarket from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import Web3Modal from "web3modal";
import { Modal, useModal, Button, Text, Grid, Card, Col, Row, Container, Spacer } from "@nextui-org/react";

interface IMarketItem {
    itemId: ethers.BigNumber;
    nftContract: string;
    tokenId: ethers.BigNumber;
    seller: string;
    owner: string;
    price: number;
    sold: boolean;
    image: string,
    name: string
}



export default function Home() {
    const [nfts, setNfts] = useState<IMarketItem[]>([])
    const [loadingState, setLoadingState] = useState<string>('not-loaded')
    const { setVisible, bindings } = useModal();
    const [successMsg, setSuccessMsg] = useState<string>("")
    const [isWaiting, setIsWaiting] = useState<boolean>(false)

    const [isMetamask, setIsMetamask] = useState<boolean>(false)

    useEffect(() => {
        void loadNFTs()
    }, [])

    async function loadNFTs() {
        const provider = new ethers.providers.AlchemyProvider('rinkeby')
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, provider)
        const data = await marketContract.fetchMarketItems()
        const items = await Promise.all(data.map(async (i: IMarketItem) => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri) //https://ipfs...
            let price = ethers.utils.formatUnits(i.price.toString(), 'ether')
            let item = {
                price,
                itemId: i.itemId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
                name: meta.data.name,
                description: meta.data.description,
            }
            return item
        }))
        setNfts(items)
        console.log(items[0])

        setLoadingState('loaded')
    }

    async function buyNFTs(nft: IMarketItem) {


        if (typeof window.ethereum == "undefined") {
            setVisible(true)
            setIsMetamask(false)
            console.log(isMetamask)
            return
        }


        setIsMetamask(true)

        const web3Modal = new Web3Modal()

        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)

        const signer = provider.getSigner()

        const contract = new ethers.Contract(nftmarketaddress, NFTMarket.abi, signer)
        let currentBalance = await signer.getBalance()
        const price = ethers.utils.parseEther(nft.price.toString())

        if(currentBalance.lt(price)) {
            setVisible(true)
            return
        }
        setIsWaiting(true)

        const transaction = await contract.createMarketSale(nftaddress, nft.itemId,
            {value: price})
        await transaction.wait()

        setIsWaiting(false)
        setVisible(true)
        setSuccessMsg(`Successfully bought the NFT: ${nft.name}`)

        await loadNFTs()
    }


    if (loadingState === 'loaded' && !nfts.length) return (
        <h1 className="px-20 py-10 text-3xl">
            No items in the marketplace
        </h1>
    )


    return(
      <Grid.Container gap={2} justify="center">
                  {
                      !isWaiting ? (nfts.map((nft, i) => (
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
                                                <Row justify="flex-end">
                                                    <Button flat auto rounded color="secondary" onClick={() => buyNFTs(nft)}>
                                                        <Text
                                                          css={{ color: "inherit" }}
                                                          size={12}
                                                          weight="bold"
                                                          transform="uppercase"
                                                        >
                                                            Buy NFT
                                                        </Text>
                                                    </Button>
                                                </Row>
                                            </Col>
                                        </Row>
                                    </Card.Footer>

                                </Card>
                            </Grid>

                      ))) : (
                        <Container xs>
                            <Card css={{bgColor: "$blue900"}}>
                                <Text h1 size={60} css={{
                                    textGradient: "45deg, $blue500 -20%, $pink500 50%",
                                    textAlign: "center",
                                    my: '15px'
                                }}>
                                    { "Waiting for transactions..."}
                                </Text>
                            </Card>
                        </Container>
                      )
                  }
                  <Modal
                    scroll
                    width="600px"
                    aria-labelledby="modal-title"
                    aria-describedby="modal-description"
                    {...bindings}
                    blur
                    // @ts-ignore
                    css={{bgColor: 'black'}}

                  > {successMsg ? (
                    <>
                        <Modal.Header css={{cursor: 'default'}}>
                            <Text id="modal-title" size={18}>
                            </Text>
                        </Modal.Header>
                        <Modal.Body css={{cursor: 'default'}}>
                            <Text id="modal-description"
                                  css={{textGradient: "45deg, $blue500 -20%, $pink500 50%"}} size={40}>
                                {successMsg}
                            </Text>
                        </Modal.Body>
                        <Modal.Footer css={{cursor: 'default'}}>
                            <Button auto color="error" onClick={() => {
                                setVisible(false)
                                setSuccessMsg("")
                            }}>
                                Ok
                            </Button>
                        </Modal.Footer>
                    </>
                  ) : (
                    <>
                        <Modal.Header css={{cursor: 'default'}}>
                            <Text id="modal-title" css={{textGradient: "45deg, $blue500 -20%, $pink500 50%"}} size={40}>
                                {isMetamask ? "Not enough ETH" : "Metamask is not installed in your browser" }
                            </Text>
                        </Modal.Header>
                        <Modal.Body css={{cursor: 'default'}}>
                            <Text id="modal-description">
                            </Text>
                        </Modal.Body>
                        <Modal.Footer css={{cursor: 'default'}}>
                            <Button auto color="error" onClick={() => setVisible(false)}>
                                Ok
                            </Button>
                        </Modal.Footer>
                    </>
                  )}

                  </Modal>
      </Grid.Container>

    )
}