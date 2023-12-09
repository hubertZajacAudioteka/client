'use client';

import React, { useState, ChangeEvent, useEffect, useRef } from 'react';
import useSearchProductsDebounce from '@/hooks/useSearchProductsDebounce';
import SpinnerBtn from '../ui/SpinnerBtn';
import { useRouter } from 'next/navigation';
import { Endpoint } from '@/types/action';

const Search = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isSearchEdited, setIsSearchEdited] = useState<boolean>(false);
  const { data, isLoading } = useSearchProductsDebounce(
    searchTerm,
    500,
    isSearchEdited
  );
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState<boolean>(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className='relative mb-8 border border-gray-300 max-w-[600px] mx-auto '
    >
      <input
        type='text'
        value={searchTerm}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setSearchTerm(e.target.value)
        }
        onBlur={() => setIsSearchEdited(true)}
        onFocus={() => setShowSuggestions(true)}
        className='py-2 px-4 w-64 placeholder-gray-500'
        placeholder='Search products...'
      />

      {isLoading && <SpinnerBtn />}

      {showSuggestions && data && data.length && (
        <div className='absolute z-10 bg-white w-64 right-0 top-10 '>
          {Array.isArray(data) ? (
            data.map((product) => (
              <div
                key={product.id}
                className='p-2 hover:bg-gray-100 cursor-pointer border border-gray-300 capitalize'
                onClick={() =>
                  router.push(`/${Endpoint.Products}/${product.id}`)
                }
              >
                <p>{product.title}</p>
              </div>
            ))
          ) : (
            <div className='p-2 hover:bg-gray-100 cursor-pointer border border-gray-300'>
              <p>{data}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
