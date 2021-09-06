import { Network, SimpleFunctionAbi } from './types'

export const ADDRESS_ZERO = '0x0000000000000000000000000000000000000000';

export enum NETWORK_CODENAMES {
  ethereum = 'ethereum',
  ropsten = 'ropsten',
  kovan = 'kovan',
  rinkeby = 'rinkeby',
  goerli = 'goerli',
  bsc = 'bsc',
  bscTestnet = 'bscTestnet',
  polygon = 'polygon',
  polygonTestnet = 'polygonTestnet',
  heco = 'heco',
  hecoTestnet = 'hecoTestnet',
  avalanche = 'avalanche',
  optimism = 'optimism',
  arbitrum = 'arbitrum',
}

export const DEFAULT_NETWORKS: Network[] = [
  {
    id: '1',
    codename: NETWORK_CODENAMES.ethereum,
    name: 'Ethereum',
    coinSymbol: 'eth',
    scan: 'https://etherscan.io',
    rpcUrl: '',
    isTestnet: false,
  },
  {
    id: '3',
    codename: NETWORK_CODENAMES.ropsten,
    name: 'Ropsten',
    coinSymbol: 'eth',
    scan: 'https://ropsten.etherscan.io',
    rpcUrl: '',
    isTestnet: true,
  },
  {
    id: '42',
    codename: NETWORK_CODENAMES.kovan,
    name: 'Kovan',
    coinSymbol: 'eth',
    scan: 'https://kovan.etherscan.io',
    rpcUrl: '',
    isTestnet: true,
  },
  {
    id: '4',
    codename: NETWORK_CODENAMES.rinkeby,
    name: 'Rinkeby',
    coinSymbol: 'eth',
    scan: 'https://rinkeby.etherscan.io',
    rpcUrl: '',
    isTestnet: true,
  },
  {
    id: '5',
    codename: NETWORK_CODENAMES.goerli,
    name: 'Goerli',
    coinSymbol: 'eth',
    scan: 'https://goerli.etherscan.io',
    rpcUrl: '',
    isTestnet: true,
  },
  {
    id: '56',
    codename: NETWORK_CODENAMES.bsc,
    name: 'BSC',
    coinSymbol: 'bnb',
    scan: 'https://bscscan.com',
    rpcUrl: 'https://bsc-dataseed.binance.org/',
    isTestnet: false,
  },
  {
    id: '97',
    codename: NETWORK_CODENAMES.bscTestnet,
    name: 'BSC testnet',
    coinSymbol: 'bnb',
    scan: 'https://testnet.bscscan.com',
    rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    isTestnet: true,
  },
  {
    id: '137',
    codename: NETWORK_CODENAMES.polygon,
    name: 'Polygon',
    coinSymbol: 'matic',
    scan: 'https://polygonscan.com',
    rpcUrl: 'https://rpc-mainnet.maticvigil.com',
    isTestnet: false,
  },
  {
    id: '80001',
    codename: NETWORK_CODENAMES.polygonTestnet,
    name: 'Polygon Testnet',
    coinSymbol: 'matic',
    scan: 'https://explorer-mumbai.maticvigil.com',
    rpcUrl: 'https://rpc-mumbai.matic.today',
    isTestnet: true,
  },
  {
    id: '128',
    codename: NETWORK_CODENAMES.heco,
    name: 'HECO',
    coinSymbol: 'ht',
    scan: 'https://hecoinfo.com',
    rpcUrl: 'https://http-mainnet-node.huobichain.com',
    isTestnet: false,
  },
  {
    id: '256',
    codename: NETWORK_CODENAMES.hecoTestnet,
    name: 'HECO',
    coinSymbol: 'ht',
    scan: 'https://testnet.hecoinfo.com',
    rpcUrl: 'https://http-testnet.hecochain.com',
    isTestnet: true,
  },
  {
    id: '43114',
    codename: NETWORK_CODENAMES.avalanche,
    name: 'Avalanche',
    coinSymbol: 'avax',
    scan: 'https://cchain.explorer.avax.network',
    rpcUrl: 'https://api.avax.network/ext/bc/C/rpc',
    isTestnet: false,
  },
  {
    id: '10',
    codename: NETWORK_CODENAMES.optimism,
    name: 'Optimism',
    coinSymbol: 'eth',
    scan: 'https://optimistic.etherscan.io',
    rpcUrl: 'https://mainnet.optimism.io',
    isTestnet: false,
  },
  {
    id: '42161',
    codename: NETWORK_CODENAMES.arbitrum,
    name: 'Arbitrum One',
    coinSymbol: 'eth',
    scan: 'https://arbiscan.io',
    rpcUrl: 'https://arb1.arbitrum.io/rpc',
    isTestnet: false,
  },
];

export const EMPTY_PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';

export const basicERC20Abi = [
  // Read-Only Functions
  "function balanceOf(address owner) view returns (uint256)",
  "function decimals() view returns (uint8)",
  "function symbol() view returns (string)",
  // Authenticated Functions
  "function allowance(address owner, address spender) external view returns (uint256)",
  "function transfer(address to, uint256 amount) returns (boolean)",
  "function transferFrom(address sender, address recipient, uint256 amount) external returns (bool)",
  "function approve(address spender, uint256 value) public returns (bool success)",
  // Events
  "event Transfer(address indexed from, address indexed to, uint amount)"
];

// @ts-ignore
export const PAYABLE_ABI: SimpleFunctionAbi = {"type":"function","name":"send","constant":false,"inputs":[{"name":"value","type":"uint256","components":[],"arrayLength":0,"arrayChildren":null,"_isParamType":true,"indexed":null,"baseType":"uint256"}],"outputs":[],"payable":true,"stateMutability":"payable","format":null, "_isFragment":true};
