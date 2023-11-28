import Image from 'next/image';
import { getRecordById } from '@/actions/actions';
import { Endpoint } from '@/types/serverSideRequest';
import { STORAGE } from '@/constants/api';
import ProductAction from '@/components/product/ProductAction';
import ButtonBuy from '@/components/product/ButtonBuy';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product = await getRecordById(Endpoint.Products, params.id);

  const imageSrc = product.image.startsWith('images')
    ? `${STORAGE}/${product.image}`
    : product.image;

  const bgColor =
    product.category.name === 'newest'
      ? 'bg-blue-800'
      : product.category.name === 'regular'
      ? 'bg-purple-500'
      : 'bg-lime-400';

  return (
    <div className='max-w-xl mx-auto'>
      <div className='w-full h-52 mb-5 md:h-72'>
        <Image src={imageSrc} width={200} height={200} alt={product.title} />
      </div>
      <div>
        <h2 className='text-xl font-semibold text-center capitalize mb-3'>
          {product.title}
        </h2>
        <div className='flex justify-end gap-3 items-center mb-4'>
          <h3 className='font-semibold'>${product.price.toFixed(2)}</h3>
          <div className={`${bgColor} rounded-md p-2 text-white`}>
            <p>{product.category.name}</p>
          </div>
        </div>
        <p className='text-base text-center mb-3'>{product.description}</p>
        <div className='flex justify-end gap-4'>
          <ProductAction id={product.id} />
          <ButtonBuy product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
