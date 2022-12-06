import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'store';
import { TApp } from 'types';
import { toFixedNumber } from 'utils';

const initialState: TApp = {
  refreshDOM: 0,
  status: 'idle',
};

export const refreshDOM = createAsyncThunk(
  'app/refreshDOM',
  (num?: number) => num ?? true,
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetApp: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshDOM.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshDOM.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshDOM =
          typeof action.payload === 'number'
            ? action.payload
            : toFixedNumber(Math.random());
      })
      .addCase(refreshDOM.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { resetApp } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;

export default appSlice.reducer;
