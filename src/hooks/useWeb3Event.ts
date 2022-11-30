import { ContractContext, Web3Context } from 'contexts';
import { useCallback, useContext, useEffect } from 'react';
import useContract from './useContract';

const useWeb3Event = () => {
  const { provider, address, chainId, setWeb3 } = useContext(Web3Context);
  const { setContract } = useContext(ContractContext);

  const { onInitContract } = useContract();

  useEffect(() => {
    // TODO: Refetch balance wallet
  }, [address, chainId]);

  const initContract = useCallback(async () => {
    return {};
  }, []);

  useEffect(() => {
    initContract();
  }, [initContract]);

  // Event change wallet on metamask
  useEffect(() => {
    if (provider) {
      const onAccountsChanged = async (accounts: string[]) => {
        setWeb3((prev) => ({ ...prev, address: accounts[0].toLowerCase() }));
      };

      provider.on('accountsChanged', onAccountsChanged);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', onAccountsChanged);
        }
      };
    }
  }, [provider, setWeb3]);

  useEffect(() => {
    if (provider) {
      const onChainChanged = async (chainId: string) => {
        setWeb3((prev) => ({ ...prev, chainId: +chainId }));
      };

      provider.on('chainChanged', onChainChanged);
      return () => {
        if (provider.removeListener) {
          provider.removeListener('chainChanged', onChainChanged);
        }
      };
    }
  }, [provider, setWeb3]);
};

export default useWeb3Event;
