import { Language } from '@/types/config';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface ConfigState {
  isDarkTheme: boolean;
  language: Language;
}

const initialState: ConfigState = {
  isDarkTheme: false,
  language: Language.En,
};

export const configSlice = createSlice({
  name: 'config',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkTheme = !state.isDarkTheme;
    },
    setLang: (state, action: PayloadAction<Language>) => {
      state.language = action.payload;
    },
  },
});

export const { toggleTheme, setLang } = configSlice.actions;

export default configSlice.reducer;
