import {ethers} from 'ethers'
import React, {ChangeEvent, useState } from "react";
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'
import {nftaddress, nftmarketaddress} from '../.config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import { useForm, useWatch } from "react-hook-form";
import Web3Modal from 'web3modal'
import {
    Input,
    Container,
    Row,
    Col,
    Spacer,
    Card,
    Text,
    Button,
    Modal,
    useModal,
    FormElement
} from "@nextui-org/react";



// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState('')
    const router = useRouter()
    const {control, register, handleSubmit, setValue} = useForm()
    const { setVisible, bindings } = useModal();
    const ethAmount = useWatch({control, name: 'price'})
    const [alertMsg, setAlertMsg] = useState<string>("")
    const [isWaiting, setIsWaiting] = useState<boolean>(false)


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

        let contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

        let listingPrice = await contract.getListingPrice()
        const myBal = await signer.getBalance()
        if(myBal.lt(listingPrice)) {
            setVisible(true)
            setAlertMsg("Your ETH balance is less then the listing price!")
            return
        }

        listingPrice = listingPrice.toString()

        contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        setIsWaiting(true)
        let transaction = await contract.createToken(url)
        let tx = await transaction.wait()

        let event = tx.events[0]
        let value = event.args[2]
        let tokenId = value.toNumber()

        const parsedPrice = ethers.utils.parseUnits(price.toString(), 'ether')

        let contractNew = new ethers.Contract(nftmarketaddress, Market.abi, signer)


        transaction = await contractNew.createMarketItem(
            nftaddress, tokenId, parsedPrice, {value: listingPrice}
        )
        await transaction.wait()
        setIsWaiting(false)
        await router.push('/')
    }

    const checkInputHandler = (e: ChangeEvent<FormElement>) => {

        const value = e.target.value
        const isValid = value.match(/^[+]?([0-9]+\.?[0-9]*|\.[0-9]+)$/)
        // console.log(!isValid)
        if(!isValid || value.length > 15)  {
            setValue('price', value.substring(0,value.length - 1))
            // console.log(value.substring(0,value.length - 1))
        }
        else {
            setValue('price', value)
        }
    }

    return (
            <div>
                <Spacer y={2} />
                {!isWaiting ? (
                  <>
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
                          <form onSubmit={handleSubmit(createItem)} >
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
                                  <Input.Textarea {...register('description', {required: true})}
                                                  underlined
                                                  color="primary"
                                                  labelPlaceholder="Asset Description" size={"lg"} fullWidth
                                  />
                              </Row>
                              <Spacer y={2} />

                              <Row justify="center" align="center" >
                                  <Input
                                    underlined
                                    color="primary"
                                    labelPlaceholder="Asset Price in ETH"
                                    size={"lg"} fullWidth
                                    {...register('price', {required: true})}
                                    onChange={(e) => checkInputHandler(e) }
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
                  </>
                ) : (
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
                )}


                <Modal
                  scroll
                  width="600px"
                  aria-labelledby="modal-title"
                  aria-describedby="modal-description"
                  {...bindings}
                  blur
                  // @ts-ignore
                  css={{bgColor: 'black'}}
                >
                    <Modal.Header css={{cursor: 'default'}}>
                        <Text id="modal-title" css={{textGradient: "45deg, $blue500 -20%, $pink500 50%"}} size={18}>
                            {!alertMsg && "Metamask is not installed in your browser" }
                        </Text>
                    </Modal.Header>
                    <Modal.Body css={{cursor: 'default'}}>
                        <Text id="modal-description" css={{textGradient: "45deg, $blue500 -20%, $pink500 50%"}} size={40}>
                            {alertMsg ? alertMsg : "Install it to proceed." }
                        </Text>
                    </Modal.Body>
                    <Modal.Footer css={{cursor: 'default'}}>
                        <Button auto color="error" onClick={() => {
                            setVisible(false);
                            setAlertMsg("")
                        }}>
                            Ok
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
    )

}