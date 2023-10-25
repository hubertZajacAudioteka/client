'use client';

import React from 'react';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import { AiTwotoneEdit } from 'react-icons/ai';
import Link from 'next/link';
import { FaTrash } from 'react-icons/fa';
import { useDeleteProductMutation } from '@/store/apis/productApi';

interface ProductActionProps {
  id: string;
}

const ProductAction = ({ id }: ProductActionProps) => {
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const [deleteProduct] = useDeleteProductMutation();

  const removeProduct = async () => {
    const res = await deleteProduct(id);
    console.log(res);
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
