import axios, { AxiosRequestConfig, Method } from 'axios';
import { API_GLOBAL_PREFIX } from 'constants/api';

export const configHeaders = (authToken?: string) => {
  return {
    'Content-Type': 'application/json; charset=utf-8',
    Authorization: (authToken ? `Bearer ${authToken}` : undefined) as string,
  };
};

const defaults = {
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000',
  headers: configHeaders(),
  error: {
    code: 'INTERNAL_ERROR',
    message:
      'Something went wrong. Please check your internet connection or contact our support.',
    status: 503,
    data: {},
  },
};

const createAxios = (
  method: Method,
  url?: string,
  variables?: Record<string, any>,
  config?: Record<string, any>,
) =>
  new Promise((resolve, reject) => {
    const axiosConfig: AxiosRequestConfig = {
      url: `${defaults.baseURL}/${API_GLOBAL_PREFIX}/${url}`,
      method,
      headers: defaults.headers,
      params: method === 'get' ? variables : undefined,
      data: method !== 'get' ? variables : undefined,
      ...config,
    };

    axios(axiosConfig).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        console.log('Error:', error);

        if (error.response && error.response.data) {
          reject(error.response.data);
        } else {
          reject(error);
        }
      },
    );
  });

const api = {
  get: (...args: any[]): any => createAxios('get', ...args),
  post: (...args: any[]): any => createAxios('post', ...args),
  put: (...args: any[]): any => createAxios('put', ...args),
  patch: (...args: any[]): any => createAxios('patch', ...args),
  delete: (...args: any[]): any => createAxios('delete', ...args),
};

export default api;
