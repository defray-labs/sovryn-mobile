import React, { useCallback, useEffect, useState } from 'react';
import {
  AmountFieldBase,
  AmountFieldBaseProps,
} from 'components/AmountFieldBase';
import { Pressable, StyleSheet, View } from 'react-native';
import { commifyDecimals, currentChainId, px } from 'utils/helpers';
import { Text } from 'components/Text';
import { Token, TokenId } from 'types/token';
import { TokenPickerButton } from './TokenPickerButton';
import { AssetPickerModal } from 'components/AssetPickerModal';
import { useDebouncedEffect } from 'hooks/useDebounceEffect';
import { tokenUtils } from 'utils/token-utils';
import { ChainId } from 'types/network';

type SwapAmountFieldProps = {
  token: Token;
  onTokenChanged: (tokenId: TokenId) => void;
  price?: string;
  difference?: number;
  chainId?: ChainId;
  balance?: string;
  tokens: TokenId[];
} & AmountFieldBaseProps;

export const SwapAmountField: React.FC<SwapAmountFieldProps> = ({
  amount,
  onAmountChanged,
  token,
  onTokenChanged,
  price,
  difference,
  balance,
  chainId = currentChainId(),
  tokens: items,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [_token, setToken] = useState<Token | undefined>(token);

  const handleBalancePress = useCallback(
    () => onAmountChanged(balance || '0'),
    [onAmountChanged, balance],
  );

  const editable =
    props?.inputProps?.editable === undefined ||
    props?.inputProps?.editable === true;

  useDebouncedEffect(
    () => {
      onTokenChanged(_token?.id as TokenId);
    },
    300,
    [_token, onTokenChanged],
  );

  // token was changed from outside
  useEffect(() => {
    setToken(token);
  }, [token]);

  const onTokenChange = useCallback(
    (tokenId: TokenId) => setToken(tokenUtils.getTokenById(tokenId)),
    [],
  );

  return (
    <>
      <AmountFieldBase
        {...props}
        amount={amount}
        onAmountChanged={onAmountChanged}
        rightElement={
          <TokenPickerButton
            token={token}
            onPress={() => setOpen(prev => !prev)}
          />
        }
        bottomElement={
          <View style={styles.footerContainer}>
            <View style={styles.priceView}>
              {price !== undefined && (
                <>
                  <Text style={styles.priceText}>
                    ${commifyDecimals(price, 2)}
                  </Text>
                  {difference !== undefined && !isNaN(difference) && (
                    <Text style={styles.differenceText}>
                      ({commifyDecimals(difference, 2)}%)
                    </Text>
                  )}
                </>
              )}
            </View>
            <Pressable
              onPress={handleBalancePress}
              disabled={!editable}
              style={styles.balancePressable}>
              <Text style={styles.balanceText}>
                Balance: {commifyDecimals(balance)}
              </Text>
            </Pressable>
          </View>
        }
      />
      <AssetPickerModal
        open={open}
        value={_token?.id as TokenId}
        items={items}
        onChange={onTokenChange}
        onClose={() => setOpen(false)}
      />
    </>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  balancePressable: {
    marginLeft: 12,
  },
  balanceText: {
    opacity: 0.7,
    fontSize: px(12),
  },
  priceView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  differenceText: {
    marginLeft: 4,
    fontSize: px(12),
  },
  priceText: {
    fontSize: px(12),
  },
});
