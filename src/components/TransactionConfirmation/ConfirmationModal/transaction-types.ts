// Enum of contract function signatures our dialogs should support
// https://www.4byte.directory/signatures/

// values can be generated with functionSignature('approve(address,uint256)')

export enum TransactionType {
  SEND_COIN = '0x', // empty tx data
  APPROVE_TOKEN = '0x095ea7b3', // approve(address,uint256)
  TRANSFER_TOKEN = '0xa9059cbb', // transfer(address,uint256)
  VESTING_WITHDRAW_TOKENS = '0x49df728c', // withdrawTokens(address)
  WRBTC_PROXY_SWAP = '0xb37a4831', // convertByPath(address[],uint256,uint256)
  SWAP_NETWORK_SWAP = '0xb77d239b', // convertByPath(address[],uint256,uint256,address,address,uint256)
  UNKNOWN = 'unknown',
}
