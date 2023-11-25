import Image from 'next/image';
import { getRecordById } from '@/actions/actions';
import { Endpoint } from '@/types/serverSideRequest';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await getRecordById(Endpoint.Products, params.id);

  const imageSrc = product.image.startsWith('images')
    ? `${process.env.NEXT_PUBLIC_STORAGE}/${product.image}`
    : product.image;

  return (
    <div>
      <h2>{product.title}</h2>
      <h3>${product.price.toFixed(2)}</h3>
      <div className='w-40 h-40'>
        <Image src={imageSrc} width={200} height={200} alt={product.title} />
      </div>
      <p>{product.description}</p>
      <p>{product.category.name}</p>
    </div>
  );
};

export default ProductPage;
