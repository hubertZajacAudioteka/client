import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  AddOrderValues,
  DeleteOrderResponse,
  EditOrderValues,
  FetchClientResponse,
  Order,
  OrderItem,
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
      fetchSecretKey: builder.mutation<FetchClientResponse, AddOrderValues>({
        query: (addOrderValues) => ({
          url: `/orders/process`,
          method: 'POST',
          body: addOrderValues,
          credentials: 'include',
        }),
        invalidatesTags: ['Order'],
      }),
      editOrder: builder.mutation<OrderItem, EditOrderValues>({
        query: (editOrderValues) => ({
          url: `/orders/${editOrderValues.id}`,
          method: 'PUT',
          body: {
            created_at: editOrderValues.created_at,
            products: editOrderValues.products,
          },
          credentials: 'include',
        }),
        invalidatesTags: ['Order'],
      }),
    };
  },
});

export const {
  useAddOrderMutation,
  useFetchSecretKeyMutation,
  useEditOrderMutation,
} = orderApi;
