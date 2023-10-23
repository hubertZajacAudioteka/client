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
        <button className='flex items-center gap-1 mb-6'>
          <span>
            <AiOutlinePlus />
          </span>
          Add New Product
        </button>
      </Link>
    ) : null;
  return content;
};

export default ButtonAddNew;
