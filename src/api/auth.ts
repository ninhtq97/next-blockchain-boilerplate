import { API_ROUTES } from 'constants/api';
import { TSignIn, TSignInOk } from 'types';
import { api } from 'utils';

export const getSignMsg = async (addr: string): Promise<string> => {
  const message = await api.get(`${addr}/${API_ROUTES.MESSAGE}`);
  return message;
};

export const signIn = async (data: TSignIn): Promise<TSignInOk> => {
  const token = await api.post(API_ROUTES.SIGN_IN, data);
  return token;
};
