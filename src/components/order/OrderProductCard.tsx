'use client';

import React from 'react';
import { useDispatch } from 'react-redux';
import Image from 'next/image';
import {
  addProductToOrder,
  removeProductFromOrder,
} from '@/store/slices/orderSlice';
import { OrderedProduct } from '@/types/product';
import { BiSolidUpArrow, BiSolidDownArrow } from 'react-icons/bi';

type OrderedProductCardProps = {
  product: OrderedProduct;
};

const OrderedProductCard = ({ product }: OrderedProductCardProps) => {
  const dispatch = useDispatch();
  const imageSrc = product.image.startsWith('images')
    ? `${process.env.NEXT_PUBLIC_STORAGE}/${product.image}`
    : product.image;

  return (
    <div className='flex gap-2'>
      <div className='w-1/3'>
        <Image src={imageSrc} alt={product.title} width={150} height={150} />
      </div>
      <div className='w-full'>
        <div className='mb-3'>
          <h3>{product.title}</h3>
          <p>Price: {product.price}$</p>
        </div>
        <div className='flex justify-between items-center'>
          <div className='flex items-center gap-1'>
            <div>
              <div
                className='cursor-pointer'
                onClick={() =>
                  dispatch(
                    addProductToOrder({
                      id: product.id,
                      category: product.category,
                      description: product.description,
                      image: product.image,
                      price: product.price,
                      title: product.title,
                    })
                  )
                }
              >
                <BiSolidUpArrow />
              </div>
              <div
                className='cursor-pointer'
                onClick={() => dispatch(removeProductFromOrder(product.id))}
              >
                <BiSolidDownArrow />
              </div>
            </div>
            <p>{product.quantity}</p>
          </div>
          <div>
            <h4>{(product.price * product.quantity).toFixed(2)}€</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderedProductCard;
