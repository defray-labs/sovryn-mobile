import React, { useCallback, useMemo } from 'react';
import { BigNumber } from 'ethers';
import { utils } from 'ethers/lib.esm';
import { useVestedAssets } from 'hooks/useVestedAssets';
import { TokenId } from 'types/asset';
import { commifyDecimals } from 'utils/helpers';
import { ChainId } from 'types/network';
import { VestingConfig } from 'models/vesting-config';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { NavGroup } from 'components/NavGroup/NavGroup';
import { NavItem } from 'components/NavGroup/NavItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { WalletStackProps } from 'pages/MainScreen/WalletPage';
import { GestureResponderEvent } from 'react-native';

type VestedAssetsProps = {
  tokenId: TokenId;
  chainId: ChainId;
  onPress: (event: GestureResponderEvent) => void;
};

export const VestedAssets: React.FC<VestedAssetsProps> = ({
  tokenId,
  chainId,
  onPress,
}) => {
  const config = useMemo(
    () => VestingConfig.get(tokenId, chainId),
    [tokenId, chainId],
  );
  return config ? <VestedToken vesting={config} onPress={onPress} /> : null;
};

type VestedTokenProps = {
  vesting: VestingConfig;
  onPress: (event: GestureResponderEvent) => void;
};

export const VestedToken: React.FC<VestedTokenProps> = ({
  vesting,
  onPress,
}) => {
  const { navigate } = useNavigation<NavigationProp<WalletStackProps>>();
  const owner = useWalletAddress();
  const { balances, vestings, loading } = useVestedAssets(vesting, owner);

  const balance = useMemo(
    () =>
      utils.formatUnits(
        balances.reduce((p, c) => p.add(c), BigNumber.from(0)),
        vesting.token.decimals,
      ),
    [balances, vesting.token],
  );

  const handlePress = useCallback(
    (event: GestureResponderEvent) => {
      navigate('wallet.vestings', {
        token: vesting.token,
        chainId: vesting.chainId,
      });
      if (onPress) {
        onPress(event);
      }
    },
    [navigate, onPress, vesting.chainId, vesting.token],
  );

  return (
    <NavGroup>
      <NavItem
        title={`Vested ${vesting.token.symbol}`}
        value={
          loading && !vestings.length
            ? 'Loading, please wait...'
            : `${commifyDecimals(balance)} ${vesting.token.symbol}`
        }
        onPress={handlePress}
      />
    </NavGroup>
  );
};
