import Image from 'next/image';
import { CategoryName, GetProductsByPageData } from '@/types/product';
import ButtonBuy from '@/components/product/ButtonBuy';
import { getRecordsByPageAction } from '@/actions/actions';
import { Endpoint } from '@/types/action';
import { getImageSrc } from '@/utlis/getImageSrc';
import { getCategoryBgColor } from '@/utlis/getCategoryBgColor';
import { Lobster } from 'next/font/google';

const lobster = Lobster({ weight: '400', subsets: ['latin'] });

const HomePage = async () => {
  const newestProducts: GetProductsByPageData = await getRecordsByPageAction(
    Endpoint.Products,
    { page: 1, category: CategoryName.Newest }
  );

  return (
    <section>
      <h1
        className={`${lobster.className} text-[50px] text-center text-red-600 max-w-[240px] mx-auto tracking-tighter mb-12 md:text-[65px] md:max-w-[300px] md:mb-20`}
      >
        Thank You for Shopping With us!
        <span className='mt-4 block'>(online)</span>
      </h1>
      <div>
        <h2 className='text-center text-2xl font-bold mb-5 lg:text-4xl dark:text-white'>
          Check our newest products
        </h2>
        <div className='flex flex-col gap-5 items-center md:flex-row md:justify-between md:items-start'>
          {newestProducts?.data.slice(0, 3).map((product) => (
            <div
              key={product.id}
              className='w-full h- bg-base-100 shadow-xl rounded-xl xs:w-96'
            >
              <Image
                src={getImageSrc(product.image)}
                alt={product.title}
                width={600}
                height={500}
                className='w-full h-60 bg-cover xs:w-96 rounded-tl-xl rounded-tr-xl'
              />
              <div className='px-3 py-5'>
                <div className='flex justify-between items-center mb-3'>
                  <h2 className='card-title text-lg font-bold capitalize'>
                    {product.title}
                  </h2>
                  <div
                    className={`${getCategoryBgColor(
                      product.category.name
                    )}  rounded-md p-2 text-white`}
                  >
                    <p> {product.category.name}</p>
                  </div>
                </div>
                <p className='mb-3'>{product.description}</p>
                <div className='card-actions flex justify-between items-center'>
                  <h4 className='font-bold'>{product.price.toFixed(2)} €</h4>
                  <ButtonBuy product={product} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePage;
