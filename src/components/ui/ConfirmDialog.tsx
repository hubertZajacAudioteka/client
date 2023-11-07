'use client';
import { RootState } from '@/store';
import { productApi } from '@/store/apis/productApi';
import { closeConfirmDialog } from '@/store/slices/confirmDialogSlice';
import { revalidatePath } from 'next/cache';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

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
              className='bg-white p-4 max-w-md rounded shadow-md text-center'
            >
              <h2 className='text-lg font-semibold'>
                Are you sure you want to delete this element?
              </h2>
              <button
                onClick={handleConfirm}
                className='mt-4 mx-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
              >
                OK
              </button>
              <button
                onClick={() => dispatch(closeConfirmDialog())}
                className='mt-4 mx-4 bg-slate-500 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded'
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ConfirmDialog;
