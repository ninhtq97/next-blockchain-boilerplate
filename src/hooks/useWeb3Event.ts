import { selectApp } from 'features/app/appSlice';
import { selectContract } from 'features/contract/contractSlice';
import { selectWeb3, setWeb3 } from 'features/web3/web3Slice';
import { useCallback, useEffect } from 'react';
import useContract from './useContract';
import { useAppDispatch, useAppSelector } from './useToolkit';

const useWeb3Event = () => {
  const dispatch = useAppDispatch();
  const app = useAppSelector(selectApp);
  const { address, chainId, provider } = useAppSelector(selectWeb3);
  const {} = useAppSelector(selectContract);

  const { onInitContract } = useContract();

  const fetchBalance = useCallback(async () => {
    console.log('Refetch balance');
    // TODO: Call get balance from contract
  }, []);

  useEffect(() => {
    if (address) {
      fetchBalance();
    }
  }, [fetchBalance, chainId, address]);

  useEffect(() => {
    app.refreshDOM === 2 && app.status === 'loading' && fetchBalance();
  }, [fetchBalance, app.refreshDOM, app.status]);

  const initContract = useCallback(() => {
    // TODO: Init contract
  }, []);

  useEffect(() => {
    initContract();
  }, [initContract]);

  // Event change wallet on metamask
  useEffect(() => {
    if (provider) {
      const onAccountsChanged = async (accounts: string[]) => {
        dispatch(setWeb3({ address: accounts[0].toLowerCase() }));
      };

      provider.on('accountsChanged', onAccountsChanged);

      return () => {
        if (provider.removeListener) {
          provider.removeListener('accountsChanged', onAccountsChanged);
        }
      };
    }
  }, [dispatch, provider]);

  useEffect(() => {
    if (provider) {
      const onChainChanged = async (chainId: string) => {
        dispatch(setWeb3({ chainId: +chainId }));
      };

      provider.on('chainChanged', onChainChanged);
      return () => {
        if (provider.removeListener) {
          provider.removeListener('chainChanged', onChainChanged);
        }
      };
    }
  }, [dispatch, provider]);
};

export default useWeb3Event;
