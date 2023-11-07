'use client';

import React from 'react';
import { RootState } from '@/store';
import { useDispatch, useSelector } from 'react-redux';
import { AiTwotoneEdit } from 'react-icons/ai';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import { useDeleteProductMutation } from '@/store/apis/productApi';
import {
  openConfirmDialog,
  setDeleteFunction,
  setIdRecordToDelete,
} from '@/store/slices/confirmDialogSlice';

interface ProductActionProps {
  id: string;
}

const ProductAction = ({ id }: ProductActionProps) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const [deleteProduct] = useDeleteProductMutation();

  const removeProduct = () => {
    dispatch(setIdRecordToDelete(id));
    dispatch(
      setDeleteFunction({
        deleteFunction: deleteProduct,
      })
    );
    dispatch(openConfirmDialog());
  };

  const content =
    loggedUser && loggedUser?.role?.name !== 'client' ? (
      <div className='flex justify-center items-center gap-2'>
        <Link href={`/products/${id}/edit`}>
          <AiTwotoneEdit size={22} />
        </Link>
        <FaTrash className='cursor-pointer' onClick={removeProduct} />
      </div>
    ) : null;

  return content;
};

export default ProductAction;
