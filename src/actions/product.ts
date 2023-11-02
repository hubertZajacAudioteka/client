'use server';

import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

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

  try {
    const res = await fetch(url, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getProduct = async (id: string) => {
  const jwt = cookies().get('jwt')?.value;
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCategories = async () => {
  const jwt = cookies().get('jwt')?.value;
  try {
    const res = await fetch(`${process.env.API_URL}/categories`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (id: string) => {
  const jwt = cookies().get('jwt')?.value;
  try {
    const res = await fetch(`${process.env.API_URL}/products/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    });
    const data = await res.json();
    revalidatePath('/products');
    return data;
  } catch (error) {
    console.log(error);
  }
};
