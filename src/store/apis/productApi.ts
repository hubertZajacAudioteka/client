import { FormAddProduct, Product } from '@/types/product';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.NEXT_PUBLIC_API_URL}`,
  }),
  tagTypes: ['Product'],
  endpoints(builder) {
    return {
      addProduct: builder.mutation<Product, FormAddProduct>({
        query: (formAddProduct) => ({
          url: '/products',
          method: 'POST',
          body: formAddProduct,
          credentials: 'include',
        }),
      }),
    };
  },
});

export const { useAddProductMutation } = productApi;
