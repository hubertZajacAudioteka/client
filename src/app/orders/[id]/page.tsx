import { getRecordById } from '@/actions/actions';
import { Endpoint } from '@/types/serverSideRequest';
import { formatDate } from '@/utlis/formatDate';

const OrderPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const order = await getRecordById(Endpoint.Orders, params.id);

  return (
    <div>
      <h3>Order {formatDate(order.created_at)}</h3>
      <div>
        <h4>
          {order.user.first_name} {order.user.last_name}
        </h4>
        <h4>Ordered products:</h4>
        <ul>
          {order.orderItems.map((product) => (
            <li key={product.product.id}>
              <div>
                <h5>
                  {product.product.title} x {product.quantity}
                </h5>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderPage;
