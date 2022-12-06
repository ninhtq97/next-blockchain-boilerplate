import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import appReducer from 'features/app/appSlice';
import contractReducer from 'features/contract/contractSlice';
import web3Reducer from 'features/web3/web3Slice';

export const store = configureStore({
  reducer: {
    app: appReducer,
    web3: web3Reducer,
    contract: contractReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
