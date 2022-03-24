import '../styles/globals.css'
import type { AppProps } from 'next/app'
import Link from 'next/link'
import {ExternalProvider, JsonRpcFetchFunc, Web3Provider} from "@ethersproject/providers";
import {Web3ReactProvider} from "@web3-react/core";

// const getLibrary = (provider: ExternalProvider | JsonRpcFetchFunc) => {
//     return new Web3Provider(provider)
// }

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <nav className="border-b p-6">
            <p className="text-4xl font-bold">Future Marketplace</p>
            <div className="flex mt-4">
                <Link href="/">
                    <a className="mr-4 text-pink-500">
                        Home
                    </a>
                </Link>
                <Link href="/create-item">
                    <a className="mr-6 text-pink-500">
                        Sell Digital Asset
                    </a>
                </Link>
                <Link href="/my-assets">
                    <a className="mr-6 text-pink-500">
                        Mu Digital Assets
                    </a>
                </Link>
                <Link href="/creator-dashboard">
                    <a className="mr-6 text-pink-500">
                        Creator Dashboard
                    </a>
                </Link>
            </div>
    </nav>
      <Component {...pageProps} />
    </>
      )
}

export default MyApp
