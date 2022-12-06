import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { TContract } from 'types';

const initialState: TContract = {
  status: 'idle',
};

export const setContract = createAsyncThunk('contract/setContract', () => true);

export const contractSlice = createSlice({
  name: 'contract',
  initialState,
  reducers: {
    resetContract: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(setContract.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(setContract.fulfilled, (state, action) => {
        state.status = 'idle';
      })
      .addCase(setContract.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetContract } = contractSlice.actions;

export const selectContract = (state: RootState) => state.contract;

export default contractSlice.reducer;
