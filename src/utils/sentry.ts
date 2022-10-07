export const isUserRejected = (err) => {
  return typeof err === 'object' && 'code' in err && err.code === 4001;
};
