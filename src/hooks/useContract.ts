import { ContractInterface, ethers } from 'ethers';

const useContract = () => {
  const onInitContract = (
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
  };

  return { onInitContract };
};

export default useContract;
