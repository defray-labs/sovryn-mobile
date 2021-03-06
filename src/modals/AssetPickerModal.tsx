import React, {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { AssetLogo } from 'components/AssetLogo';
import { InputField } from 'components/InputField';
import { formatAndCommify } from 'utils/helpers';
import { Asset } from 'models/asset';
import { useAssetBalance } from 'hooks/useAssetBalance';
import { useWalletAddress } from 'hooks/useWalletAddress';
import { useAssetUsdBalance } from 'hooks/useAssetUsdBalance';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ModalStackRoutes } from 'routers/modal.routes';
import { PressableButton } from 'components/PressableButton';
import { Text } from 'components/Text';
import { SafeAreaPage } from 'templates/SafeAreaPage';

type Props = NativeStackScreenProps<ModalStackRoutes, 'modal.asset-picker'>;

export const AssetPickerModal: React.FC<Props> = React.memo(
  ({ navigation, route }) => {
    const {
      title = 'Select Asset',
      value,
      items,
      parentRoute,
      pickerKey,
    } = route.params;

    useLayoutEffect(() => {
      navigation.setOptions({
        title,
      });
    }, [navigation, title]);

    const [_value, setValue] = useState<Asset | undefined>(value);
    const [search, setSearch] = useState('');

    const triggerClose = useCallback(() => {
      navigation.goBack();
    }, [navigation]);

    const onSelectItem = useCallback(
      (item: Asset) => {
        setValue(item);
        if (parentRoute) {
          navigation.navigate<any>({
            name: parentRoute,
            params: { [pickerKey]: item },
            merge: true,
          });
        } else {
          triggerClose();
        }
      },
      [navigation, parentRoute, pickerKey, triggerClose],
    );

    useEffect(() => {
      setValue(value);
    }, [value]);

    const tokens = useMemo(() => items.filter(item => !!item), [items]);

    const filteredItems = useMemo(() => {
      if (search) {
        return tokens.filter(
          item =>
            item.symbol.toLowerCase().includes(search.toLowerCase()) ||
            item.name.toLowerCase().includes(search.toLowerCase()),
        );
      }
      return tokens;
    }, [search, tokens]);

    return (
      <SafeAreaPage>
        <View style={styles.modalBody}>
          <View style={styles.searchInput}>
            <InputField
              value={search}
              onChangeText={setSearch}
              placeholder="Search for asset..."
            />
          </View>

          <ScrollView>
            {filteredItems.map(item => (
              <Item
                key={item.id}
                token={item}
                active={
                  item.id === _value?.id && item.chainId === _value?.chainId
                }
                onSelect={onSelectItem}
              />
            ))}
          </ScrollView>
          <PressableButton onPress={triggerClose} title="Close" />
        </View>
      </SafeAreaPage>
    );
  },
);

type ItemProps = {
  token: Asset;
  active: boolean;
  onSelect: (asset: Asset) => void;
};

const Item: React.FC<ItemProps> = ({ token, active, onSelect }) => {
  const { weiValue } = useAssetBalance(token, useWalletAddress());
  const { weiValue: usdBalance, token: usdToken } = useAssetUsdBalance(
    token,
    weiValue,
  );
  return (
    <Pressable
      onPress={() => onSelect(token)}
      style={[styles.modalItem, active && styles.modalItemActive]}>
      <View style={styles.modalItemLeftSide}>
        <View style={styles.modalItemLogoContainer}>
          <AssetLogo source={token.icon} size={32} />
        </View>
        <View>
          <Text style={styles.tokenSymbolText}>{token.symbol}</Text>
          <Text style={styles.tokenNameText}>{token.name}</Text>
        </View>
      </View>
      <View>
        <Text style={styles.balanceText}>
          {formatAndCommify(weiValue, token.decimals)}
        </Text>
        {usdBalance !== null && (
          <Text style={styles.balanceText}>
            ${formatAndCommify(usdBalance, usdToken.decimals, 2)}
          </Text>
        )}
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    marginTop: 16,
    width: '100%',
  },
  labelContainer: {
    marginBottom: 6,
  },
  label: {
    textAlign: 'left',
  },
  inputContainer: {
    width: '100%',
    borderColor: 'gray',
    borderWidth: 1,
    paddingVertical: 6,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  inputReadOnly: {
    opacity: 0.5,
  },
  inputDark: {
    color: 'white',
  },
  modal: {
    backgroundColor: DefaultTheme.colors.card,
    flex: 1,
  },
  modalDark: {
    backgroundColor: DarkTheme.colors.card,
  },
  modalBody: {
    flex: 1,
    padding: 12,
  },
  modalItem: {
    marginBottom: 6,
    padding: 8,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemActive: {
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
  },
  modalItemLeftSide: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalItemLogoContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: DefaultTheme.colors.card,
    width: 36,
    height: 36,
    marginRight: 8,
    borderRadius: 18,
  },
  tokenSymbolText: {
    color: 'white',
    marginBottom: 2,
  },
  tokenNameText: {
    color: 'gray',
  },
  balanceText: {
    color: 'gray',
    textAlign: 'right',
    fontSize: 12,
  },
  searchInput: {
    marginBottom: 12,
  },
});
