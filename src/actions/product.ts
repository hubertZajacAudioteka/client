'use server';

import { API_URL_SERVER } from '@/constants/api';
import { Category, GetProductsByPageData, Product } from '@/types/product';
import { getToken } from '@/utlis/getToken';
import { getRecordsByPageAction } from './base';
import { Endpoint } from '@/types/serverSideRequest';

// export const getProductsByPage = async (
//   page: number,
//   category = '',
//   sortParam = '',
//   direction = ''
// ): Promise<GetProductsByPageData> => {
//   const jwt = getToken();

//   let url = `${API_URL_SERVER}/products?page=${page}`;
//   if (category) {
//     url += `&category=${encodeURIComponent(category)}`;
//   }
//   if (sortParam && direction) {
//     url += `&sortParam=${encodeURIComponent(
//       sortParam
//     )}&direction=${encodeURIComponent(direction)}`;
//   }

//   const res = await fetch(url, {
//     headers: {
//       'content-type': 'application/json',
//       authorization: `Bearer ${jwt}`,
//     },
//   });

//   if (!res.ok) {
//     throw new Error('Failed to fetch products');
//   }
//   return res.json();
// };

export const getProductById = async (id: string): Promise<Product> => {
  const jwt = getToken();

  const res = await fetch(`${API_URL_SERVER}/products/${id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch product');
  }
  return res.json();
};

export const getCategories = async (): Promise<Category[]> => {
  const jwt = getToken();

  const res = await fetch(`${API_URL_SERVER}/categories`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });
  if (!res.ok) {
    throw new Error('Failed to fetch categories');
  }
  return res.json();
};
