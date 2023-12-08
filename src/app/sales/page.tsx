import { getAllRecords } from '@/actions/actions';
import SalesChart from '@/components/sales/salesChart';
import { Endpoint } from '@/types/action';
import React from 'react';

const SalesPage = async () => {
  const sales = await getAllRecords(Endpoint.Sales);
  return (
    <div>
      <h2>Last year sales</h2>
      <SalesChart sales={sales} />
    </div>
  );
};

export default SalesPage;
