'use client';

import Link from 'next/link';
import React from 'react';
import { BsFillEyeFill } from 'react-icons/bs';
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Endpoint } from '@/types/serverSideRequest';
import { useDispatch } from 'react-redux';
import {
  openConfirmDialog,
  setRecordToDelete,
  TypeRecordToDelete,
} from '@/store/slices/confirmDialogSlice';

interface OrderActionProps {
  id: string;
}

const OrderAction = ({ id }: OrderActionProps) => {
  const dispatch = useDispatch();
  const removeOrder = () => {
    dispatch(setRecordToDelete({ id, type: TypeRecordToDelete.Order }));
    dispatch(openConfirmDialog());
  };

  return (
    <div className='flex justify-center items-center gap-2'>
      <Link href={`/${Endpoint.Orders}/${id}`}>
        <BsFillEyeFill />
      </Link>
      <Link href={`/${Endpoint.Orders}/${id}/edit`}>
        <AiTwotoneEdit />
      </Link>
      <FaTrash className='cursor-pointer' onClick={removeOrder} />
    </div>
  );
};

export default OrderAction;
