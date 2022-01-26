import React, { useMemo } from 'react';
import { View } from 'react-native';
import { Text } from 'components/Text';
import { decodeParameters } from 'utils/contract-utils';
import { tokenUtils } from 'utils/token-utils';
import { commifyDecimals, formatUnits } from 'utils/helpers';
import { ChainId } from 'types/network';
import { DataModalProps } from './ConfirmationModal';
import { AddressBadge } from 'components/AddressBadge';
import { Item } from './Item';
import { Description } from './Description';

export const ApproveTokenData: React.FC<DataModalProps> = ({ request }) => {
  const [spender, amount] = useMemo(() => {
    return decodeParameters(
      ['address', 'uint256'],
      `0x${request.data!.toString().substring(10)}`,
    );
  }, [request.data]);

  const token = tokenUtils.getTokenByAddress(
    request.to!,
    request.chainId! as ChainId,
  );

  const description = useMemo(() => {
    return (
      request?.customData?.approvalReason ||
      `To continue, you need to allow Sovryn smart contract to use your ${
        token.symbol || 'token'
      }.`
    );
  }, [request.customData, token.symbol]);

  return (
    <>
      <Description text={description} />
      <Item
        title="Token:"
        content={
          <>
            <Text>{token.symbol}</Text>
            <AddressBadge
              address={request.to!}
              chainId={request.chainId as ChainId}
            />
          </>
        }
      />
      <Item
        title="Spender:"
        content={
          <AddressBadge
            address={spender}
            chainId={request.chainId as ChainId}
          />
        }
      />
      <Item
        title={`Amount ${token.symbol}:`}
        content={
          <Text>
            {commifyDecimals(formatUnits(amount, token.decimals))}{' '}
            {token.symbol}
          </Text>
        }
      />
    </>
  );
};