import { getRecordById } from '@/actions/actions';
import { getCategories, getProductById } from '@/actions/product';
import FormEditProduct from '@/components/product/FormEditProduct';
import { Endpoint } from '@/types/serverSideRequest';

const EditProductPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const categoriesPromise = getCategories();
  const productPromise = getRecordById(Endpoint.Products, params.id);

  const [categories, product] = await Promise.all([
    categoriesPromise,
    productPromise,
  ]);

  return (
    <div>
      <FormEditProduct categories={categories} product={product} />
    </div>
  );
};

export default EditProductPage;
