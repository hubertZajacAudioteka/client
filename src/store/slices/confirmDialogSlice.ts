import { RecordToDelete } from '@/types/record';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ConfirmDialogState {
  isOpen: boolean;
  recordToDelete: RecordToDelete | null;
}

const initialState: ConfirmDialogState = {
  isOpen: false,
  recordToDelete: null,
};

export const confirmDialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setRecordToDelete: (state, action: PayloadAction<RecordToDelete>) => {
      state.recordToDelete = action.payload;
    },
    openConfirmDialog: (state) => {
      state.isOpen = true;
    },
    closeConfirmDialog: (state) => {
      state.isOpen = false;
      state.recordToDelete = null;
    },
  },
});

export const { openConfirmDialog, closeConfirmDialog, setRecordToDelete } =
  confirmDialogSlice.actions;

export default confirmDialogSlice.reducer;
