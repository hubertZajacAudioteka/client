import { getCategories } from '@/actions/product';
import FormAddProduct from '@/components/product/FormAddProduct';
import { Category } from '@/types/product';

const AddNewProductPage = async () => {
  const categories: Category[] = await getCategories();
  return (
    <div>
      <FormAddProduct categories={categories} />
    </div>
  );
};

export default AddNewProductPage;
