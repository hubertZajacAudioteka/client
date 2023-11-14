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
    <div>
      <div className='flex justify-between'>
        <h2 className='mb-2'>Your order {orderValue.toFixed(2)}$</h2>
        <button
          onClick={() => router.push('/orders/checkout')}
          className='border border-solid border-blue-600 p-4'
        >
          Checkout
        </button>
      </div>
      <div>
        {orderedProducts.map((product) => (
          <OrderedProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default NewOrderPage;
