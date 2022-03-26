import {ethers} from 'ethers'
import React, {useState } from "react";
import {create as ipfsHttpClient} from 'ipfs-http-client'
import {useRouter} from 'next/router'
import {nftaddress, nftmarketaddress} from '../.config'
import NFT from '../artifacts/contracts/NFT.sol/NFT.json'
import Market from '../artifacts/contracts/NFTMarket.sol/NFTMarket.json'
import { InjectedConnector } from "@web3-react/injected-connector";
import {useForm} from "react-hook-form";
import Web3Modal from 'web3modal'


// @ts-ignore
const injected = new InjectedConnector()

// @ts-ignore
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


export default function CreateItem() {
    const [fileUrl, setFileUrl] = useState('')
    const router = useRouter()
    const {register, handleSubmit} = useForm()



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
        console.log('item', item)
        const {name, description, price} = item
        console.log('price1', price)

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