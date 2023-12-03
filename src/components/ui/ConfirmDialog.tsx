'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closeConfirmDialog } from '@/store/slices/confirmDialogSlice';

const ConfirmDialog = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.confirmDialog.isOpen);
  const idRecordToDelete = useSelector(
    (state: RootState) => state.confirmDialog.idRecordToDelete
  );
  const deleteRecordFunction = useSelector(
    (state: RootState) => state.confirmDialog.deleteRecord?.deleteFunction
  );

  const handleConfirm = async () => {
    if (deleteRecordFunction && idRecordToDelete) {
      await deleteRecordFunction(idRecordToDelete);
      router.refresh();
    }
    dispatch(closeConfirmDialog());
  };

  return (
    <>
      {isOpen && (
        <div className='min-h-screen flex items-center justify-center'>
          <div
            onClick={() => dispatch(closeConfirmDialog())}
            className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className='bg-white p-4 max-w-md rounded shadow-md text-center max-w-[90%]'
            >
              <p className='text-lg text-gray-600 mb-4 sm:text-xl'>
                Are you sure you want to delete this record?
              </p>
              <div className='flex flex-col sm:flex-row justify-center sm:space-x-4'>
                <button
                  onClick={handleConfirm}
                  className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-2 sm:mb-0 sm:w-auto'
                >
                  Confirm Delete
                </button>
                <button
                  onClick={() => dispatch(closeConfirmDialog())}
                  className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded sm:w-auto'
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;
