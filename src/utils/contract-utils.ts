import type { ParamType } from '@ethersproject/abi/src.ts/fragments';
import type { BytesLike } from '@ethersproject/bytes';
import type { TransactionRequest } from '@ethersproject/abstract-provider';
import type { Deferrable } from '@ethersproject/properties';
import {
  isHexString,
  id as keccak256,
  defaultAbiCoder,
  hexConcat,
  Result,
} from 'ethers/lib/utils';
import { getProvider } from 'utils/RpcEngine';
import { getNetworks } from './network-utils';
import { getContractAddress } from './helpers';
import { ContractName } from 'types/contract';
import { ChainId, Network } from 'types/network';
import Logger from './Logger';

const INSIDE_EVERY_PARENTHESES = /\((?:[^()]|\([^()]*\))*\)/g;

export const functionSignature = (method: string) =>
  keccak256(method).substring(0, 10);

export const encodeParameters = (
  types: ReadonlyArray<string | ParamType>,
  values: ReadonlyArray<any>,
) => defaultAbiCoder.encode(types, values);
export const decodeParameters = (
  types: ReadonlyArray<string | ParamType>,
  data: BytesLike,
) => defaultAbiCoder.decode(types, data, true);

export const encodeParameter = (type: string, value: any) =>
  encodeParameters([type], [value]);
export const decodeParameter = (type: string, data: string) =>
  decodeParameters([type], data);

const getParameters = (types: string[]) => {
  const hasTuple = types.indexOf('[]');
  if (hasTuple !== -1) {
    types[hasTuple - 1] = types[hasTuple - 1] + '[]';
    delete types[hasTuple];
  }
  return types.filter(e => !!e);
};

export const prepareFunction = (method: string) => {
  const [input, output] = (method.match(INSIDE_EVERY_PARENTHESES) || []).map(
    item => item.slice(1, -1),
  );
  const inputTypes = getParameters(input.match(/(\(.*?\)|[^),\s]+)/g) || []);
  const outputTypes = output
    ? getParameters(output.match(/(\(.*?\)|[^),\s]+)/g) || [])
    : [];
  return {
    method: method.split('(')[0] + '(' + input + ')',
    types: inputTypes,
    // args,
    returnTypes: outputTypes,
  };
};

export const encodeFunctionData = (
  method: string,
  values: ReadonlyArray<any>,
) => {
  const { method: fn, types } = prepareFunction(method);
  return hexConcat([functionSignature(fn), encodeParameters(types, values)]);
};

export const encodeFunctionDataWithTypes = (
  method: string,
  types: ReadonlyArray<string | ParamType>,
  values: ReadonlyArray<any>,
) => hexConcat([functionSignature(method), encodeParameters(types, values)]);

export const prefixHex = (value: string) =>
  isHexString(value) ? value : `0x${value}`;

export async function callToContract<T = Record<string | number, any>>(
  chainId: ChainId,
  contractName: ContractName,
  methodAndTypes: string,
  args: ReadonlyArray<any>,
  request?: Deferrable<TransactionRequest>,
): Promise<T> {
  const to = getContractAddress(contractName, chainId);
  return contractCall(chainId, to, methodAndTypes, args, request);
}

export async function contractCall<T = Record<string | number, any>>(
  chainId: ChainId,
  to: string,
  methodAndTypes: string,
  args: ReadonlyArray<any>,
  request?: Deferrable<TransactionRequest>,
): Promise<T> {
  const { method, types, returnTypes } = prepareFunction(methodAndTypes);
  return getProvider(chainId)
    .call({
      to,
      data: hexConcat([
        functionSignature(method),
        encodeParameters(types, args),
      ]),
      ...request,
    })
    .then(response => decodeParameters(returnTypes, response) as unknown as T)
    .catch(error => {
      console.log(
        'contractCallFailed',
        chainId,
        to,
        methodAndTypes,
        args,
        hexConcat([functionSignature(method), encodeParameters(types, args)]),
        error,
        request,
      );
      throw error;
    });
}

