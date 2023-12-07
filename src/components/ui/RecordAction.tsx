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
import { BsFillEyeFill } from 'react-icons/bs';

interface RecordActionProps {
  id: string;
  endpoint: Endpoint;
}

const RecordAction = ({ id, endpoint }: RecordActionProps) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const isEditorRole = loggedUser?.role?.name !== 'client';
  const isNotProductEndpoint = endpoint !== Endpoint.Products;

  const removeProduct = () => {
    dispatch(setRecordToDelete({ id, endpoint }));
    dispatch(openConfirmDialog());
  };

  const previewLink = (
    <Link href={`/${endpoint}/${id}`}>
      <BsFillEyeFill />
    </Link>
  );

  const content = (
    <div className='flex justify-center items-center gap-2'>
      {isEditorRole && isNotProductEndpoint && previewLink}
      <Link href={`/${Endpoint.Products}/${id}/edit`}>
        <AiTwotoneEdit size={22} />
      </Link>
      {isEditorRole && (
        <FaTrash className='cursor-pointer' onClick={removeProduct} />
      )}
    </div>
  );

  return content;
};

export default RecordAction;
