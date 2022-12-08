import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store';
import { TApp } from 'types';
import { toFixedNumber } from 'utils';

const initialState: TApp = {
  refreshDOM: 0, // 2: Refresh balance
  status: 'idle',
};

export const refreshDOM = createAsyncThunk(
  'app/refreshDOM',
  (num?: number) => num ?? toFixedNumber(Math.random()),
);

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    resetApp: () => initialState,
    setStatus: (state, action: PayloadAction<typeof initialState.status>) => {
      state.status = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(refreshDOM.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(refreshDOM.fulfilled, (state, action) => {
        state.status = 'idle';
        state.refreshDOM = action.payload;
      })
      .addCase(refreshDOM.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { setStatus, resetApp } = appSlice.actions;

export const selectApp = (state: RootState) => state.app;
export const selectAppStatus = (state: RootState) => state.app.status;

export const setAppStatus =
  (status: typeof initialState.status): AppThunk =>
  (dispatch, getState) => {
    const currentStatus = selectAppStatus(getState());
    if (currentStatus !== status) {
      dispatch(setStatus(status));
    }
  };

export default appSlice.reducer;
