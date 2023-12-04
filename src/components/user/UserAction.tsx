'use client';

import Link from 'next/link';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Endpoint } from '@/types/serverSideRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import {
  openConfirmDialog,
  setRecordToDelete,
  TypeRecordToDelete,
} from '@/store/slices/confirmDialogSlice';

interface UserActionProps {
  id: string;
}

const UserAction = ({ id }: UserActionProps) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);

  const removeUser = () => {
    dispatch(setRecordToDelete({ id, type: TypeRecordToDelete.User }));
    dispatch(openConfirmDialog());
  };

  const content =
    loggedUser && loggedUser?.role?.name !== 'client' ? (
      <div className='flex justify-center items-center gap-2'>
        <Link href={`/${Endpoint.Users}/${id}/edit`}>
          <AiTwotoneEdit size={22} />
        </Link>
        <FaTrash className='cursor-pointer' onClick={removeUser} />
      </div>
    ) : null;

  return content;
};

export default UserAction;
