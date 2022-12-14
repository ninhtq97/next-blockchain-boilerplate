import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk, RootState } from 'store';
import { TTx, TTxPayload } from 'types';
import { Toast } from 'utils';

const initialState: TTx = {
  pending: [],
  complete: [],
};

export const txSlice = createSlice({
  name: 'tx',
  initialState,
  reducers: {
    addTx: (state, action: PayloadAction<TTxPayload>) => {
      state[action.payload.type].push(action.payload.tx);
    },
    removeTx: (state, action: PayloadAction<TTxPayload>) => {
      state[action.payload.type] = state[action.payload.type].filter(
        (x) => x !== action.payload.tx,
      );
    },
  },
});

export const { addTx, removeTx } = txSlice.actions;

export const selectTx = (state: RootState) => state.tx;
export const selectTxPending = (state: RootState) => state.tx.pending;
export const selectTxComplete = (state: RootState) => state.tx.complete;

export const addTxIfNotDuplicate =
  (payload: TTxPayload): AppThunk =>
  async (dispatch, getState) => {
    const currentTx = selectTx(getState());

    if (!currentTx[payload.type].includes(payload.tx)) {
      if (payload.type === 'complete') {
        Toast.success(`Tx ${payload.tx} succeed`);
        setTimeout(() => {
          dispatch(removeTx(payload));
        }, 2000);
      } else {
        dispatch(addTx(payload));
      }
    }
  };

export const removeTxIfExist =
  (payload: TTxPayload): AppThunk =>
  (dispatch, getState) => {
    const currentTx = selectTx(getState());

    if (currentTx[payload.type].includes(payload.tx)) {
      dispatch(removeTx(payload));
    }
  };

export default txSlice.reducer;
