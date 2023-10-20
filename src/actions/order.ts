'use server';

import { cookies } from 'next/headers';

export const getOrders = async (page: number) => {
  const jwt = cookies().get('jwt')?.value;
  try {
    const res = await fetch(`${process.env.API_URL}/orders?page=${page}`, {
      headers: {
        'content-type': 'application/json',
        authorization: `Bearer ${jwt}`,
      },
    });
    console.log('ORDER', res);
    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getOrder = async (id: string) => {
  const jwt = cookies().get('jwt')?.value;
  try {
    const res = await fetch(`${process.env.API_URL}/orders/${id}`, {
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
