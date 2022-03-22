import {ethers} from 'ethers'
import React, { useEffect, useState } from "react";
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useWeb3React} from "@web3-react/core";
import {useRouter} from 'next/router'
import {nftaddress, nftmarketaddress} from '../.config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import { InjectedConnector } from "@web3-react/injected-connector";
import {useForm} from "react-hook-form";


// @ts-ignore
const injected = new InjectedConnector()

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState('')
    const [nftPrice, setNftPrice] = useState(0)
    const router = useRouter()
    const {account, deactivate, activate, active, library: provider} = useWeb3React()
    const {reset, register, handleSubmit, formState} = useForm()
    // useEffect(() => {
    //     reset({
    //         name: '',
    //         description: '',
    //         price: '',
    //         file: ''
    //     })
    // }, [reset, formState.isD])


    async function connect() {
        try {
            await activate(injected)
        } catch(e) {
            console.log(e)
        }
    }

    async function onChangeFileHandler(e: React.ChangeEvent<HTMLInputElement>) {
        const file = e.target.files && e.target.files[0]
        if(file == null) return
        try {
            const added = await client.add(file)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            console.log(url)
            setFileUrl(url)
        } catch (e) {
            console.log(e)
        }
    }

    useEffect(() => {

        if (active && nftPrice) void createSale()
    }, [active])

    async function createItem(item: any) {
        if(!active) await connect()
        const {name, description, price} = item
        setNftPrice(price)
        // const {name, description, price} = formInput



        console.log(name, description, price, fileUrl)
        // if(!name || !description || !price || !fileUrl) return
        const data = JSON.stringify({name, description, image: fileUrl})
        try {
            const added = await client.add(data)
            const url = `https://ipfs.infura.io/ipfs/${added.path}`
            setFileUrl(url)
            await createSale()
        } catch (e) {
            console.log(e)
        }

    }

    async function createSale() {
        // const web3Modal = new Web3Modal()
        // const connection = await web3Modal.connect()
        // const provider = new ethers.providers.Web3Provider(connection)
        const signer = provider.getSigner()
        console.log(signer)

        let contract = new ethers.Contract(nftaddress, NFT.abi, signer)
        let transaction = await contract.createToken(fileUrl)
        let tx = await transaction.wait()

        let event = tx.events[0]
        let value = event.args[2]
        console.log('event', event)
        console.log('value', value)
        let tokenId = value.toNumber()
        console.log('tokenId', value)

        const price = ethers.utils.parseUnits(nftPrice.toString(), 'ether')
        contract = new ethers.Contract(nftmarketaddress, Market.abi, signer)

        let listingPrice = await contract.getListingPrice()
        listingPrice = listingPrice.toString()
        transaction = await contract.createMarketItem(
            nftaddress, tokenId, price, {value: listingPrice}
        )
        await transaction.wait()
        await router.push('/')
    }

    return (
            <div>
                <form onSubmit={handleSubmit(createItem)} className="flex justify-center w-1/2 flex-col pb-12">
                    <input {...register('name', {required: true})}
                           placeholder="Asset Name"
                           className="mt-8 border rounded p-4"
                           // onChange={e => updateFormInput({ ...formInput, name: e.target.value })}
                    />
                    <textarea {...register('description', {required: true})}
                              placeholder="Asset Description"
                              className="mt-2 border rounded p-4"
                              // onChange={e => updateFormInput({ ...formInput, description: e.target.value })}
                    />
                    <input {...register('price', {required: true})}
                           placeholder="Asset Price in Eth"
                           className="mt-2 border rounded p-4"
                           // onChange={e => updateFormInput({ ...formInput, price: e.target.value })}
                    />
                    <input {...register('file', {required: true})}
                           type="file"
                           name="Asset"
                           className="my-4"
                           onChange={onChangeFileHandler}
                    />
                    {
                      fileUrl && (
                        <img className="rounded mt-4" width="350" src={fileUrl} />
                      )
                    }
                    <input type="submit" value="submit" className="font-bold mt-4 bg-pink-500 hover:bg-pink-700 text-white rounded p-4 shadow-lg" />

                </form>
            </div>
    )

}