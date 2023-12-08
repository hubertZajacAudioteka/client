import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';
import ButtonBuy from './ButtonBuy';
import RecordAction from '../ui/RecordAction';
import { Endpoint } from '@/types/action';
import { getImageSrc } from '@/utlis/getImageSrc';
import { getCategoryBgColor } from '@/utlis/getCategoryBgColor';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const bgColor = getCategoryBgColor(product.category.name);

  return (
    <div className='flex flex-col w-full mb-10 shadow-xl rounded-xl'>
      <div className='relative h-52 mb-3 z-auto sm:h-64'>
        <Image
          src={getImageSrc(product.image)}
          alt={product.title}
          fill
          className='rounded-tl-xl rounded-tr-xl z-auto'
        />
      </div>
      <div className='px-2 py-4'>
        <h2 className='font-semibold text-lg capitalize mb-3'>
          {product.title}
        </h2>

        <div className='flex justify-between items-center mb-2'>
          <div className={`${bgColor} rounded-md p-2 text-white`}>
            <p className='text-sm'>{product.category.name}</p>
          </div>
          <RecordAction id={product.id} endpoint={Endpoint.Products} />
        </div>
        <h3 className='text-md font-semibold mb-1'>
          ${product.price.toFixed(2)}
        </h3>

        <div className='flex justify-between items-center'>
          <Link
            className='text-blue-900 font-semibold text-sm'
            href={`/products/${product.id}`}
          >
            View details
          </Link>
          <ButtonBuy product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
