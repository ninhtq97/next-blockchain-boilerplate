export { default as api } from './api';
export * from './array';
export * from './bigNumber';
export * from './date';
export * from './error';
export * from './random';
export * from './sentry';
export * from './storage';
export * from './string';
export * from './toast';

export const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

export const excludeEmptyValue = <T extends {}>(obj: T): T => {
  Object.keys(obj).forEach((k) => !obj[k] && delete obj[k]);
  return obj;
};
