import { useCallback, useEffect, useState } from 'react';
import { excludeEmptyValue } from 'utils';

type TFilter = typeof initialState & Record<string, any>;

const initialState = { page: 1, limit: 10, keyword: '' };

const useFilter = (state?: Record<string, any>) => {
  const [filter, setFilter] = useState<TFilter>({ ...initialState, ...state });
  const takeOptions = [10, 25, 50];

  useEffect(() => {
    const newFilter = excludeEmptyValue(filter);
    setFilter(newFilter);
  }, [filter]);

  const onChangeFilter = useCallback((data: Record<string, any>) => {
    setFilter((prev) => ({ ...prev, ...data }));
  }, []);

  const onChangePage = (page: number) => {
    setFilter((prev) => ({ ...prev, page }));
  };

  const onChangeSize = (limit: number) => {
    setFilter((prev) => ({ ...prev, page: 1, limit }));
  };

  return { filter, takeOptions, onChangeFilter, onChangePage, onChangeSize };
};

export default useFilter;
