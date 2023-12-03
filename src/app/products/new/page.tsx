import { Category } from '@/types/product';
import FormAddProduct from '@/components/product/FormAddProduct';
import { getAllRecords } from '@/actions/actions';
import { Endpoint } from '@/types/serverSideRequest';

const AddNewProductPage = async () => {
  const categories = await getAllRecords(Endpoint.Categories);

  return (
    <div className='m-auto max-w-xl'>
      <FormAddProduct categories={categories} />
    </div>
  );
};

export default AddNewProductPage;
