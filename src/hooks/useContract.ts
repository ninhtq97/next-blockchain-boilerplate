import { ContractInterface, ethers } from 'ethers';
import { useCallback } from 'react';

const useContract = () => {
  const onInitContract = useCallback(
    (
      address: string,
      abi: ContractInterface,
      signer?: ethers.providers.Provider | ethers.Signer,
    ): ethers.Contract => {
      return new ethers.Contract(
        address,
        abi,
        signer ??
          new ethers.providers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL),
      );
    },
    [],
  );

  return { onInitContract };
};

export default useContract;
