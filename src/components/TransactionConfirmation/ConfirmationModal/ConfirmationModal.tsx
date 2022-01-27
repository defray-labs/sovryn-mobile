import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { BottomModal, ModalContent } from 'react-native-modals';
import {
  TransactionRequest,
  TransactionResponse,
} from '@ethersproject/abstract-provider';
import { StyleSheet, View } from 'react-native';
import { Text } from 'components/Text';
import { DarkTheme, DefaultTheme } from '@react-navigation/native';
import { useIsDarkTheme } from 'hooks/useIsDarkTheme';
import { functionSignature } from 'utils/contract-utils';
import { hexlify, TransactionTypes } from 'ethers/lib/utils';
import { TransactionType } from './transaction-types';
import { tokenUtils } from 'utils/token-utils';
import { commifyDecimals, currentChainId, formatUnits } from 'utils/helpers';
import { ChainId } from 'types/network';
import { SendCoinData } from './SendCoinData';
import { ContractInteractionData } from './ContractInteractionData';
import { TransferTokenData } from './TransferTokenData';
import { ApproveTokenData } from './ApproveTokenData';
import { Button, ButtonIntent } from 'components/Buttons/Button';
import { getProvider } from 'utils/RpcEngine';
import { wallet } from 'utils/wallet';
import { useDebouncedEffect } from 'hooks/useDebounceEffect';
import { Item } from './Item';
import { BigNumber } from 'ethers';
import { ErrorHolder } from './ErrorHolder';
import { isEqual } from 'lodash';

export type DataModalProps = {
  loading: boolean;
  request: TransactionRequest;
  onEditRequested: () => void;
  onLoaderFunction: (value: Promise<any>) => void;
};

