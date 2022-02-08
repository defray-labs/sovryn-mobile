import { constants, ethers } from 'ethers';
import { Asset, AssetType } from 'models/asset';
import type { Token } from 'types/token';

function checkTokens<S extends string>(arr: (Token & { id: S })[]) {
  return arr;
}

function checkAssets<S extends string>(arr: (Asset & { id: S })[]) {
  return arr;
}

export const assets = checkAssets([
  // rsk mainnet
  new Asset(
    30,
    'rbtc',
    'RBTC',
    'Smart Bitcoin',
    constants.AddressZero,
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    '',
    AssetType.NATIVE,
  ),
  new Asset(
    1,
    'eth',
    'ETH',
    'Ethereum',
    constants.AddressZero,
    18,
    'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    '',
    AssetType.NATIVE,
  ),
  new Asset(
    56,
    'bnb',
    'BNB',
    'Binance Coin',
    constants.AddressZero,
    18,
    'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    '',
    AssetType.NATIVE,
  ),
  new Asset(
    30,
    'sov',
    'SOV',
    'Sovryn',
    '0xEFc78fc7d48b64958315949279Ba181c2114ABBd',
    18,
    require('assets/tokens/sov.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    1,
    'esov',
    'eSOV',
    'Sovryn on Ethereum',
    '0xbdab72602e9ad40fc6a6852caf43258113b8f7a5',
    18,
    require('assets/tokens/sov.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'xusd',
    'XUSD',
    'XUSD',
    '0xb5999795BE0EbB5bAb23144AA5FD6A02D080299F',
    18,
    require('assets/tokens/xusd.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'wrbtc',
    'wRBTC',
    'Wrapped Smart Bitcoin',
    '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'bpro',
    'BRPO',
    'BRPO',
    '0x440cd83c160de5c96ddb20246815ea44c7abbca8',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bpro.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'rif',
    'RIF',
    'RIF',
    '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rif.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'rusdt',
    'RUSDT',
    'RUSDT',
    '0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/usdt.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'eths',
    'ETHS',
    'Ethereum on Sovryn',
    '0x1D931Bf8656d795E50eF6D639562C5bD8Ac2B78f',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/eth.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'bnbs',
    'BNBS',
    'Binance Coin on Sovryn',
    '0x6D9659bdF5b1A1dA217f7BbAf7dBAF8190E2e71B',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bnb.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'fish',
    'FISH',
    'BabelFish',
    '0x055A902303746382FBB7D18f6aE0df56eFDc5213',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/babelfish.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'mynt',
    'MYNT',
    'Mynt',
    '0x2e6B1d146064613E8f521Eb3c6e65070af964EbB',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/mint.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'doc',
    'DOC',
    'Dollar On Chain',
    '0xe700691da7b9851f2f35f8b8182c69c53ccad9db',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/doc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'rdoc',
    'RDOC',
    'RIF Dollar On Chain',
    '0x2d919f19D4892381d58EdEbEcA66D5642ceF1A1F',
    18,
    require('assets/tokens/rifd.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'moc',
    'MOC',
    'Money On Chain',
    '0x9aC7Fe28967b30e3a4E6E03286D715B42B453d10',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/moc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'irbtc',
    'iRBTC',
    'RBTC Loan Token',
    '0xa9DcDC63eaBb8a2b6f39D7fF9429d88340044a7A',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'ixusd',
    'iXUSD',
    'XUSD Loan Token',
    '0x8F77ecf69711a4b346f23109c40416BE3dC7f129',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/xusd.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'idoc',
    'iDOC',
    'DOC Loan Token',
    '0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/doc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'ibpro',
    'iBPRO',
    'BPRO Loan Token',
    '0x6E2fb26a60dA535732F8149b25018C9c0823a715',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bpro.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    30,
    'irusdt',
    'iRUSDT',
    'RUSDT Loan Token',
    '0x849C47f9C259E9D62F289BF1b2729039698D8387',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/usdt.svg',
    '',
    AssetType.ERC20,
  ),
  // rsk tesnet
  new Asset(
    31,
    'rbtc',
    'RBTC',
    'Smart Bitcoin',
    constants.AddressZero,
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    '',
    AssetType.NATIVE,
  ),
  new Asset(
    97,
    'bnb',
    'BNB',
    'Binance Coin',
    constants.AddressZero,
    18,
    'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    '',
    AssetType.NATIVE,
  ),
  new Asset(
    31,
    'sov',
    'SOV',
    'Sovryn',
    '0x6a9A07972D07e58F0daf5122d11E069288A375fb',
    18,
    require('assets/tokens/sov.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'xusd',
    'XUSD',
    'XUSD',
    '0x74858FE37d391f81F89472e1D8BC8Ef9CF67B3b1',
    18,
    require('assets/tokens/xusd.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'wrbtc',
    'wRBTC',
    'Wrapped Smart Bitcoin',
    '0x69FE5cEC81D5eF92600c1A0dB1F11986AB3758Ab',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'bpro',
    'BRPO',
    'BRPO',
    '0x4dA7997A819bb46B6758b9102234c289Dd2ad3bf',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bpro.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'rif',
    'RIF',
    'RIF',
    '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rif.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'rusdt',
    'RUSDT',
    'RUSDT',
    '0x4D5a316D23eBE168d8f887b4447bf8DbFA4901CC',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/usdt.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'eths',
    'ETHS',
    'Ethereum on Sovryn',
    '0x0Fd0d8D78Ce9299Ee0e5676a8d51F938C234162c',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/eth.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'bnbs',
    'BNBS',
    'Binance Coin on Sovryn',
    '0x801F223Def9A4e3a543eAcCEFB79dCE981Fa2Fb5',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bnb.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'fish',
    'FISH',
    'BabelFish',
    '0xaa7038D80521351F243168FefE0352194e3f83C3',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/babelfish.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'mynt',
    'MYNT',
    'Mynt',
    '0x139483e22575826183F5b56dd242f8f2C1AEf327',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/mint.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'doc',
    'DOC',
    'Dollar On Chain',
    '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/doc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'rdoc',
    'RDOC',
    'RIF Dollar On Chain',
    '0xc3de9f38581f83e281f260d0ddbaac0e102ff9f8',
    18,
    require('assets/tokens/rifd.png'),
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'moc',
    'MOC',
    'Money On Chain',
    '0x45a97b54021a3f99827641afe1bfae574431e6ab',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/moc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'irbtc',
    'iRBTC',
    'RBTC Loan Token',
    '0xe67Fe227e0504e8e96A34C3594795756dC26e14B',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'ixusd',
    'iXUSD',
    'XUSD Loan Token',
    '0x9bD0cE087b14ef67C3D37C891139AaE7d94a961A',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/xusd.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'idoc',
    'iDOC',
    'DOC Loan Token',
    '0x74e00A8CeDdC752074aad367785bFae7034ed89f',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/doc.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'ibpro',
    'iBPRO',
    'BPRO Loan Token',
    '0x6226b4B3F29Ecb5f9EEC3eC3391488173418dD5d',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bpro.svg',
    '',
    AssetType.ERC20,
  ),
  new Asset(
    31,
    'irusdt',
    'iRUSDT',
    'RUSDT Loan Token',
    '0xd1f225BEAE98ccc51c468d1E92d0331c4f93e566',
    18,
    'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/usdt.svg',
    '',
    AssetType.ERC20,
  ),
]);

export const tokens = checkTokens([
  {
    id: 'rbtc',
    symbol: 'RBTC',
    name: 'Smart Bitcoin',
    address: {
      30: ethers.constants.AddressZero,
      31: ethers.constants.AddressZero,
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
    native: true,
  },
  {
    id: 'eth',
    symbol: 'ETH',
    name: 'Ethereum',
    address: {
      1: ethers.constants.AddressZero,
    },
    decimals: 18,
    icon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png',
    native: true,
  },
  {
    id: 'bnb',
    symbol: 'BNB',
    name: 'Binance Coin',
    address: {
      1: ethers.constants.AddressZero,
    },
    decimals: 18,
    icon: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png',
    native: true,
  },
  {
    id: 'sov',
    symbol: 'SOV',
    name: 'Sovryn',
    address: {
      1: '0xbdab72602e9ad40fc6a6852caf43258113b8f7a5',
      30: '0xEFc78fc7d48b64958315949279Ba181c2114ABBd',
      31: '0x6a9A07972D07e58F0daf5122d11E069288A375fb',
    },
    decimals: 18,
    icon: require('assets/tokens/sov.png'),
  },
  {
    id: 'esov',
    symbol: 'eSOV',
    name: 'eSovryn',
    address: {
      1: '0xbdab72602e9ad40fc6a6852caf43258113b8f7a5',
    },
    decimals: 18,
    icon: require('assets/tokens/sov.png'),
  },
  {
    id: 'xusd',
    symbol: 'XUSD',
    name: 'XUSD',
    address: {
      30: '0xb5999795BE0EbB5bAb23144AA5FD6A02D080299F',
      31: '0x74858FE37d391f81F89472e1D8BC8Ef9CF67B3b1',
    },
    decimals: 18,
    icon: require('assets/tokens/xusd.png'),
  },
  {
    id: 'wrbtc',
    symbol: 'wRBTC',
    name: 'Wrapped Smart Bitcoin',
    address: {
      30: '0x542fDA317318eBF1d3DEAf76E0b632741A7e677d',
      31: '0x69FE5cEC81D5eF92600c1A0dB1F11986AB3758Ab',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
  },
  {
    id: 'bpro',
    symbol: 'BRPO',
    name: 'BPRO',
    address: {
      30: '0x440cd83c160de5c96ddb20246815ea44c7abbca8',
      31: '0x4dA7997A819bb46B6758b9102234c289Dd2ad3bf',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bpro.svg',
  },
  {
    id: 'rif',
    symbol: 'RIF',
    name: 'RIF',
    address: {
      30: '0x2acc95758f8b5f583470ba265eb685a8f45fc9d5',
      31: '0x19f64674d8a5b4e652319f5e239efd3bc969a1fe',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rif.svg',
  },
  {
    id: 'rusdt',
    symbol: 'RUSDT',
    name: 'RUSDT',
    address: {
      30: '0xEf213441a85DF4d7acBdAe0Cf78004E1e486BB96',
      31: '0x4D5a316D23eBE168d8f887b4447bf8DbFA4901CC',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/usdt.svg',
  },
  {
    id: 'eths',
    symbol: 'ETHS',
    name: 'Bridged Ethereum',
    address: {
      30: '0x1D931Bf8656d795E50eF6D639562C5bD8Ac2B78f',
      31: '0x0Fd0d8D78Ce9299Ee0e5676a8d51F938C234162c',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/eth.svg',
  },
  {
    id: 'bnbs',
    symbol: 'BNBS',
    name: 'Bridged Binance Coin',
    address: {
      30: '0x6D9659bdF5b1A1dA217f7BbAf7dBAF8190E2e71B',
      31: '0x801F223Def9A4e3a543eAcCEFB79dCE981Fa2Fb5',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bnb.svg',
  },
  {
    id: 'fish',
    symbol: 'FISH',
    name: 'BabelFish',
    address: {
      30: '0x055A902303746382FBB7D18f6aE0df56eFDc5213',
      31: '0xaa7038D80521351F243168FefE0352194e3f83C3',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/babelfish.svg',
  },
  {
    id: 'mynt',
    symbol: 'MYNT',
    name: 'Mynt',
    address: {
      30: '0x2e6B1d146064613E8f521Eb3c6e65070af964EbB',
      31: '0x139483e22575826183F5b56dd242f8f2C1AEf327',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/mint.svg',
  },
  {
    id: 'doc',
    symbol: 'DOC',
    name: 'Dollar On Chain',
    address: {
      30: '0xe700691da7b9851f2f35f8b8182c69c53ccad9db',
      31: '0xCB46c0ddc60D18eFEB0E586C17Af6ea36452Dae0',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/doc.svg',
  },
  {
    id: 'rdoc',
    symbol: 'RDOC',
    name: 'RIF Dollar On Chain',
    address: {
      30: '0x2d919f19D4892381d58EdEbEcA66D5642ceF1A1F',
      31: '0xc3de9f38581f83e281f260d0ddbaac0e102ff9f8',
    },
    decimals: 18,
    icon: require('assets/tokens/rifd.png'),
  },
  {
    id: 'moc',
    symbol: 'MOC',
    name: 'Money On Chain',
    address: {
      30: '0x9aC7Fe28967b30e3a4E6E03286D715B42B453d10',
      31: '0x45a97b54021a3f99827641afe1bfae574431e6ab',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/moc.svg',
  },
  {
    id: 'irbtc',
    symbol: 'iRBTC',
    name: 'RBTC Loan Token',
    address: {
      30: '0xa9DcDC63eaBb8a2b6f39D7fF9429d88340044a7A',
      31: '0xe67Fe227e0504e8e96A34C3594795756dC26e14B',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/rbtc.svg',
  },
  {
    id: 'ixusd',
    symbol: 'iXUSD',
    name: 'XUSD Loan Token',
    address: {
      30: '0x8F77ecf69711a4b346f23109c40416BE3dC7f129',
      31: '0x9bD0cE087b14ef67C3D37C891139AaE7d94a961A',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/xusd.svg',
  },
  {
    id: 'idoc',
    symbol: 'iDOC',
    name: 'DOC Loan Token',
    address: {
      30: '0xd8D25f03EBbA94E15Df2eD4d6D38276B595593c1',
      31: '0x74e00A8CeDdC752074aad367785bFae7034ed89f',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/doc.svg',
  },
  {
    id: 'ibpro',
    symbol: 'iBPRO',
    name: 'BPRO Loan Token',
    address: {
      30: '0x6E2fb26a60dA535732F8149b25018C9c0823a715',
      31: '0x6226b4B3F29Ecb5f9EEC3eC3391488173418dD5d',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/bpro.svg',
  },
  {
    id: 'irusdt',
    symbol: 'iRUSDT',
    name: 'RUSDT Loan Token',
    address: {
      30: '0x849C47f9C259E9D62F289BF1b2729039698D8387',
      31: '0xd1f225BEAE98ccc51c468d1E92d0331c4f93e566',
    },
    decimals: 18,
    icon: 'https://raw.githubusercontent.com/DistributedCollective/Sovryn-frontend/development/src/assets/images/tokens/usdt.svg',
  },
]);
