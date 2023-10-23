import { getProduct } from '@/actions/product';
import { Product } from '@/types/product';
import Image from 'next/image';

const ProductPage = async ({ params }: { params: { id: string } }) => {
  const product: Product = await getProduct(params.id);

  return (
    <div>
      <h2>{product.title}</h2>
      <h3>${product.price.toFixed(2)}</h3>
      <div className='w-40 h-40'>
        <Image
          src={product.image}
          width={200}
          height={200}
          alt={product.title}
        />
      </div>
      <p>{product.description}</p>
      <p>{product.category.name}</p>
    </div>
  );
};

export default ProductPage;
