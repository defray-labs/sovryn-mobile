import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { useVestedAssets, VestingData } from 'hooks/useVestedAssets';
import { VestedAssetRow } from './components/VestedAssets/VestedAssetRow';
import { SafeAreaPage } from 'templates/SafeAreaPage';
import { Text } from 'components/Text';
import { NavGroup } from 'components/NavGroup/NavGroup';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { WalletStackProps } from 'pages/MainScreen/WalletPage';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { VestingConfig } from 'models/vesting-config';
import { TokenId } from 'types/token';
import { AssetLogo } from 'components/AssetLogo';
import { BigNumber } from 'ethers';
import { commifyDecimals, formatUnits } from 'utils/helpers';
import { WithdrawVestingModal } from './components/VestedAssets/WithdrawVestingModal';

type Props = NativeStackScreenProps<WalletStackProps, 'wallet.receive'>;

export const WalletVestings: React.FC<Props> = ({ route: { params } }) => {
  const owner = useWalletAddress();
  const config = VestingConfig.get(params.token.id as TokenId, params.chainId);
  const { vestings, balances } = useVestedAssets(config, owner);
  const total = balances
    .reduce((p, c) => p.add(c), BigNumber.from('0'))
    .toString();

  const [selected, setSelected] = useState<VestingData>();

  const handleWithdrawClick = useCallback(
    (vestingData: VestingData) => () => setSelected(vestingData),
    [],
  );

  return (
    <SafeAreaPage>
      <ScrollView style={styles.container}>
        <View style={styles.detailsContainer}>
          <AssetLogo source={config.token.icon} size={64} style={styles.logo} />
          <Text style={styles.balance}>
            {commifyDecimals(formatUnits(total, config.token.decimals))}{' '}
            {config.token.symbol}
          </Text>
        </View>
        <ScrollView>
          <NavGroup>
            {vestings.map((item, index) => (
              <VestedAssetRow
                key={item.vestingAddress}
                vestingConfig={config}
                vestingData={item}
                balance={balances[index]}
                onWithdraw={handleWithdrawClick(item)}
              />
            ))}
          </NavGroup>
        </ScrollView>
      </ScrollView>
      {selected && (
        <WithdrawVestingModal
          config={config}
          data={selected}
          onClose={() => setSelected(undefined)}
        />
      )}
    </SafeAreaPage>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flexGrow: 1,
  },
  container: {
    padding: 20,
  },
  detailsContainer: {
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 16,
  },
  balance: {
    fontWeight: 'bold',
    fontSize: 24,
    marginBottom: 8,
  },
  address: {
    marginBottom: 12,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
