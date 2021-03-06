import { BigNumber, Wallet } from 'ethers';
import { TransactionRequest } from '@ethersproject/abstract-provider';
import { addHexPrefix, stripHexPrefix } from 'ethereumjs-util';
import { Buffer } from 'buffer';
import hdkey from 'hdkey';
import {
  Account,
  accounts,
  AccountType,
  DecryptedAccountSecret,
} from './accounts';
import { DEFAULT_DERIVATION_PATH } from './constants';
import { Encryptor } from './encryptor';
import { getProvider } from './RpcEngine';
import { ChainId } from 'types/network';

interface UserWallet {
  address: string;
}

export const makeWalletPrivateKey = (
  type: AccountType,
  secret: string,
  dPath: string = DEFAULT_DERIVATION_PATH,
  index: number = 0,
): string => {
  switch (type) {
    default:
    case AccountType.PRIVATE_KEY:
      return addHexPrefix(secret);
    case AccountType.MNEMONIC:
      return addHexPrefix(
        hdkey
          .fromMasterSeed(Buffer.from(stripHexPrefix(secret), 'hex'))
          .derive(`${dPath}/${index}`)
          .privateKey.toString('hex'),
      );
  }
};

export class UnlockedWallet {
  protected account: Account;
  constructor(
    _account: number,
    private _index: number = 0,
    private _dPath: string = DEFAULT_DERIVATION_PATH,
  ) {
    this.account = accounts.get(_account);
  }

  public get address() {
    return this.account.address;
  }
}

export const unlockWalletSecrets = async (
  accountIndex: number,
  password: string,
) => {
  const account = accounts.get(accountIndex);
  const encryptor = new Encryptor();
  return encryptor.decrypt(
    password,
    account.secret,
  ) as Promise<DecryptedAccountSecret>;
};

class WalletManager {
  private _cache: Record<string, UserWallet> = {};
  private _encryptor = new Encryptor();

  constructor() {}

  public get address(): string {
    return (accounts.current?.address?.toLowerCase() || null) as string;
  }

  public get readOnly() {
    return [AccountType.PUBLIC_ADDRESS].includes(accounts.current.type);
  }

  public async sendTransaction(
    chainId: ChainId | number,
    transaction: TransactionRequest,
    password: string,
  ) {
    if (transaction.chainId === undefined) {
      throw new Error('Transaction must have chain id set.');
    }
    delete transaction.customData;

    console.time('unlockWallet');
    const wallet = await this.unlockedWallet(accounts.selected, password);
    console.timeEnd('unlockWallet');

    const signer = wallet.connect(getProvider(chainId as ChainId));

    console.time('populateTransaction');
    const tx = await signer.populateTransaction(transaction);
    console.timeEnd('populateTransaction');

    // Sometimes transactions fails on rsk networks saying tx is out of gas
    // even though confirmed tx uses a lot less of gas.
    // This increases estimated limit by 3%.
    if (
      [30, 31].includes(transaction.chainId) &&
      tx.gasLimit?.toString() !== '21000' &&
      transaction.gasLimit === undefined
    ) {
      tx.gasLimit = BigNumber.from(tx.gasLimit).mul(103).div(100).toHexString();
    }

    const signedTx = await signer.signTransaction(tx);
    return signer.provider.sendTransaction(signedTx);
  }

  public async signMessage(message: string, password: string): Promise<string> {
    return (await this.unlockedWallet(accounts.selected, password)).signMessage(
      message,
    );
  }

  public unlockWalletSecrets = async (password: string, secrets: string) => {
    return this._encryptor.decrypt(
      password,
      secrets,
    ) as Promise<DecryptedAccountSecret>;
  };

  protected unlockedWallet = async (accountIndex: number, password: string) => {
    const account = accounts.get(accountIndex);
    const secrets = await this.unlockWalletSecrets(password, account.secret!);
    switch (account.type) {
      default:
      case AccountType.PRIVATE_KEY:
        return new Wallet(
          makeWalletPrivateKey(AccountType.PRIVATE_KEY, secrets.privateKey),
        );
      case AccountType.MNEMONIC:
        return new Wallet(
          makeWalletPrivateKey(
            AccountType.MNEMONIC,
            secrets.masterSeed,
            account.dPath,
            account.index,
          ),
        );
    }
  };
}

export const wallet = new WalletManager();
