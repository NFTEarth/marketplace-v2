// import { constants } from 'ethers'
import { mainnet, polygon, optimism, arbitrum } from 'wagmi/chains'
import {Chain} from "@wagmi/chains"

//CONFIGURABLE: The default export controls the supported chains for the marketplace. Removing
// or adding chains will result in adding more or less chains to the marketplace.
// They are an extension of the wagmi chain objects

export interface MarketChain extends Chain {
  iconUrl: string,
  reservoirBaseUrl?: string,
  proxyApi: string,
  routePrefix: string,
  apiKey?: string,
}

export const DefaultChain: MarketChain = {
  ...mainnet,
  // Any url to display the logo of the chain
  iconUrl: `/icons/currency/0x0000000000000000000000000000000000000000.png`,
  // The base url of the reservoir api, this is used in the app when
  // directly interacting with the reservoir indexer servers (in the api proxy for example)
  // or when prefetching server side rendered data
  reservoirBaseUrl: process.env.ETH_RESERVOIR_API_BASE,
  //reservoirBaseUrl: process.env.OPTIMISM_RESERVOIR_API_BASE,
  // Used on the client side portions of the marketplace that need an api key added
  // Prevents the api key from being leaked in the clientside requests
  // If you'd like to disable proxying you can just change the proxyApi to the reservoirBaseUrl
  // Doing so will omit the api key unless further changes are made
  proxyApi: '/api/nftearth/ethereum',
  // A prefix used in the asset specific routes on the app (tokens/collections)
  routePrefix: 'ethereum',
  // Reservoir API key which you can generate at https://reservoir.tools/
  // This is a protected key and displays as 'undefined' on the browser
  // DO NOT add NEXT_PUBLIC to the key or you'll risk leaking it on the browser
  apiKey: process.env.ETH_RESERVOIR_API_KEY
}

export default [
  DefaultChain,
  {
     DefaultChain,
  {
    ...polygon,
    lightIconUrl: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    darkIconUrl: 'https://assets.coingecko.com/coins/images/4713/small/matic-token-icon.png?1624446912',
    reservoirBaseUrl: 'https://api-polygon.reservoir.tools',
    proxyApi: '/api/reservoir/polygon',
    routePrefix: 'polygon',
    apiKey: process.env.POLYGON_RESERVOIR_API_KEY,
    coingeckoId: 'matic-network',
    collectionSetId: process.env.NEXT_PUBLIC_POLYGON_COLLECTION_SET_ID,
    community: process.env.NEXT_PUBLIC_POLYGON_COMMUNITY,
  },
  {
    ...arbitrum,
    lightIconUrl: 'https://assets.coingecko.com/asset_platforms/images/33/small/AO_logomark.png?1679733357',
    darkIconUrl: 'https://assets.coingecko.com/asset_platforms/images/33/small/AO_logomark.png?1679733357',
    reservoirBaseUrl: 'https://api-arbitrum.reservoir.tools',
    proxyApi: '/api/reservoir/arbitrum',
    routePrefix: 'arbitrum',
    apiKey: process.env.ARBITRUM_RESERVOIR_API_KEY,
    coingeckoId: 'arbitrum-ecosystem',
    coingeckoId: 'arbitrum-iou',
  },
  {
    ...optimism,
    name: 'Optimism',
    lightIconUrl: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png?1660904599',
    darkIconUrl: 'https://assets.coingecko.com/coins/images/25244/small/Optimism.png?1660904599',
    reservoirBaseUrl: 'https://api-optimism.reservoir.tools',
    proxyApi: '/api/reservoir/optimism',
    routePrefix: 'optimism',
    apiKey: process.env.OPTIMISM_RESERVOIR_API_KEY,
    coingeckoId: 'optimism',
  },
  {
    id: 1101,
    name: "zkEVM",
    network: "zkevm",
    nativeCurrency: {
      decimals: 18,
      name: "Ether",
      symbol: "ETH",
    },
    rpcUrls: {
      default: {
        http: ["https://zkevm-rpc.com"]
      },
      public: {
        http: ["https://zkevm-rpc.com"],
      },
    },
    blockExplorers: {
      default: {
        name: "PolygonScan",
        url: "https://zkevm.polygonscan.com",
      },
    },
    iconUrl: `/icons/zkevm.png`,
    reservoirBaseUrl: process.env.ZKEVM_RESERVOIR_API_BASE,
    proxyApi: '/api/nftearth/zkevm',
    routePrefix: 'zkevm',
    apiKey: process.env.ZKEVM_RESERVOIR_API_KEY,
  }
] as MarketChain[]
