import { Product } from '@/types/products';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ButtonBuy from './ButtonBuy';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='flex flex-col w-full mb-5'>
      <div className='relative h-40 mb-3'>
        <Image src={product.image} alt={product.title} fill />
      </div>
      <div>
        <h4 className='font-semibold text-sm capitalize mb-1'>
          {product.title}
        </h4>
        <h3 className='text-base font-bold mb-1'>
          ${product.price.toFixed(2)}
        </h3>
        <h3 className='text-base font-bold mb-1'>{product.category.name}</h3>
        <div>
          <Link
            className='text-blue-900 font-semibold'
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
