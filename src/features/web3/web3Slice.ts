import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ethers } from 'ethers';
import { RootState } from 'store';
import { TWeb3Provider } from 'types';

export const initialState: TWeb3Provider = {
  provider: null,
  rpcProvider: new ethers.JsonRpcProvider(process.env.NEXT_PUBLIC_RPC_URL),
  balance: {},
  status: 'idle',
};

export const setWeb3 = createAsyncThunk(
  'web3/setWeb3',
  (payload: Partial<TWeb3Provider>) => {
    return payload;
  },
);

export const web3Slice = createSlice({
  name: 'web3',
  initialState,
  reducers: {
    resetWeb3: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setWeb3.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setWeb3.fulfilled, (state, action) => ({
        ...state,
        ...action.payload,
        status: 'idle',
      }))
      .addCase(setWeb3.rejected, (state) => ({
        ...initialState,
        status: 'failed',
      }));
  },
});

export const { resetWeb3 } = web3Slice.actions;

export const selectWeb3 = (state: RootState) => state.web3;

export default web3Slice.reducer;
