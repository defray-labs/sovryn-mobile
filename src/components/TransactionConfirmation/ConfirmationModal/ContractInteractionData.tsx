import React from 'react';
import { Text } from 'components/Text';
import { DataModalProps } from './ConfirmationModal';
import { Item } from './Item';
import { AddressBadge } from 'components/AddressBadge';
import { ChainId } from 'types/network';
import { tokenUtils } from 'utils/token-utils';
import { commifyDecimals, formatUnits } from 'utils/helpers';

export const ContractInteractionData: React.FC<DataModalProps> = ({
  request,
}) => {
  const coin = tokenUtils.getNativeToken(request.chainId as ChainId);
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
