import { getProducts } from '@/actions/product';
import React from 'react';

const ProductsPage = async () => {
  const data = await getProducts(1);
  console.log('DATA', data);
  return <div>ProductsPage</div>;
};

export default ProductsPage;