export type CallData = {
  address: string;
  fnName: string;
  args: any[];
  key: string;
  parser?: (val: any) => any;
};

export async function aggregateCall<
  T = Record<string, BytesLike | Result | string>,
>(chainId: ChainId, callData: CallData[]) {
  const network: Network = getNetworks().find(
    item => item.chainId === chainId,
  )!;
  const items = callData.map(item => {
    const { method, types, returnTypes } = prepareFunction(item.fnName);
    return {
      target: item.address,
      callData: encodeFunctionDataWithTypes(method, types, item.args),
      returns: (data: BytesLike) => {
        try {
          return decodeParameters(returnTypes, data);
        } catch (e) {
          console.error(
            'decodeParameters::',
            chainId,
            item.address,
            method,
            types,
            returnTypes,
            item.args,
            data,
          );
          console.error(e);
          return data;
        }
      },
      key: item.key,
      parser: item.parser,
    };
  });

  const data = encodeFunctionDataWithTypes(
    'aggregate((address,bytes)[])',
    [
      {
        components: [
          { name: 'target', type: 'address' },
          { name: 'callData', type: 'bytes' },
        ],
        name: 'calls',
        type: 'tuple[]',
      },
    ] as any,
    [items.map(item => ({ target: item.target, callData: item.callData }))],
  );

  return getProvider(chainId)
    .call({ to: network.multicallContract, data })
    .then(result => {
      const [blockNumber, response] = decodeParameters(
        ['uint256', 'bytes[]'],
        result,
      );

      const returnData: T = {} as T;
      response.forEach((item: string, index: number) => {
        const value = items[index].returns(item);
        const key: string = (items[index].key || index) as string;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        returnData[key] = items[index].parser
          ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            items[index]?.parser(value)
          : value;
      });

      return { blockNumber: blockNumber.toString(), returnData };
    })
    .catch(error => {
      Logger.log(
        chainId,
        network.multicallContract,
        callData.map(item => [item.key, item.fnName, item.address, item.args]),
      );
      Logger.error(error, 'aggregator call');
      throw error;
    });
}

export async function tryAggregateCall<
  T = Record<string, BytesLike | Result | string>,
>(chainId: ChainId, callData: CallData[]) {
  const network: Network = getNetworks().find(
    item => item.chainId === chainId,
  )!;
  const items = callData.map(item => {
    const { method, types, returnTypes } = prepareFunction(item.fnName);
    return {
      target: item.address,
      callData: encodeFunctionDataWithTypes(method, types, item.args),
      returns: (data: BytesLike) => {
        try {
          return decodeParameters(returnTypes, data);
        } catch (e) {
          console.error(
            'decodeParameters:!',
            chainId,
            method,
            types,
            returnTypes,
            item.args,
            data,
          );
          console.error(e);
          return data;
        }
      },
      key: item.key,
      parser: item.parser,
    };
  });

  const data = encodeFunctionData('tryAggregate(bool,(address,bytes)[])', [
    false,
    items.map(item => [item.target, item.callData]),
  ]);

  return getProvider(chainId)
    .call({ to: network.multicallContract, data })
    .then(result => {
      const response = decodeParameters(['(bool,bytes)[]'], result)[0];

      const returnData: T = {} as T;
      // @ts-ignore
      response.forEach(([success, item], index: number) => {
        const key: string = (items[index].key || index) as string;
        if (success) {
          const value = items[index].returns(item);
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          returnData[key] = items[index].parser
            ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              items[index]?.parser(value)
            : value;
        } else {
          // @ts-ignore
          returnData[key] = undefined;
        }
      });
      return { returnData };
    })
    .catch(error => {
      Logger.log(chainId, network.multicallContract, data);
      Logger.error(error, 'aggregator call');
      throw error;
    });
}
