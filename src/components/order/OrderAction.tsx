'use client';

import Link from 'next/link';
import React from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';

interface OrderActionProps {
  id: string;
}

const OrderAction = ({ id }: OrderActionProps) => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <Link href={`/orders/${id}`}>
        <BsFillEyeFill />
      </Link>
      <Link href={`/orders/${id}/edit`}>
        <AiTwotoneEdit />
      </Link>
      <FaTrash className='cursor-pointer' />
    </div>
  );
};

export default OrderAction;
