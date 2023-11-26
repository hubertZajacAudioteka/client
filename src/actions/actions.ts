'use server';

import { API_URL_SERVER } from '@/constants/api';
import {
  EndpointDataByPageMap,
  EndpointDataSingleRecordMap,
  GetRecordsByPageParams,
} from '@/types/serverSideRequest';
import { getToken } from '@/utlis/getToken';
import { EndpointDataRecordsMap } from '../types/serverSideRequest';

export const getRecordsByPageAction = async <
  T extends keyof EndpointDataByPageMap
>(
  endpoint: T,
  params: GetRecordsByPageParams
): Promise<EndpointDataByPageMap[T]> => {
  const jwt = getToken();
  let url = `${API_URL_SERVER}/${endpoint}?page=${params.page}`;

  for (const [key, value] of Object.entries(params)) {
    if (value && key !== 'page') {
      url += `&${key}=${value}`;
    }
  }

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch`);
  }

  const data = await res.json();

  return data as EndpointDataByPageMap[T];
};

export const getRecordById = async <
  T extends keyof EndpointDataSingleRecordMap
>(
  endpoint: T,
  id: string
): Promise<EndpointDataSingleRecordMap[T]> => {
  const jwt = getToken();
  const url = `${API_URL_SERVER}/${endpoint}/${id}`;

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch`);
  }

  const data = await res.json();

  return data as EndpointDataSingleRecordMap[T];
};

export const getAllRecords = async <T extends keyof EndpointDataRecordsMap>(
  endpoint: T
): Promise<EndpointDataRecordsMap[T]> => {
  const jwt = getToken();
  const url = `${API_URL_SERVER}/${endpoint}`;

  const res = await fetch(url, {
    headers: {
      'content-type': 'application/json',
      authorization: `Bearer ${jwt}`,
    },
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch`);
  }

  const data = await res.json();

  // Use type assertion to tell TypeScript that T is a valid key
  return data as EndpointDataRecordsMap[T];
};
