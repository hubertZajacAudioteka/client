'use client';
import { RootState } from '@/store';
import { closePopup } from '@/store/slices/popupSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

const MessagePopup = () => {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.popup.isOpen);
  const message = useSelector((state: RootState) => state.popup.message);
  return (
    <>
      {isOpen && (
        <div>
          <h3>{message}</h3>
          <button onClick={() => dispatch(closePopup())}>Ok</button>
        </div>
      )}
    </>
  );
};

export default MessagePopup;
