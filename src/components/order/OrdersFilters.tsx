import React from 'react';
import Link from 'next/link';
import { Endpoint, GetOrdersByPageParams, SortDirection } from '@/types/action';
import { getSortParamTitle } from '@/utlis/getSortParamTitle';
import { getHref } from '@/utlis/getHref';
import { SortParamOrder } from '../../types/action';
import { MdExpandMore } from 'react-icons/md';
import { FiSearch } from 'react-icons/fi';
import { redirect } from 'next/navigation';

interface OrdersFiltersProps {
  searchParams: GetOrdersByPageParams;
}

const OrdersFilters = ({ searchParams }: OrdersFiltersProps) => {
  const searchRecords = async (formData: FormData) => {
    'use server';
    redirect(
      getHref(Endpoint.Orders, {
        ...searchParams,
        search: formData.get('search') as string,
      })
    );
  };
  return (
    <div className='flex flex-col items-center mb-2 md:flex-row md:justify-between md:mb-10'>
      <form
        action={searchRecords}
        className='flex items-center border border-gray-300 p-1 w-[250px]'
      >
        <input
          className='border border-gray-300'
          type='text'
          placeholder='search'
          name='search'
        />
        <button
          type='submit'
          className='border border-gray-300 p-1 flex items-center cursor-pointer'
        >
          <FiSearch />
        </button>
      </form>
      <div className='relative group w-fit right-0'>
        <div className='flex items-center gap-1 p-2 cursor-pointer'>
          <h4 className='uppercase font-semibold tex-lg md:text-xl'>
            {getSortParamTitle(searchParams)}
          </h4>
          <MdExpandMore size={24} />
        </div>
        <div className='opacity-0 transform scale-y-0 origin-top transition-transform duration-300 group-hover:opacity-100 group-hover:scale-y-100 absolute right-0 bg-white text-black py-4 px-8 space-y-2 border-b border-x border-black'>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Date,
              sortDirection: SortDirection.Ascending,
            })}
            className='block hover:underline'
          >
            Oldest
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Date,
              sortDirection: SortDirection.Descending,
            })}
            className='block hover:underline'
          >
            Newest
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Value,
              sortDirection: SortDirection.Descending,
            })}
            className='block hover:underline'
          >
            Highest value
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Value,
              sortDirection: SortDirection.Ascending,
            })}
            className='block hover:underline'
          >
            Lowest value
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Name,
              sortDirection: SortDirection.Descending,
            })}
            className='block hover:underline'
          >
            Name descending
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Name,
              sortDirection: SortDirection.Ascending,
            })}
            className='block hover:underline'
          >
            Name ascending
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Email,
              sortDirection: SortDirection.Descending,
            })}
            className='block hover:underline'
          >
            Email descending
          </Link>
          <Link
            href={getHref(Endpoint.Orders, {
              ...searchParams,
              sortParam: SortParamOrder.Email,
              sortDirection: SortDirection.Ascending,
            })}
            className='block hover:underline'
          >
            Email ascending
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrdersFilters;
