import Image from 'next/image';
import { getProduct } from '@/actions/product';
import { Product } from '@/types/product';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product: Product = await getProduct(params.id);

  const imageSrc = product.image.startsWith('images')
    ? `http://127.0.0.1:8000/storage/${product.image}`
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
