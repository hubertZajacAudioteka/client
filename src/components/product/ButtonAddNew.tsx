'use client';
import { RootState } from '@/store';
import React from 'react';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';
import Link from 'next/link';

const ButtonAddNew = () => {
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const content =
    loggedUser && loggedUser.role?.name !== 'client' ? (
      <Link href='products/new'>
        <button className='flex items-center gap-1 mb-6 text-sm bg-orange-400 px-2 py-1 rounded-md md:px-4 md:py-2 md:text-lg md:mx-auto'>
          <span>
            <AiOutlinePlus size={12} />
          </span>
          Add New
        </button>
      </Link>
    ) : null;
  return content;
};

export default ButtonAddNew;
