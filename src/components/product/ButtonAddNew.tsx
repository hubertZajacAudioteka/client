'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';
import Link from 'next/link';
import { FaPlus } from 'react-icons/fa6';
import { Endpoint } from '@/types/serverSideRequest';

interface ButtonAddNewProps {
  endpoint: Endpoint;
}

const ButtonAddNew = ({ endpoint }: ButtonAddNewProps) => {
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const isEditorRole = loggedUser?.role?.name !== 'client';

  const content = isEditorRole ? (
    <Link href={`/${endpoint}/new`}>
      <button className='flex items-center gap-1 mb-6 text-sm bg-yellow-500 hover:bg-yellow-800 transition-all duration-500 px-2 py-1 rounded-md text-white md:px-4 md:py-2 md:text-lg md:mx-auto'>
        <span>
          <FaPlus size={14} style={{ color: 'white', fontWeight: 'bold' }} />
        </span>
        Add New
      </button>
    </Link>
  ) : null;

  return content;
};

export default ButtonAddNew;
