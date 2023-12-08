import { getRecordById } from '@/actions/actions';
import { Endpoint } from '@/types/action';
import SingleProduct from '@/components/product/SingleProduct';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await getRecordById(Endpoint.Products, params.id);

  return <SingleProduct product={product} isReadOnly={false} />;
};

export default ProductPage;
