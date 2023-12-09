import { useGetProductsByNameQuery } from '@/store/apis/productApi';
import React, { useEffect, useState } from 'react';

const useSearchProductsDebounce = (
  searchTerm: string,
  delay: number,
  isSearchEdited: boolean
) => {
  const [debouncedSearchValue, setDebouncedSearchValue] =
    useState<string>(searchTerm);
  const { data, isLoading, isFetching, error } = useGetProductsByNameQuery({
    search: debouncedSearchValue ?? '',
  });

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchValue(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  if (error) {
    throw new Error('Failed to fetchs products');
  }

  if (!searchTerm) {
    return {
      isLoading: false,
      data: '',
    };
  }

  if (searchTerm.length < 3) {
    return {
      isLoading: false,
      data: isSearchEdited ? 'Type at least 3 characters' : '',
    };
  }

  return {
    isLoading: isLoading || isFetching,
    data: data?.length ? data : 'No products found',
  };
};

export default useSearchProductsDebounce;
