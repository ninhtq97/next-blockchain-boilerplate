import { BigNumber, constants, Contract, ethers } from 'ethers';

const useERC20 = () => {
  const onAllowance = async (
    contract: Contract,
    owner: string,
    sender: string,
  ) => {
    const allowance = await contract.allowance(owner, sender);
    return allowance;
  };

  const onApprove = async (
    contract: Contract,
    signer: ethers.providers.JsonRpcSigner,
    spender: string,
    amount: BigNumber = constants.MaxUint256,
  ) => {
    let approve = await contract.connect(signer).approve(spender, amount);
    await approve.wait();
    return approve;
  };

  return { onAllowance, onApprove };
};

export default useERC20;
