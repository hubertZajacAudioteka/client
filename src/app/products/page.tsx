import Link from 'next/link';
import ButtonAddNew from '@/components/product/ButtonAddNew';
import Pagination from '@/components/ui/Pagination';
import ProductCard from '@/components/product/ProductCard';
import { getAllRecords, getRecordsByPageAction } from '@/actions/actions';
import {
  Endpoint,
  GetProductsByPageParams,
  SortDirection,
  SortParamProduct,
} from '@/types/serverSideRequest';
import { getHref } from '@/utlis/getHref';
import { CategoryName } from '@/types/product';
import { getClassnamesForFilter } from '@/utlis/getClassnamesForFilter';
import { FilterType } from '@/types/filter';

const ProductsPage = async (params: {
  searchParams: GetProductsByPageParams;
}) => {
  const productsByPagePromise = getRecordsByPageAction(Endpoint.Products, {
    page: params.searchParams.page,
    category: params.searchParams.category,
    sortDirection: params.searchParams.sortDirection,
    sortParam: params.searchParams.sortParam,
  });
  const categoriesPromise = getAllRecords(Endpoint.Categories);
  const [productsByPage, categories] = await Promise.all([
    productsByPagePromise,
    categoriesPromise,
  ]);

  const pageParams = params.searchParams;
  const { page, ...filterParams } = params.searchParams;

  return (
    <>
      <div className='flex gap-4'>
        <div className='flex flex-col fixed top-1/5 right-2 w-[28%] md:pl-10'>
          <ButtonAddNew endpoint={Endpoint.Products} />
          <h3 className='font-semibold text-large mb-3 md:text-xl md:mb-5 xl:text-2xl xl:font-bold'>
            Category
          </h3>
          <Link
            className={`text-sm mb-2 capitalize ${
              !pageParams.category && 'font-bold'
            } md:text-base xl:text-lg`}
            href={getHref(Endpoint.Products, {
              ...pageParams,
              category: CategoryName.All,
            })}
          >
            All
          </Link>
          {categories.map((category) => (
            <Link
              key={category.id}
              href={getHref(Endpoint.Products, {
                ...pageParams,
                category: category.name,
              })}
              className={getClassnamesForFilter(
                { type: FilterType.Category, name: category.name },
                pageParams
              )}
            >
              {category.name}
            </Link>
          ))}
          <h3 className='font-semibold text-large my-3 md:text-xl md:my-5 xl:text-2xl xl:font-bold'>
            Sort by
          </h3>
          <Link
            href={getHref(Endpoint.Products, {
              ...pageParams,
              sortParam: SortParamProduct.Price,
              sortDirection: SortDirection.Ascending,
            })}
            className={getClassnamesForFilter(
              {
                type: FilterType.Filter,
                sortParam: SortParamProduct.Price,
                sortDirection: SortDirection.Ascending,
              },
              pageParams
            )}
          >
            Price ascending
          </Link>
          <Link
            href={getHref(Endpoint.Products, {
              ...pageParams,
              sortParam: SortParamProduct.Price,
              sortDirection: SortDirection.Descending,
            })}
            className={getClassnamesForFilter(
              {
                type: FilterType.Filter,
                sortParam: SortParamProduct.Price,
                sortDirection: SortDirection.Descending,
              },
              pageParams
            )}
          >
            Price descending
          </Link>
          <Link
            href={getHref(Endpoint.Products, {
              ...pageParams,
              sortParam: SortParamProduct.Name,
              sortDirection: SortDirection.Ascending,
            })}
            className={getClassnamesForFilter(
              {
                type: FilterType.Filter,
                sortParam: SortParamProduct.Name,
                sortDirection: SortDirection.Ascending,
              },
              pageParams
            )}
          >
            Product name ascending
          </Link>
          <Link
            href={getHref(Endpoint.Products, {
              ...pageParams,
              sortParam: SortParamProduct.Name,
              sortDirection: SortDirection.Descending,
            })}
            className={getClassnamesForFilter(
              {
                type: FilterType.Filter,
                sortParam: SortParamProduct.Name,
                sortDirection: SortDirection.Descending,
              },
              pageParams
            )}
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
        queryParams={filterParams}
      />
    </>
  );
};

export default ProductsPage;
