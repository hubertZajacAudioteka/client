'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { RootState } from '@/store';
import {
  openConfirmDialog,
  setRecordToDelete,
} from '@/store/slices/confirmDialogSlice';
import { AiTwotoneEdit } from 'react-icons/ai';
import { FaTrash } from 'react-icons/fa';
import { Endpoint } from '@/types/serverSideRequest';
import { TypeRecordToDelete } from '../../store/slices/confirmDialogSlice';

interface ProductActionProps {
  id: string;
}

const ProductAction = ({ id }: ProductActionProps) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const removeProduct = () => {
    dispatch(setRecordToDelete({ id, type: TypeRecordToDelete.Product }));
    dispatch(openConfirmDialog());
  };

  const content =
    loggedUser && loggedUser?.role?.name !== 'client' ? (
      <div className='flex justify-center items-center gap-2'>
        <Link href={`/${Endpoint.Products}/${id}/edit`}>
          <AiTwotoneEdit size={22} />
        </Link>
        <FaTrash className='cursor-pointer' onClick={removeProduct} />
      </div>
    ) : null;

  return content;
};

export default ProductAction;
