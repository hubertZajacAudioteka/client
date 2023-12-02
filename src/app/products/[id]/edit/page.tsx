import { getAllRecords, getRecordById } from '@/actions/actions';
import FormEditProduct from '@/components/product/FormEditProduct';
import { Endpoint } from '@/types/serverSideRequest';

const EditProductPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const categoriesPromise = getAllRecords(Endpoint.Categories);
  const productPromise = getRecordById(Endpoint.Products, params.id);

  const [categories, product] = await Promise.all([
    categoriesPromise,
    productPromise,
  ]);

  return (
    <div className='m-auto max-w-xl'>
      <FormEditProduct categories={categories} product={product} />
    </div>
  );
};

export default EditProductPage;
