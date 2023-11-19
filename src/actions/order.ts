'use server';

import { cookies } from 'next/headers';

export const getOrders = async (page: number) => {
  const jwt = cookies().get('jwt')?.value;

  const res = await fetch(`${process.env.API_URL}/orders?page=${page}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  return res.json();
};

export const getOrder = async (id: string) => {
  const jwt = cookies().get('jwt')?.value;

  const res = await fetch(`${process.env.API_URL}/orders/${id}`, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  return res.json();
};
