import { getProducts } from '@/actions/product';
import ButtonBuy from '@/components/product/ButtonBuy';
import { GetProductsResponse } from '@/types/product';
import Image from 'next/image';

const HomePage = async () => {
  const newestProducts: GetProductsResponse = await getProducts(1, 'newest');
  return (
    <section>
      <div className='flex justify-center items-center'>
        <Image src='/home.jpg' width={600} height={300} alt='home' />
      </div>
      <div>
        <h2 className='text-center text-2xl font-bold mb-5'>
          Check our newest products
        </h2>
        <div className='flex flex-col gap-5 items-center md:flex-row'>
          {newestProducts?.data.slice(0, 3).map((product) => (
            <div key={product.id}>
              <div className='h-60 border-red-100 border-2'>
                <Image
                  src={
                    product.image.startsWith('images')
                      ? `http://127.0.0.1:8000/storage/${product.image}`
                      : product.image
                  }
                  alt={product.title}
                  width={600}
                  height={500}
                  className='w-full h-full'
                />
              </div>
              <div>
                <h2 className='text-lg font-bold capitalize'>
                  {product.title}
                </h2>
                <div>
                  <h4>{product.price}</h4>
                  <h3>{product.category.name}</h3>
                </div>
                <p>{product.description}</p>
                <ButtonBuy product={product} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
