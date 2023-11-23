'use server';

import { cookies } from 'next/headers';

export const getToken = (): string => {
  const jwt = cookies().get('jwt')?.value;
  return jwt!;
};
