import { getRecordById } from '@/actions/actions';
import EditOrderCard from '@/components/order/EditOrderCard';
import { RootState } from '@/store';
import { Endpoint } from '@/types/serverSideRequest';
import React from 'react';

const EditOrderPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const order = await getRecordById(Endpoint.Orders, params.id);
  return (
    <>
      <EditOrderCard order={order} />
    </>
  );
};

export default EditOrderPage;
