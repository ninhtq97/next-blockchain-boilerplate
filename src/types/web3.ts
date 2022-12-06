import { BigNumber, ethers } from 'ethers';
import { Coins } from 'types';

export type TWeb3Provider = {
  provider: any;
  web3Provider?: ethers.providers.Web3Provider;
  rpcProvider?: ethers.providers.Provider;
  signer?: ethers.providers.JsonRpcSigner;
  address?: string;
  balance: Partial<Record<keyof Coins, BigNumber>>;
  chainId?: number;
  status: 'idle' | 'loading' | 'failed';
};

export type TWeb3Client = {
  connect: () => Promise<void>;
  disconnect: () => Promise<void>;
};
