import { getSignMsg } from 'api';
import { ethers } from 'ethers';
import { selectWeb3 } from 'features/web3/web3Slice';
import { getStoredAuthToken } from 'utils';
import { useAppSelector } from './useToolkit';

const useEthers = () => {
  const { provider } = useAppSelector(selectWeb3);

  const onSignMessage = async (
    instance: any,
    address: string,
    signer: ethers.providers.JsonRpcSigner,
  ) => {
    const authToken = getStoredAuthToken(address);
    if (!authToken) {
      const message = await getSignMsg(address);
      let signature = '';
      if (instance.wc) {
        signature = await provider.send('personal_sign', [
          ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message)),
          address.toLowerCase(),
        ]);
      } else {
        signature = await signer.signMessage(message);
      }
      return signature;
    }
  };

  return { onSignMessage };
};

export default useEthers;
