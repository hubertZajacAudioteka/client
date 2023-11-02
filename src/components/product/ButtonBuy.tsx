'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import { addProductToOrder } from '@/store/slices/orderSlice';
import { Product } from '@/types/product';

type ButtonBuyProps = {
  product: Product;
};

const ButtonBuy = ({ product }: ButtonBuyProps) => {
  const dispatch = useDispatch();
  return (
    <button onClick={() => dispatch(addProductToOrder(product))} className=''>
      Add To Cart
    </button>
  );
};

export default ButtonBuy;
