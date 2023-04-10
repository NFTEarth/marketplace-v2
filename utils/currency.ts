export enum Network {
  // Ethereum
  Ethereum = 1,
  EthereumGoerli = 5,
  // Optimism
  Optimism = 10,
  // Gnosis
  Gnosis = 100,
  // Polygon
  Polygon = 137,
  PolygonMumbai = 80001,
  // ZKSync
  zkSync = 324,
  // zkEVM
  zkEVM = 1101,
  // Arbitrum
  Arbitrum = 42161,
  // Avalanche
  Avalanche = 43114,
  AvalancheFuji = 43113,
}

export type ChainIdToAddress = { [chainId: number]: string };

export const Weth: ChainIdToAddress = {
  [Network.Ethereum]: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
  [Network.EthereumGoerli]: "0xb4fbf271143f4fbf7b91a5ded31805e42b2208d6",
  [Network.Optimism]: "0x4200000000000000000000000000000000000006",
  [Network.Gnosis]: "0x6a023ccd1ff6f2045c3309768ead9e68f978f6e1",
  [Network.Arbitrum]: "0x82af49447d8a07e3bd95bd0d56f35241523fbab1",
  [Network.zkEVM]: "0x4F9A0e7FD2Bf6067db6994CF12E4495Df938E6e9",
  // Polygon: Wrapped MATIC
  [Network.Polygon]: "0x0d500b1d8e8ef31e21c99d1db9a6444d3adf1270",
  [Network.PolygonMumbai]: "0x9c3c9283d3e44854697cd22d3faa240cfb032889",
  // Avalanche: Wrapped AVAX
  [Network.Avalanche]: "0xb31f66aa3c1e785363f0875a1b74e27b85fd66c7",
  [Network.AvalancheFuji]: "0x1d308089a2d1ced3f1ce36b1fcaf815b07217be3",
};

// TODO: Include addresses across all supported chains
export const Usdc: ChainIdToAddress = {
  [Network.Ethereum]: "0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48",
  [Network.Polygon]: "0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
  [Network.Optimism]: "0x7f5c764cbc14f9669b88837ca1490cca17c31607",
  [Network.Arbitrum]: "0xFF970A61A04b1cA14834A43f5dE4533eBDDB5CC8",
  [Network.zkEVM]: "0xA8CE8aee21bC2A48a5EF670afCc9274C7bbbC035",
};