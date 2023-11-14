import { User } from '@/types/user';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  loggedUser: User | null;
}

const initialState: UserState = {
  loggedUser: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setLoggedUser: (state, action: PayloadAction<User>) => {
      state.loggedUser = action.payload;
    },
    logout: (state) => {
      state.loggedUser = null;
    },
  },
});

export const { setLoggedUser, logout } = userSlice.actions;

export default userSlice.reducer;
