import { getCategories, getProductById } from '@/actions/product';
import FormEditProduct from '@/components/product/FormEditProduct';

const EditProductPage = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const categories = await getCategories();
  const product = await getProductById(params.id);
  return (
    <div>
      <FormEditProduct categories={categories} product={product} />
    </div>
  );
};

export default EditProductPage;
