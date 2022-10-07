import { useState } from 'react';
import { TMeta } from 'types';

const initState: TMeta = {
  page: 1,
  limit: 10,
  totalRows: 0,
  totalPages: 0,
};

const useMeta = () => {
  const [meta, setMeta] = useState(initState);

  return { meta, setMeta };
};

export default useMeta;
