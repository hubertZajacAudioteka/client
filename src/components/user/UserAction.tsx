'use client';

import Link from 'next/link';
import React from 'react';
import { FaTrash } from 'react-icons/fa';
import { AiTwotoneEdit } from 'react-icons/ai';
import { Endpoint } from '@/types/serverSideRequest';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { useDeleteUserMutation } from '@/store/apis/userApi';
import {
  openConfirmDialog,
  setDeleteFunction,
  setIdRecordToDelete,
} from '@/store/slices/confirmDialogSlice';

interface UserActionProps {
  id: string;
}

const UserAction = ({ id }: UserActionProps) => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state: RootState) => state.user.loggedUser);
  const [deleteUser] = useDeleteUserMutation();

  const removeUser = () => {
    dispatch(setIdRecordToDelete(id));
    dispatch(
      setDeleteFunction({
        deleteFunction: deleteUser,
      })
    );
    dispatch(openConfirmDialog());
  };

  const content =
    loggedUser && loggedUser?.role?.name !== 'client' ? (
      <div className='flex justify-center items-center gap-2'>
        <Link href={`/${Endpoint.Products}/${id}/edit`}>
          <AiTwotoneEdit size={22} />
        </Link>
        <FaTrash className='cursor-pointer' onClick={removeUser} />
      </div>
    ) : null;

  return content;
};

export default UserAction;
