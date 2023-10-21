'use client';

import React from 'react';
import { Product } from '@/types/products';

interface ButtonBuyProps {
  product: Product;
}

const ButtonBuy = ({ product }: ButtonBuyProps) => {
  return <button>Add To Cart</button>;
};

export default ButtonBuy;
