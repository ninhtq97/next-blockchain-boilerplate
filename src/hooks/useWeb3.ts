import WalletConnectProvider from '@walletconnect/web3-provider';
import { ethers } from 'ethers';
import { resetWeb3, setWeb3 } from 'features/web3/web3Slice';
import { useCallback } from 'react';
import { TWeb3Client } from 'types';
import { getErrorMessage } from 'utils';
import Web3Modal, { IProviderOptions } from 'web3modal';
import { useAppDispatch } from './useToolkit';

let web3Modal: Web3Modal | null;

if (typeof window !== 'undefined') {
  const providerOptions: IProviderOptions = {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        rpc: {
          56: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
        },
        network: 'binance',
        chainId: 97,
        bridge: 'https://pancakeswap.bridge.walletconnect.org',
      },
    },
  };

  web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
}

const useWeb3 = (): TWeb3Client => {
  const dispatch = useAppDispatch();

  const connect = useCallback(async () => {
    try {
      if (web3Modal) {
        const instance = await web3Modal.connect();

        if (instance) {
          const provider = new ethers.providers.Web3Provider(instance);
          const network = await provider.getNetwork();
          const signer = provider.getSigner();
          const address = (await signer.getAddress()).toLowerCase();

          dispatch(
            setWeb3({
              provider: instance,
              web3Provider: provider,
              signer,
              address,
              chainId: network.chainId,
            }),
          );
        }
      }
    } catch (error) {
      const message = getErrorMessage(error);
      console.warn('Connect error:', message);
    }
  }, [dispatch]);

  const disconnect = useCallback(async () => {
    if (web3Modal) {
      web3Modal.clearCachedProvider();
      dispatch(resetWeb3());
    }
  }, [dispatch]);

  return { connect, disconnect };
};

export default useWeb3;
