import {
  TransactionReceipt,
  TransactionResponse,
} from '@ethersproject/providers';
import { selectWeb3 } from 'features/web3/web3Slice';
import { useCallback, useState } from 'react';
import { isUserRejected, Toast } from 'utils';
import { useAppSelector } from './useToolkit';

export type TxResponse = TransactionResponse | null;

export type CatchTxErrorReturn = {
  onFetchWithCatchTxError: (
    fn: () => Promise<TxResponse>,
  ) => Promise<TransactionReceipt | null>;
  loading: boolean;
};

type ErrorData = {
  code: number;
  message: string;
};

type TxError = {
  data: ErrorData;
  error: string;
};

// -32000 is insufficient funds for gas * price + value
const isGasEstimationError = (err: TxError): boolean =>
  err?.data?.code === -32000;

export default function useCatchTxError(): CatchTxErrorReturn {
  const { web3Provider } = useAppSelector(selectWeb3);
  const [loading, setLoading] = useState(false);

  const handleNormalError = useCallback((error, tx?: TxResponse) => {
    if (tx) {
      Toast.error(
        'Please try again. Confirm the transaction and make sure you are paying enough gas!',
      );
    } else {
      Toast.error(
        error?.error?.data?.message ??
          'Please try again. Confirm the transaction and make sure you are paying enough gas!',
      );
    }
  }, []);

  const onFetchWithCatchTxError = useCallback(
    async (
      callTx: () => Promise<TxResponse>,
    ): Promise<TransactionReceipt | null> => {
      let tx: TxResponse = null;

      try {
        setLoading(true);

        tx = await callTx();

        Toast.success('Transaction Submitted');

        const receipt = await tx!.wait();

        return receipt;
      } catch (error) {
        if (!isUserRejected(error)) {
          if (!tx) {
            handleNormalError(error);
          } else {
            if (web3Provider) {
              web3Provider
                .call(tx as any, tx.blockNumber)
                .then(() => {
                  handleNormalError(error, tx);
                })
                .catch((err) => {
                  if (isGasEstimationError(err)) {
                    handleNormalError(error, tx);
                  } else {
                    let recursiveErr = err;
                    let reason: string | undefined;
                    if (recursiveErr?.data?.message) {
                      reason = recursiveErr?.data?.message;
                    } else {
                      while (recursiveErr) {
                        reason =
                          recursiveErr.reason ?? recursiveErr.message ?? reason;
                        recursiveErr =
                          recursiveErr.error ??
                          recursiveErr.data?.originalError;
                      }
                    }

                    const REVERT_STR = 'execution reverted: ';
                    const indexInfo = reason?.indexOf(REVERT_STR) || -1;
                    const isRevertedError = indexInfo >= 0;

                    if (isRevertedError)
                      reason = reason?.substring(indexInfo + REVERT_STR.length);

                    Toast.error(
                      isRevertedError
                        ? `Transaction failed with error: ${reason}`
                        : 'Transaction failed. For detailed error message:',
                    );
                  }
                });
            }
          }
        }
      } finally {
        setLoading(false);
      }

      return null;
    },
    [handleNormalError, web3Provider],
  );

  return {
    onFetchWithCatchTxError,
    loading,
  };
}
