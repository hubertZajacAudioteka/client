'use server';

import { cookies } from 'next/headers';

export const getProducts = async (
  page: number,
  category = '',
  sortParam = '',
  direction = ''
) => {
  const jwt = cookies().get('jwt')?.value;

  let url = `${process.env.API_URL}/products?page=${page}`;
  if (category) {
    url += `&category=${encodeURIComponent(category)}`;
  }
  if (sortParam && direction) {
    url += `&sortParam=${encodeURIComponent(
      sortParam
    )}&direction=${encodeURIComponent(direction)}`;
  }

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
};

export const getProduct = async (id: string) => {
  const jwt = cookies().get('jwt')?.value;

  const res = await fetch(`${process.env.API_URL}/products/${id}`, {
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

export const getCategories = async () => {
  const jwt = cookies().get('jwt')?.value;

  const res = await fetch(`${process.env.API_URL}/categories`, {
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
