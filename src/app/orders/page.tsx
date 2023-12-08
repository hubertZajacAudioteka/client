import { formatDate } from '@/utlis/formatDate';
import Pagination from '@/components/ui/Pagination';
import { getRecordsByPageAction } from '@/actions/actions';
import { Endpoint, GetOrdersByPageParams } from '@/types/action';
import OrdersFilters from '@/components/order/OrdersFilters';
import RecordAction from '@/components/ui/RecordAction';

const OrdersPage = async ({
  searchParams,
}: {
  searchParams: GetOrdersByPageParams;
}) => {
  const ordersData = await getRecordsByPageAction(Endpoint.Orders, {
    page: searchParams.page,
    sortParam: searchParams.sortParam,
    sortDirection: searchParams.sortDirection,
    search: searchParams.search,
  });

  const { page, ...filterParams } = searchParams;

  return (
    <div>
      <OrdersFilters searchParams={searchParams} />
      <table className='min-w-full table-auto'>
        <thead>
          <tr>
            <th className='px-4 py-2 text-center'>No</th>
            <th className='px-4 py-2 text-center'>Date</th>
            <th className='px-4 py-2 text-center'>Value</th>
            <th className='px-4 py-2 text-center'>User</th>
            <th className='px-4 py-2 text-center'>Email</th>
            <th className='px-4 py-2 text-center'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {ordersData.data.map((order, i) => (
            <tr key={order.id}>
              <td className='border px-4 py-2 text-center'>{i + 1}</td>
              <td className='border px-4 py-2 text-center'>
                {formatDate(order.created_at)}
              </td>
              <td className='border px-4 py-2 text-center'>{order.value}</td>
              <td className='border px-4 py-2 text-center'>
                {order.user.first_name} {order.user.last_name}
              </td>
              <td className='border px-4 py-2 text-center'>
                {order.user.email}
              </td>
              <td className='border px-4 py-2 text-center'>
                <RecordAction id={order.id} endpoint={Endpoint.Orders} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        pageAmount={Math.ceil(
          ordersData.meta.total / ordersData?.meta.per_page
        )}
        queryParams={filterParams}
      />
    </div>
  );
};

export default OrdersPage;
