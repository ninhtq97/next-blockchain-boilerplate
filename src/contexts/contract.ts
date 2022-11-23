import { createContext } from 'react';
import { TContract } from 'types/contract';

export const initContract: TContract = {};

const setContract: React.Dispatch<React.SetStateAction<TContract>> = () => {};

export const ContractContext = createContext({ ...initContract, setContract });
