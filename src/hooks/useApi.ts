import { AxiosResponse } from 'axios';
import { useCallback, useState } from 'react';
import { getErrorMessage } from 'utils';

const useApi = () => {
  const [loading, setLoading] = useState(false);

  const onCallWithCatchError = useCallback(
    async (
      callFn: () => Promise<AxiosResponse>,
    ): Promise<AxiosResponse | null> => {
      try {
        setLoading(true);
        return await callFn();
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
