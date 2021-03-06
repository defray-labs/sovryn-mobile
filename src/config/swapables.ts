import { ChainId } from 'types/network';
import { TokenId } from 'types/asset';
import { Asset } from 'models/asset';
import { findAsset } from 'utils/asset-utils';
import { wrappedAssets } from './wrapped-assets';

// todo: move these to utils

export const getSwappableToken = (
  tokenId: TokenId,
  chainId: ChainId,
): TokenId => {
  if (
    wrappedAssets.hasOwnProperty(chainId) &&
    wrappedAssets[chainId]?.[0] === tokenId
  ) {
    return wrappedAssets[chainId]![1];
  }
  return tokenId;
};

export const unwrapSwappableToken = (
  tokenId: TokenId,
  chainId: ChainId,
): TokenId => {
  if (
    wrappedAssets.hasOwnProperty(chainId) &&
    wrappedAssets[chainId]?.[1] === tokenId
  ) {
    return wrappedAssets[chainId]![0];
  }
  return tokenId;
};

export const getSwappableAsset = (token: Asset, chainId: ChainId): Asset => {
  if (
    wrappedAssets.hasOwnProperty(chainId) &&
    wrappedAssets[chainId]?.[0] === token.id
  ) {
    return findAsset(chainId, wrappedAssets[chainId]![1]);
  }
  return token;
};

export const unwrapSwappableAsset = (token: Asset, chainId: ChainId): Asset => {
  if (
    wrappedAssets.hasOwnProperty(chainId) &&
    wrappedAssets[chainId]?.[1] === token.id
  ) {
    return findAsset(chainId, wrappedAssets[chainId]![0]);
  }
  return token;
};
