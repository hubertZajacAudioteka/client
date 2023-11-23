import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AddOrderValues,
  DeleteOrderResponse,
  FetchClientResponse,
  Order,
} from '@/types/order';
import { API_URL_CLIENT } from '@/constants/api';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_CLIENT}`,
  }),
  tagTypes: ['Order'],
  endpoints(builder) {
    return {
      addOrder: builder.mutation<Order, AddOrderValues>({
        query: (addOrderValues) => ({
          url: '/orders',
          method: 'POST',
          body: addOrderValues,
          credentials: 'include',
        }),
      }),
      deleteOrder: builder.mutation<DeleteOrderResponse, string>({
        query: (id) => ({
          url: `/orders/${id}`,
          method: 'DELETE',
        }),
        invalidatesTags: ['Order'],
      }),
      fetchSecretKey: builder.mutation<FetchClientResponse, AddOrderValues>({
        query: (addOrderValues) => ({
          url: `/orders/process`,
          method: 'POST',
          body: addOrderValues,
          credentials: 'include',
        }),
        invalidatesTags: ['Order'],
      }),
    };
  },
});

export const { useAddOrderMutation, useFetchSecretKeyMutation } = orderApi;
