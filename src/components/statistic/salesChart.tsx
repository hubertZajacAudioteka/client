'use client';

import { Sale } from '@/types/statistic';
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface SalesChartProps {
  sales: Sale[];
}

const SalesChart = ({ sales }: SalesChartProps) => {
  return (
    <div className='min-h-screen'>
      <ResponsiveContainer width='100%' height={400}>
        <LineChart
          width={500}
          height={400}
          data={sales}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='month' />
          <YAxis domain={[0, 10000]} />
          <Tooltip />
          <Line
            type='monotone'
            dataKey='value'
            stroke='#8884d8'
            fill='#8884d8'
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
