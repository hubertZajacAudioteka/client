import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { MutationTrigger } from '@reduxjs/toolkit/dist/query/react/buildHooks';
import { MutationDefinition } from '@reduxjs/toolkit/query';

interface DeleteRecordFunction {
  deleteFunction: MutationTrigger<MutationDefinition<string, any, string, any>>;
}

interface ConfirmDialogState {
  isOpen: boolean;
  idRecordToDelete: string | null;
  deleteRecord: DeleteRecordFunction | null;
}

const initialState: ConfirmDialogState = {
  isOpen: false,
  idRecordToDelete: null,
  deleteRecord: null,
};

export const confirmDialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setIdRecordToDelete: (state, action: PayloadAction<string>) => {
      state.idRecordToDelete = action.payload;
    },
    setDeleteFunction: (state, action: PayloadAction<DeleteRecordFunction>) => {
      state.deleteRecord = action.payload;
    },
    openConfirmDialog: (state) => {
      state.isOpen = true;
    },
    closeConfirmDialog: (state) => {
      state.isOpen = false;
      state.deleteRecord = null;
    },
  },
});

export const {
  openConfirmDialog,
  closeConfirmDialog,
  setIdRecordToDelete,
  setDeleteFunction,
} = confirmDialogSlice.actions;

export default confirmDialogSlice.reducer;
