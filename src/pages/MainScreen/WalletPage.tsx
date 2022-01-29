import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Token } from 'types/token';
import { WalletScreen } from 'pages/WalletScreen';
import { WalletDetails } from 'pages/WalletScreen/WalletDetails';
import { WalletVestings } from 'pages/WalletScreen/WalletVestings';
import { ReceiveAsset } from 'pages/WalletScreen/ReceiveAsset';
import { SendAsset } from 'pages/WalletScreen/SendAsset';
import { ChainId } from 'types/network';

export type WalletStackProps = {
  'wallet.list': undefined;
  'wallet.details': { token: Token; chainId: ChainId };
  'wallet.vestings': { token: Token; chainId: ChainId };
  'wallet.receive': { token: Token; chainId: ChainId };
  'wallet.send': { token: Token; chainId: ChainId };
};

const Stack = createNativeStackNavigator<WalletStackProps>();

export const WalletPage: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="wallet.list"
        component={WalletScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="wallet.details" component={WalletDetails} />
      <Stack.Screen
        name="wallet.vestings"
        component={WalletVestings}
        options={{ title: 'Vestings' }}
      />
      <Stack.Screen name="wallet.receive" component={ReceiveAsset} />
      <Stack.Screen name="wallet.send" component={SendAsset} />
    </Stack.Navigator>
  );
};
