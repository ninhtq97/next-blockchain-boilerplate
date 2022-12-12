export * from './app';
export * from './auth';
export * from './contract';
export * from './tx';
export * from './web3';

export type TStatus = 'FAIL' | 'IDLE' | 'PROCESSING' | 'SUCCESS';
export type Position = 'top' | 'bottom' | 'left' | 'right';
export type Coins = 'busd' | 'usdt';

export type TMeta = {
  limit: number;
  page: number;
  totalPages: number;
  totalRows: number;
};

export type TPagination<T> = {
  data: T[];
  meta?: TMeta;
};

export type TDateRange = {
  startDate: string | Date | null;
  endDate: string | Date | null;
} | null;
