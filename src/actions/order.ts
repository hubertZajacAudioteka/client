'use server';

import { API_URL_SERVER } from '@/constants/api';
import { GetOrdersByPageData, Order } from '@/types/order';
import { getToken } from '@/utlis/getToken';

export const getOrdersByPage = async (
  page: number
): Promise<GetOrdersByPageData> => {
  const jwt = getToken();

  const res = await fetch(`${API_URL_SERVER}/orders?page=${page}`, {
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

export const getOrder = async (id: string): Promise<Order> => {
  const jwt = getToken();

  const res = await fetch(`${API_URL_SERVER}/orders/${id}`, {
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
