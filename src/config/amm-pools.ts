import { AmmPool } from 'models/amm-pool';

export const ammPools: AmmPool[] = [
  // mainnet
  new AmmPool(
    30,
    1,
    'rbtc',
    'sov',
    '0xe76Ea314b32fCf641C6c57f14110c5Baa1e45ff4',
    'wrbtc/sov',
  ).setUsesLm(true),
  new AmmPool(
    30,
    1,
    'rbtc',
    'xusd',
    '0xa9c3d9681215ef7623dc28ea6b75bf87fdf285d9',
    'wrbtc/xusd',
  ).setUsesLm(true),
  new AmmPool(
    30,
    1,
    'rbtc',
    'fish',
    '0xdeb0894196863dbb2f2d4c683f6d33a2197056b5',
    'wrbtc/fish',
  ),
  new AmmPool(
    30,
    2,
    'rbtc',
    'rusdt',
    '0x448c2474b255576554EeD36c24430ccFac131cE3',
    'wrbtc/rusdt1',
    'wrbtc/rusdt2',
  ),
  new AmmPool(
    30,
    1,
    'rbtc',
    'bnbs',
    '0x1684b871ec5f93de142e79a670b541d75be07ead',
    'wrbtc/bnbs',
  ).setUsesLm(true),
  new AmmPool(
    30,
    1,
    'rbtc',
    'eths',
    '0xa57ec11497f45fe86eca50f4f1c9e75c8016a1af',
    'wrbtc/eths',
  ).setUsesLm(true),
  new AmmPool(
    30,
    1,
    'rbtc',
    'moc',
    '0xe321442DC4793c17F41Fe3fB192a856A4864cEAF',
    'wrbtc/moc',
  ),
  new AmmPool(
    30,
    2,
    'rbtc',
    'doc',
    '0xd715192612F03D20BaE53a5054aF530C9Bb0fA3f',
    'wrbtc/doc1',
    'wrbtc/doc2',
  ),
  new AmmPool(
    30,
    2,
    'rbtc',
    'bpro',
    '0x26463990196B74aD5644865E4d4567E4A411e065',
    'wrbtc/bpro1',
    'wrbtc/bpro2',
  ),
  new AmmPool(
    30,
    1,
    'rbtc',
    'rif',
    '0x65528e06371635a338ca804cd65958a11cb11009',
    'wrbtc/rif',
  ),
  new AmmPool(
    30,
    1,
    'rbtc',
    'mynt',
    '0x3a18e61d9c9f1546dea013478dd653c793098f17',
    'wrbtc/mynt',
  ).setUsesLm(true),
  // testnet
  new AmmPool(
    31,
    1,
    'trbtc',
    'tsov',
    '0xc2d05263318e2304fc7cdad40eea6a091b310080',
    'twrbtc/sov',
  ).setUsesLm(true),
  new AmmPool(
    31,
    1,
    'trbtc',
    'txusd',
    '0xe5e750ead0e564e489b0776273e4a10f3f3d4028',
    'twrbtc/xusd',
  ).setUsesLm(true),
  new AmmPool(
    31,
    1,
    'trbtc',
    'tfish',
    '0x4265d4f55219a4BDe9f1DE1348dA1f0b504849b4',
    'twrbtc/fish',
  ),
  new AmmPool(
    31,
    2,
    'trbtc',
    'trusdt',
    '0x133eBE9c8bA524C9B1B601E794dF527f390729bF',
    'twrbtc/rusdt1',
    'twrbtc/rusdt2',
  ),
  new AmmPool(
    31,
    1,
    'trbtc',
    'tbnbs',
    '0xA8D7FDd2f67273F178EFe731d4becd38E2A94E11',
    'twrbtc/bnbs',
  ).setUsesLm(true),
  new AmmPool(
    31,
    1,
    'trbtc',
    'teths',
    '0x9f570ffe6c421e2c7611aaea14770b807e9fb424',
    'twrbtc/eths',
  ).setUsesLm(true),
  new AmmPool(
    31,
    1,
    'trbtc',
    'tmoc',
    '0x2cb88F02cCA4dddBE8C41a6920853838Ada09F8b',
    'twrbtc/moc',
  ),
  new AmmPool(
    31,
    2,
    'trbtc',
    'tdoc',
    '0x497b0517dd24f66c456e93bc0adbb2a2bf159ec4',
    'twrbtc/doc1',
    'twrbtc/doc2',
  ),
  new AmmPool(
    31,
    2,
    'trbtc',
    'tbpro',
    '0xe4E467D8B5f61b5C83048d857210678eB86730A4',
    'twrbtc/bpro1',
    'twrbtc/bpro2',
  ),
  new AmmPool(
    31,
    1,
    'trbtc',
    'trif',
    '0xA82881bceb367f8653559937A6eFBFffBF2E06DD',
    'twrbtc/rif',
  ),
  new AmmPool(
    31,
    1,
    'trbtc',
    'tmynt',
    '0x84953dAF0E7a9fFb8B4fDf7F948185e1cF85852e',
    'twrbtc/mynt',
  ).setUsesLm(true),
];
