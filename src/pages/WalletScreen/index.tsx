import React, { useContext, useMemo, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaPage } from 'templates/SafeAreaPage';
import { AccountBanner } from 'components/AccountBanner';
import { globalStyles } from 'global.styles';
import { useCurrentAccount } from 'hooks/useCurrentAccount';
import { AppContext } from 'context/AppContext';
import { listAssetsForChains } from 'utils/asset-utils';
import { AssetItem } from './components/AssetItem';
import { NavGroup } from 'components/NavGroup/NavGroup';
import { Asset } from 'models/asset';
import { AssetModal } from './components/AssetModal';
import { PendingTransactions } from 'components/TransactionHistory/PendingTransactions';

export const WalletScreen: React.FC = () => {
  const { chainIds } = useContext(AppContext);

  const tokens = useMemo(() => listAssetsForChains(chainIds), [chainIds]);

  const nativeTokens = useMemo(
    () => tokens.filter(item => item.native),
    [tokens],
  );

  const erc20Tokens = useMemo(
    () => tokens.filter(item => item.erc20),
    [tokens],
  );

  const account = useCurrentAccount();

  const [asset, setAsset] = useState<Asset>();

  return (
    <SafeAreaPage>
      <ScrollView>
        {account && (
          <View style={globalStyles.page}>
            <AccountBanner account={account} showActions />
          </View>
        )}
        <View style={styles.balanceContainer}>
          <PendingTransactions marginTop={-24} />

          <NavGroup>
            {nativeTokens.map(item => (
              <AssetItem
                key={item.id}
                asset={item}
                onPress={() => setAsset(item)}
              />
            ))}
          </NavGroup>
          <NavGroup>
            {erc20Tokens.map(item => (
              <AssetItem
                key={item.id}
                asset={item}
                onPress={() => setAsset(item)}
              />
            ))}
          </NavGroup>
        </View>
      </ScrollView>
      <AssetModal asset={asset!} onClose={() => setAsset(undefined)} />
    </SafeAreaPage>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  balanceContainer: {
    paddingHorizontal: 5,
    marginHorizontal: 10,
    marginBottom: 25,
  },
});
