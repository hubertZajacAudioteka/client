'use client';

import OrderedProductCard from '@/components/order/OrderProductCard';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

const NewOrderPage = () => {
  const router = useRouter();
  const orderedProducts = useSelector(
    (state: RootState) => state.order.orderedProducts
  );
  const orderValue = useSelector((state: RootState) => state.order.value);

  return (
    <div className='max-w-xl mx-auto'>
      <div className='flex justify-between items-center mb-8'>
        <h2 className='mb-2'>
          <span className='font-semibold mr-1'>Order value:</span>
          {orderValue.toFixed(2)}€
        </h2>
        <button
          onClick={() => router.push('/orders/checkout')}
          className='bg-yellow-500 py-2 px-4 rounded-md hover:bg-yellow-800 transition-all duration-500 text-white mb-2 sm:text-lg'
        >
          Checkout
        </button>
      </div>
      <div>
        <ul>
          {orderedProducts.map((product) => (
            <li key={product.id} className='mb-4'>
              <OrderedProductCard product={product} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default NewOrderPage;
