import { getCategories, getProducts } from '@/actions/product';
import ProductCard from '@/components/product/ProductCard';
import Pagination from '@/components/ui/Pagination';
import Link from 'next/link';
import { Category, GetProductsResponse } from '@/types/product';
import ButtonAddNew from '@/components/product/ButtonAddNew';

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    category?: string;
    sortParam?: string;
    direction?: string;
  };
}) => {
  const productsData: GetProductsResponse = await getProducts(
    searchParams.page,
    searchParams.category ?? '',
    searchParams.sortParam ?? '',
    searchParams.direction ?? ''
  );
  const categories: Category[] = await getCategories();

  return (
    <>
      <div className='flex gap-4'>
        <div className=' flex flex-col fixed top-1/5 right-28'>
          <ButtonAddNew />
          <h3 className='font-semibold text-large mb-3'>Category</h3>
          <Link
            className={`text-sm mb-2 capitalize ${
              !searchParams.category && 'font-bold'
            }`}
            href={`/products?page=1${
              searchParams.sortParam
                ? `&sortParam=${searchParams.sortParam}&direction=${searchParams.direction}`
                : ''
            }`}
          >
            All categories
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?page=1&category=${category.name}${
                searchParams.sortParam
                  ? `&sortParam=${searchParams.sortParam}&direction=${searchParams.direction}`
                  : ''
              }`}
              className={`text-sm mb-2 capitalize ${
                searchParams.category === category.name && 'font-bold'
              }`}
            >
              {category.name}
            </Link>
          ))}
          <h3 className='font-semibold text-large mb-3'>Sort by</h3>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=price&direction=asc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'price' &&
              searchParams.direction === 'asc' &&
              'font-bold'
            }`}
          >
            Price ascending
          </Link>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=price&direction=desc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'price' &&
              searchParams.direction === 'desc' &&
              'font-bold'
            }`}
          >
            Price descending
          </Link>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=title&direction=asc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'title' &&
              searchParams.direction === 'asc' &&
              'font-bold'
            }`}
          >
            Product name ascending
          </Link>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=title&direction=desc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'title' &&
              searchParams.direction === 'desc' &&
              'font-bold'
            }`}
          >
            Product name descending
          </Link>
        </div>
        <div>
          {productsData.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Pagination
        pageAmount={Math.ceil(
          productsData.meta.total / productsData?.meta.per_page
        )}
        queryParams={{
          category: searchParams.category as string,
          sortParam: searchParams.sortParam as string,
          direction: searchParams.direction as string,
        }}
      />
    </>
  );
};

export default ProductsPage;
