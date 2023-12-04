'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { addProductToOrder } from '@/store/slices/createOrderSlice';
import { Product } from '@/types/product';

interface ButtonBuyProps {
  product: Product;
}

const ButtonBuy = ({ product }: ButtonBuyProps) => {
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(addProductToOrder(product))}
      className='bg-red-500 text-slate-100 px-2 py-1 rounded-lg text-md hover:bg-red-300 hover:text-slate-600 transition-all duration-300'
    >
      Add To Cart
    </button>
  );
};

export default ButtonBuy;
