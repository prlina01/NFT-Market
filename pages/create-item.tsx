import {ethers} from 'ethers'
import React, {useState } from "react";
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'
import {nftaddress, nftmarketaddress} from '../.config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import {useForm} from "react-hook-form";
import Web3Modal from 'web3modal'
import { Input, Grid, Container, Row, Col, Spacer, Card, Text, Button, Modal, useModal } from "@nextui-org/react";



// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState('')
    const router = useRouter()
    const {register, handleSubmit} = useForm()

    const { setVisible, bindings } = useModal();





    async function onChangeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0]
        if(file == null) return
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
        } catch (e) {
            console.log(e)
        }
    }



    async function createItem(item: any) {
        const {name, description, price} = item

        if (typeof window.ethereum == "undefined") {
            setVisible(true)
            return
        }


        const data = JSON.stringify({name, description, image: fileUrl})
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            await createSale(url, price)
        } catch (e) {
            console.log(e)
        }

    }

    async function createSale(url: string, price: number) {
        const web3Modal = new Web3Modal()
        const connection = await web3Modal.connect()
        const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()

        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()

        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        const parsedPrice = ethers.utils.parseUnits(price.toString(), 'ether')
        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        transaction = await contract.createMarketItem(
            nftaddress, tokenId, parsedPrice, {value: listingPrice}
        )
        await transaction.wait()
        await router.push('/')
    }

    return (
            <div>
                <Spacer y={2} />
                <Container>
                    <Row gap={1}>
                        <Col >
                            <Card >
                                <Text h1 color="white"   css={{
                                    textGradient: "45deg, $blue500 -20%, $pink500 50%",
                                    textAlign: "center"
                                }}>
                                    Sell your NFT today! Listing price is 0.025 ETH
                                </Text>
                            </Card>
                        </Col>
                    </Row>
                </Container>
                <Container xs>
                <form onSubmit={handleSubmit(createItem)} className="">
                    <Spacer y={2} />
                    <Row  justify="center" align="center">
                        <Col >
                        <Input {...register('name', {required: true})}
                          clearable
                          underlined
                          color="primary"
                          labelPlaceholder="Asset Name" size={"lg"} fullWidth
                        />
                        </Col>
                    </Row>
                    <Spacer y={2} />

                    <Row justify="center" align="center" >
                        <Input {...register('description', {required: true})}
                          clearable
                          underlined
                          color="primary"
                          labelPlaceholder="Asset Description" size={"lg"} fullWidth
                        />
                    </Row>
                    <Spacer y={2} />

                    <Row justify="center" align="center" >
                        <Input  {...register('price', {required: true})}
                               clearable
                               underlined
                               color="primary"
                               labelPlaceholder="Asset Price in ETH" size={"lg"} fullWidth
                                type="number"
                        />
                    </Row>
                    <Spacer y={0.5} />
                    <Row justify="center" align="center">
                    {
                      fileUrl && (
                        <img className="rounded mt-4" width="150" src={fileUrl} />
                      )
                    }
                    </Row>
                    <Spacer y={1} />
                    <Row justify="center" align="center" >

                    <input {...register('file', {required: true})}
                           type="file"
                           name="Asset"
                           className=""
                           onChange={onChangeFileHandler}
                    />

                    <Button type="submit" color="gradient">
                        Sell
                    </Button>
                    </Row>


                </form>
                </Container>

                <Modal
                  scroll
                  width="600px"
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  {...bindings}
                  blur
                >
                    <Modal.Header>
                        <Text id="modal-title" size={18}>
                            Metamask is not installed in your browser
                        </Text>
                    </Modal.Header>
                    <Modal.Body>
                        <Text id="modal-description">
                              Install it to proceed.
                        </Text>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button auto color="error" onClick={() => setVisible(false)}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    )

}