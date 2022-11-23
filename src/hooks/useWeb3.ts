import WalletConnectProvider from '@walletconnect/web3-provider';
import { ContractContext, initWeb3, Web3Context } from 'contexts';
import { ethers } from 'ethers';
import { useCallback, useContext } from 'react';
import { TWeb3Client } from 'types';
import Web3Modal, { IProviderOptions } from 'web3modal';

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

let web3Modal: Web3Modal | null;

if (typeof window !== 'undefined') {
  web3Modal = new Web3Modal({ cacheProvider: true, providerOptions });
}

const useWeb3 = (): TWeb3Client => {
  const { provider, web3Provider, setWeb3 } = useContext(Web3Context);
  const { setContract } = useContext(ContractContext);

  const connect = useCallback(async () => {
    const instance = await web3Modal?.connect();

    if (instance) {
      const provider = new ethers.providers.Web3Provider(instance);
      const network = await provider.getNetwork();
      const signer = provider.getSigner();
      const address = (await signer.getAddress()).toLowerCase();

      setWeb3({
        provider: instance,
        web3Provider: provider,
        signer,
        address,
        chainId: network.chainId,
      });
    }
  }, [setWeb3]);

  const disconnect = useCallback(async () => {
    if (web3Provider) {
      web3Modal?.clearCachedProvider();
      setWeb3(initWeb3);
    }
  }, [setWeb3, web3Provider]);

  return { connect, disconnect };
};

export default useWeb3;
