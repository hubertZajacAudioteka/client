import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface PopupState {
  isOpen: boolean;
  message: string;
}

const initialState: PopupState = {
  isOpen: false,
  message: '',
};

export const popupSlice = createSlice({
  name: 'popup',
  initialState,
  reducers: {
    openPopup: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
      state.isOpen = true;
    },
    closePopup: (state) => {
      state.isOpen = false;
      state.message = '';
    },
  },
});

export const { openPopup, closePopup } = popupSlice.actions;

export default popupSlice.reducer;
