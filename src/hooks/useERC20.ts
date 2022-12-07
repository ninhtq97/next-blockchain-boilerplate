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

  const getBalance = async (contract: Contract, address: string) => {
    const balance = await contract.balanceOf(address);
    console.log('Balance:', balance.toString());
    return balance;
  };

  return { onAllowance, onApprove, getBalance };
};

export default useERC20;
