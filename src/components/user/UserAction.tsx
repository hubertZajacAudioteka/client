'use client';

import Link from 'next/link';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Endpoint } from '@/types/serverSideRequest';

interface UserActionProps {
  id: string;
}

const UserAction = ({ id }: UserActionProps) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <Link href={`/${Endpoint.Orders}/${id}/edit`}>
        <AiTwotoneEdit />
      </Link>
      <FaTrash className='cursor-pointer' />
    </div>
  );
};

export default UserAction;
