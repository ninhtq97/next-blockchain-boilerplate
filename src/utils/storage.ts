const KEYS = {
  AUTH: 'authToken',
  REF: 'refAddr',
};

export const getStoredAuthToken = (address: string) =>
  localStorage.getItem(`${KEYS.AUTH}_${address.toLowerCase()}`);

export const storeAuthToken = (address: string, token: string) =>
  localStorage.setItem(`${KEYS.AUTH}_${address.toLowerCase()}`, token);

export const removeStoredAuthToken = (address: string) =>
  localStorage.removeItem(`${KEYS.AUTH}_${address.toLowerCase()}`);
