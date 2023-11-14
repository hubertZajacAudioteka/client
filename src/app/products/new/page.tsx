import { getCategories } from '@/actions/product';
import { Category } from '@/types/product';
import FormAddProduct from '@/components/product/FormAddProduct';

const AddNewProductPage = async () => {
  const categories: Category[] = await getCategories();
  return (
    <div>
      <FormAddProduct categories={categories} />
    </div>
  );
};

export default AddNewProductPage;
