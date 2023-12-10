import { STORAGE } from '@/constants/api';
import { Product } from '@/types/product';
import Image from 'next/image';
import React from 'react';
import ButtonBuy from './ButtonBuy';
import RecordAction from '../ui/RecordAction';
import { Endpoint } from '@/types/action';
import { getImageSrc } from '@/utlis/getImageSrc';
import { getCategoryBgColor } from '@/utlis/getCategoryBgColor';

interface SingleProductProps {
  product: Product;
  isReadOnly: boolean;
}

const SingleProduct = ({ product, isReadOnly }: SingleProductProps) => {
  const bgColor = getCategoryBgColor(product.category.name);
  console.log('BG', bgColor);

  return (
    <div className='max-w-xl mx-auto'>
      <div className='w-full h-52 mb-5 md:h-72'>
        <Image
          src={getImageSrc(product.image)}
          width={580}
          height={300}
          alt={product.title}
        />
      </div>
      <div>
        <h2 className='text-xl font-semibold text-center capitalize mb-3'>
          {product.title}
        </h2>
        <div className='flex justify-end gap-3 items-center mb-4'>
          <h3 className='font-semibold'>${product.price.toFixed(2)}</h3>
          <div className={`${bgColor} rounded-md p-2 text-white`}>
            <p>{product.category.name}</p>
          </div>
        </div>
        <p className='text-base text-center mb-3'>{product.description}</p>
        {!isReadOnly && (
          <div className='flex justify-end gap-4'>
            <RecordAction id={product.id} endpoint={Endpoint.Products} />
            <ButtonBuy product={product} />
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleProduct;
