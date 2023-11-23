import Link from 'next/link';
import { getCategories } from '@/actions/product';
import { Category, CategoryName, GetProductsByPageData } from '@/types/product';
import ButtonAddNew from '@/components/product/ButtonAddNew';
import Pagination from '@/components/ui/Pagination';
import ProductCard from '@/components/product/ProductCard';
import { getRecordsByPageAction } from '@/actions/base';
import { Endpoint, SortParamProduct } from '@/types/serverSideRequest';
import { SortDirection } from '../../types/serverSideRequest';

const ProductsPage = async ({
  searchParams,
}: {
  searchParams: {
    page: number;
    category?: CategoryName;
    sortParam?: SortParamProduct;
    sortDirection?: SortDirection;
  };
}) => {
  // const productsDataPromise = getProductsByPage(
  //   searchParams.page,
  //   searchParams.category ?? '',
  //   searchParams.sortParam ?? '',
  //   searchParams.direction ?? ''
  // );
  const productsByPagePromise: Promise<GetProductsByPageData> =
    getRecordsByPageAction(Endpoint.Products, {
      page: searchParams.page,
      category: searchParams.category,
      sortDirection: searchParams.sortDirection,
      sortParam: searchParams.sortParam,
    });
  const categoriesPromise = getCategories();

  const [productsByPage, categories] = await Promise.all([
    productsByPagePromise,
    categoriesPromise,
  ]);

  console.log('PRODUCTS', productsByPage);

  return (
    <>
      <div className='flex gap-4'>
        <div className='flex flex-col fixed top-1/5 right-2 w-[28%] md:pl-10'>
          <ButtonAddNew />
          <h3 className='font-semibold text-large mb-3 md:text-xl md:mb-5 xl:text-2xl xl:font-bold'>
            Category
          </h3>
          <Link
            className={`text-sm mb-2 capitalize ${
              !searchParams.category && 'font-bold'
            } md:text-base xl:text-lg`}
            href={`/products?page=1${
              searchParams.sortParam
                ? `&sortParam=${searchParams.sortParam}&direction=${searchParams.sortDirection}`
                : ''
            }`}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?page=1&category=${category.name}${
                searchParams.sortParam
                  ? `&sortParam=${searchParams.sortParam}&direction=${searchParams.sortDirection}`
                  : ''
              }`}
              className={`text-sm mb-2 capitalize ${
                searchParams.category === category.name && 'font-bold'
              } md:text-base xl:text-lg`}
            >
              {category.name}
            </Link>
          ))}
          <h3 className='font-semibold text-large my-3 md:text-xl md:my-5 xl:text-2xl xl:font-bold'>
            Sort by
          </h3>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=price&sortDirection=asc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'price' &&
              searchParams.sortDirection === 'asc' &&
              'font-bold'
            } md:text-base xl:text-lg`}
          >
            Price ascending
          </Link>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=price&sortDirection=desc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'price' &&
              searchParams.sortDirection === 'desc' &&
              'font-bold'
            } xl:text-lg`}
          >
            Price descending
          </Link>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=title&sortDirection=asc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'title' &&
              searchParams.sortDirection === 'asc' &&
              'font-bold'
            } xl:text-lg`}
          >
            Product name ascending
          </Link>
          <Link
            href={`/products?page=1${
              searchParams.category ? `&category=${searchParams.category}` : ''
            }&sortParam=title&sortDirection=desc`}
            className={`text-sm mb-2 capitalize ${
              searchParams.sortParam === 'title' &&
              searchParams.sortDirection === 'desc' &&
              'font-bold'
            } xl:text-lg`}
          >
            Product name descending
          </Link>
        </div>
        <div className='w-2/3 md:grid grid-cols-2 gap-4 xl:grid-cols-3'>
          {productsByPage.data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <Pagination
        pageAmount={Math.ceil(
          productsByPage.meta.total / productsByPage?.meta.per_page
        )}
        queryParams={{
          category: searchParams.category as string,
          sortParam: searchParams.sortParam as string,
          direction: searchParams.sortDirection as string,
        }}
      />
    </>
  );
};

export default ProductsPage;
