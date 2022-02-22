import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'components/Text';
import { decodeParameters } from 'utils/contract-utils';
import { formatAndCommify } from 'utils/helpers';
import { ChainId } from 'types/network';
import { DataModalProps } from './ConfirmationModal';
import { Item } from './Item';
import { findAssetByAddress } from 'utils/asset-utils';
import { ammPools } from 'config/amm-pools';

export const AmmWithdrawV2Data: React.FC<DataModalProps> = ({ request }) => {
  const { supplyToken, amount, poolToken, minReturn } = useMemo(() => {
    // address,address,uint256,uint256
    const decoded = decodeParameters(
      ['address', 'address', 'uint256', 'uint256'],
      `0x${request.data!.toString().substring(10)}`,
    );

    const pool = ammPools.find(
      item => item.converterAddress === decoded[0].toLowerCase(),
    );

    const _poolToken = findAssetByAddress(
      request.chainId as ChainId,
      decoded[1],
    );
    const _supplyToken =
      _poolToken.id === pool?.supplyToken1.id
        ? pool.poolToken1
        : pool?.poolToken2;

    return {
      poolToken: _poolToken!,
      amount: decoded[2],
      supplyToken: _supplyToken!,
      minReturn: decoded[3],
    };
  }, [request]);

  return (
    <View>
      <Item
        title="Send:"
        content={
          <Text>
            {formatAndCommify(amount, supplyToken.decimals)}{' '}
            {supplyToken.symbol}
          </Text>
        }
      />
      <Item
        title="Receive (minimum):"
        content={
          <Text>
            {formatAndCommify(minReturn, poolToken.decimals)} {poolToken.symbol}
          </Text>
        }
      />
    </View>
  );
};
