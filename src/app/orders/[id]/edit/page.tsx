import { getRecordById } from '@/actions/actions';
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
      <h1>Edit</h1>
    </>
  );
};

export default EditOrderPage;
