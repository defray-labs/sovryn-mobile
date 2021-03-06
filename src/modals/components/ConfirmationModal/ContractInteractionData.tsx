import React from 'react';
import { Text } from 'components/Text';
import { Item } from './Item';
import { AddressBadge } from 'components/AddressBadge';
import { ChainId } from 'types/network';
import { commifyDecimals, formatUnits } from 'utils/helpers';
import { getNativeAsset } from 'utils/asset-utils';
import { TransactionModalDataProps } from 'types/tx-confirmation';

export const ContractInteractionData: React.FC<TransactionModalDataProps> = ({
  request,
}) => {
  const coin = getNativeAsset(request.chainId as ChainId);
  return (
    <>
      <Item
        title="To:"
        content={
          <>
            <AddressBadge
              address={request.to!}
              chainId={request.chainId as ChainId}
            />
          </>
        }
      />
      <Item
        title="Amount:"
        content={
          <Text>
            {commifyDecimals(formatUnits(request.value, coin.decimals))}{' '}
            {coin.symbol}
          </Text>
        }
      />
      <Item
        title="Data:"
        content={<Text>{request.data?.toString()}</Text>}
        fluidHeight
      />
    </>
  );
};
