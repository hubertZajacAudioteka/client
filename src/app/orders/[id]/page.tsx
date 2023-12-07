import { getRecordById } from '@/actions/actions';
import ProductCard from '@/components/product/ProductCard';
import SingleProduct from '@/components/product/SingleProduct';
import { Endpoint } from '@/types/serverSideRequest';
import { formatDate } from '@/utlis/formatDate';
import Image from 'next/image';

const OrderPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const order = await getRecordById(Endpoint.Orders, params.id);

  return (
    <div className='max-w-xl mx-auto'>
      <h3 className='text-center font-semibold text-lg mb-3'>
        Order {formatDate(order.created_at)}
      </h3>
      <div>
        <h4 className='capitalize text-base mb-2'>
          <span className='font-semibold capitalize mr-1'>Purchaser:</span>
          {order.user.first_name} {order.user.last_name}
        </h4>
        <h4 className='capitalize text-base mb-2'>
          <span className='font-semibold capitalize mr-1'>Order Value:</span>
          {order.value}
        </h4>
        <h4 className='capitalize text-base mb-2 font-semibold'>
          Ordered products:
        </h4>
        <ul>
          {order.order_items.map((orderItem) => (
            <li key={orderItem.product.id} className='mb-6 md:mb-10'>
              <SingleProduct product={orderItem.product} isReadOnly={true} />
              <h4 className='capitalize text-base mb-2'>
                <span className='font-semibold capitalize mr-1'>Quantity:</span>
                {orderItem.quantity} (€
                {(orderItem.quantity * orderItem.product.price).toFixed(2)})
              </h4>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
