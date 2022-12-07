import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { getErrorMessage } from 'utils';

const useApi = () => {
  const [loading, setLoading] = useState(false);

  const onCallWithCatchError = useCallback(
    async (
      callTx: () => Promise<AxiosResponse>,
    ): Promise<AxiosResponse | null> => {
      let res: AxiosResponse | null = null;

      try {
        setLoading(true);
        res = await callTx();

        return res;
      } catch (error) {
        console.log('Catch error:', error);
        const message = getErrorMessage(error);
        console.log('Catch message:', message);
      } finally {
        setLoading(false);
      }

      return null;
    },
    [],
  );

  return {
    onCallWithCatchError,
    loading,
  };
};

export default useApi;
