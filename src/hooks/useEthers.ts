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
      // TODO: Fetch message
      // const message = await fetchSignMessage(address);
      // let signature = '';
      // TODO: Check wallet connect
      // if (instance.wc) {
      //   signature = await provider.send('personal_sign', [
      //     ethers.utils.hexlify(ethers.utils.toUtf8Bytes(message)),
      //     address.toLowerCase(),
      //   ]);
      // } else {
      //   signature = await signer.signMessage(message);
      // }
      // TODO: Call get token
      // const token = await signIn({ wallet: address, signature });
      // if (token.success) {
      // TODO: Save token to storage
      // storeAuthToken(address, token.data);
      // }
    }
  };

  return { onSignMessage };
};

export default useEthers;