type ConfirmationModalProps = {
  visible: boolean;
  loading: boolean;
  request?: TransactionRequest;
  error?: any;
  onConfirm: () => void;
  onReject: () => void;
  onRequestUpdated: (request: TransactionRequest) => void;
};

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  visible,
  request,
  onReject,
  onConfirm,
  onRequestUpdated,
  loading: transactionLoading,
  error,
}) => {
  const dark = useIsDarkTheme();
  const [dataLoading, setDataLoading] = useState(true);
  const [estimatedGasLimit, setEstimatedGasLimit] = useState(0);
  const [estimatedGasPrice, setEstimatedGasPrice] = useState(0);
  const [estimatedNonce, setEstimatedNonce] = useState(0);

  const loading = useMemo(
    () => transactionLoading || dataLoading,
    [transactionLoading, dataLoading],
  );

  const signature = useMemo(
    () => request?.data?.toString().substring(0, 10) || '0x',
    [request?.data],
  );

  const type = useMemo(() => {
    const _signature = (request?.customData?.type ||
      signature) as TransactionType;
    return Object.values(TransactionType).includes(_signature)
      ? _signature
      : TransactionType.UNKNOWN;
  }, [request?.customData?.type, signature]);

  const renderTitle = useMemo(() => {
    switch (type) {
      default:
        return 'Contract Interaction';
      case TransactionType.SEND_COIN:
        return `Send ${
          tokenUtils.getNativeToken(
            (request?.chainId || currentChainId()) as ChainId,
          )?.symbol || 'Coin'
        }
          `;
      case TransactionType.APPROVE_TOKEN:
        return `Approve ${
          tokenUtils.getTokenByAddress(
            request?.to!,
            request?.chainId as ChainId,
          )?.symbol || 'Token'
        }`;
      case TransactionType.TRANSFER_TOKEN:
        return `Transfer ${
          tokenUtils.getTokenByAddress(
            request?.to!,
            request?.chainId as ChainId,
          )?.symbol || 'Token'
        }`;
    }
  }, [type, request]);

  const RenderContent = useMemo(() => {
    switch (type) {
      default:
        return ContractInteractionData;
      case TransactionType.SEND_COIN:
        return SendCoinData;
      case TransactionType.APPROVE_TOKEN:
        return ApproveTokenData;
      case TransactionType.TRANSFER_TOKEN:
        return TransferTokenData;
    }
  }, [type]);

  const renderButtonTitle = useMemo(() => {
    switch (type) {
      default:
        return 'Confirm';
      case TransactionType.APPROVE_TOKEN:
        return 'Approve';
    }
  }, [type]);

  const onLoaderFunctionReceiver = useCallback((promise: Promise<any>) => {
    console.log('job received', promise);
  }, []);

  const [simulatorError, setSimulatorError] = useState<string>();

  useEffect(() => {
    getProvider(request?.chainId as ChainId)
      .getGasPrice()
      .then(response => response.toNumber())
      .then(setEstimatedGasPrice)
      .catch(console.warn);

    getProvider(request?.chainId as ChainId)
      .getTransactionCount(wallet.address?.toLowerCase()!)
      .then(setEstimatedNonce)
      .catch(console.warn);
  }, [request?.chainId]);

  const handleData = useCallback(async () => {
    setDataLoading(true);
    setSimulatorError(undefined);
    if (!request?.from) {
      request!.from = wallet.address?.toLowerCase();
    }

    await getProvider(request?.chainId as ChainId)
      .estimateGas(request!)
      .then(response => response.toNumber())
      .then(setEstimatedGasLimit)
      .catch(console.warn);

    await getProvider(request?.chainId as ChainId)
      .call(request!)
      .catch(err => {
        if (err.error?.body) {
          try {
            const body = JSON.parse(err.error?.body);
            setSimulatorError(body?.error?.message);
          } catch (_) {
            setSimulatorError('Transaction is likely to fail.');
          }
        } else {
          setSimulatorError('Transaction is likely to fail.');
        }
      });

    setDataLoading(false);
  }, [request]);

  useDebouncedEffect(
    () => {
      const temp = { ...request };

      if (!request?.gasLimit && estimatedGasLimit) {
        temp.gasLimit = Number(estimatedGasLimit);
      }

      if (!request?.gasPrice && estimatedGasPrice) {
        temp.gasPrice = Number(estimatedGasPrice);
      }

      if (!request?.nonce && estimatedNonce) {
        temp.nonce = Number(estimatedNonce);
      }

      if (!isEqual(temp, request) && onRequestUpdated) {
        onRequestUpdated(temp);
      }
    },
    300,
    [
      request?.gasLimit,
      request?.gasPrice,
      estimatedGasLimit,
      estimatedGasPrice,
    ],
  );

  useDebouncedEffect(
    () => {
      console.log('handle data');
      handleData();
    },
    300,
    [handleData],
  );

  const gasFee = useMemo(() => {
    return BigNumber.from(request?.gasLimit || estimatedGasLimit || '0')
      .mul(request?.gasPrice || estimatedGasPrice || '0')
      .toString();
  }, [
    request?.gasPrice,
    request?.gasLimit,
    estimatedGasLimit,
    estimatedGasPrice,
  ]);

  const coin = tokenUtils.getNativeToken(request?.chainId as ChainId);

  const errorMessage = useMemo(() => {
    if (error) {
      return error;
    }
    if (simulatorError) {
      return simulatorError;
    }
    return undefined;
  }, [error, simulatorError]);

  return (
    <BottomModal visible={visible} onSwipeOut={onReject}>
      <ModalContent style={[styles.modal, dark && styles.modalDark]}>
        <View style={styles.title}>
          <Text style={styles.titleText}>{renderTitle}</Text>
        </View>
        <View style={[styles.modalView, dark && styles.modalViewDark]}>
          <RenderContent
            loading={loading}
            request={request!}
            onEditRequested={() => {}}
            onLoaderFunction={onLoaderFunctionReceiver}
          />

          <Item
            title="Transaction fee:"
            content={
              <Text>
                {commifyDecimals(formatUnits(gasFee, coin.decimals), 8)}{' '}
                {coin.symbol}
              </Text>
            }
            hideBorder
          />

          {errorMessage && <ErrorHolder text={errorMessage} />}

          <View style={[styles.footer, dark && styles.footerDark]}>
            <Button
              title={renderButtonTitle}
              onPress={onConfirm}
              intent={ButtonIntent.PRIMARY}
              loading={loading}
              disabled={loading}
            />
            <Button title="Cancel" onPress={onReject} />
          </View>
        </View>
      </ModalContent>
    </BottomModal>
  );
};

const styles = StyleSheet.create({
  modal: {
    backgroundColor: DefaultTheme.colors.card,
  },
  modalDark: {
    backgroundColor: DarkTheme.colors.card,
  },
  title: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  modalView: {
    width: '100%',
  },
  modalViewDark: {
    // backgroundColor: DarkTheme.colors.card,
  },

  footer: {
    width: '100%',
    marginTop: 36,
  },
  footerDark: {},
});
