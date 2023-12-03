import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL_CLIENT } from '@/constants/api';
import {
  User,
  UserFormLogin,
  UserFormRegister,
  UserLoginResponse,
  UserLogoutResponse,
  UserRegisterResponse,
  UserFormAdd,
} from '@/types/user';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_CLIENT}`,
  }),
  tagTypes: ['User'],
  endpoints(builder) {
    return {
      login: builder.mutation<UserLoginResponse, UserFormLogin>({
        query: (userFormLogin) => ({
          url: '/login',
          method: 'POST',
          body: userFormLogin,
          credentials: 'include',
        }),
      }),
      register: builder.mutation<UserRegisterResponse, UserFormRegister>({
        query: (userFormRegister) => ({
          url: '/register',
          method: 'POST',
          body: userFormRegister,
          credentials: 'include',
        }),
      }),
      logout: builder.mutation<UserLogoutResponse, void>({
        query: () => ({
          url: '/logout',
          method: 'POST',
          credentials: 'include',
        }),
      }),
      addUser: builder.mutation<User, UserFormAdd>({
        query: (userFormAdd: UserFormAdd) => ({
          url: '/users',
          method: 'POST',
          body: userFormAdd,
          credentials: 'include',
        }),
      }),
    };
  },
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useLogoutMutation,
  useAddUserMutation,
} = userApi;
