import { Endpoint, GetRecordsByPageParams } from '@/types/action';

export const getHref = (
  endpoint: Endpoint,
  searchParams: GetRecordsByPageParams
): string => {
  let href = `/${endpoint}?page=1`;

  for (const [key, value] of Object.entries(searchParams)) {
    if (key !== 'page' && value) {
      href += `&${key}=${encodeURIComponent(value)}`;
    }
  }

  return href;
};
