import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import ButtonBuy from './ButtonBuy';
import ProductAction from './ProductAction';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const imageSrc = product.image.startsWith('images')
    ? `http://127.0.0.1:8000/storage/${product.image}`
    : product.image;
  return (
    <div className='flex flex-col w-full mb-5'>
      <div className='relative h-40 mb-3'>
        <Image src={imageSrc} alt={product.title} fill />
      </div>
      <div>
        <h4 className='font-semibold text-sm capitalize mb-1'>
          {product.title}
        </h4>
        <h3 className='text-base font-bold mb-1'>
          ${product.price.toFixed(2)}
        </h3>
        <div className='flex justify-between items-center'>
          <h3 className='text-base font-bold mb-1'>{product.category.name}</h3>
          <ProductAction id={product.id} />
        </div>

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
