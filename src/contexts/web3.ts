import { ethers } from 'ethers';
import { createContext } from 'react';
import { TWeb3Provider } from 'types';

export const initWeb3: TWeb3Provider = {
  provider: null,
  rpcProvider: new ethers.providers.JsonRpcProvider(process.env.RPC_URL),
  balance: {},
};

const setWeb3: React.Dispatch<React.SetStateAction<TWeb3Provider>> = () => {};

export const Web3Context = createContext({ ...initWeb3, setWeb3 });
