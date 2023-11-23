import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { API_URL_CLIENT } from '@/constants/api';
import {
  DeleteProductResponse,
  FormAddProduct,
  FormEditProduct,
  Product,
} from '@/types/product';

export const productApi = createApi({
  reducerPath: 'productApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `${API_URL_CLIENT}`,
  }),
  tagTypes: ['Product'],
  endpoints(builder) {
    return {
      addProduct: builder.mutation<Product, FormAddProduct>({
        query: (formAddProduct) => {
          const formData = new FormData();
          formData.append('title', formAddProduct.title);
          formData.append('description', formAddProduct.description);
          formData.append('price', formAddProduct.price.toString());
          formData.append('category_id', formAddProduct.category_id);
          if (formAddProduct.image) {
            formData.append('image', formAddProduct.image);
          }

          return {
            url: '/products',
            method: 'POST',
            body: formData,
            credentials: 'include',
          };
        },
        invalidatesTags: ['Product'],
      }),
      editProduct: builder.mutation<Product, FormEditProduct>({
        query: ({ id, ...formEditProduct }) => {
          const formData = new FormData();
          formData.append('title', formEditProduct.title);
          formData.append('description', formEditProduct.description);
          formData.append('price', formEditProduct.price.toString());
          formData.append('category_id', formEditProduct.category_id);
          formData.append('_method', 'PUT');
          if (formEditProduct.image) {
            formData.append('image', formEditProduct.image);
          }

          return {
            url: `/products/${id}`,
            method: 'POST',
            body: formData,
            credentials: 'include',
          };
        },
        invalidatesTags: ['Product'],
      }),
      deleteProduct: builder.mutation<DeleteProductResponse, string>({
        query: (id) => ({
          url: `/products/${id}`,
          method: 'DELETE',
          credentials: 'include',
        }),
        invalidatesTags: () => ['Product'],
      }),
    };
  },
});

export const {
  useAddProductMutation,
  useEditProductMutation,
  useDeleteProductMutation,
} = productApi;
