'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/store';
import { closePopup } from '@/store/slices/popupSlice';

const MessagePopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.popup.isOpen);
  const message = useSelector((state: RootState) => state.popup.message);

  return (
    <>
      {isOpen && (
        <div className='min-h-screen flex items-center justify-center'>
          <div
            onClick={() => dispatch(closePopup())}
            className='fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-50'
          >
            <div
              onClick={(e) => e.stopPropagation()}
              className='bg-white p-4 max-w-md rounded shadow-md text-center'
            >
              <h2 className='text-lg font-semibold'>{message}</h2>
              <button
                onClick={() => dispatch(closePopup())}
                className='mt-4 bg-slate-500 hover:bg-slate-500 text-white font-bold py-2 px-4 rounded'
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MessagePopup;
