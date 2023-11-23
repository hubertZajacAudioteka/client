import { CategoryName } from './product';

export enum Endpoint {
  Products = 'products',
  Orders = 'orders',
  Users = 'users',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum SortParamProduct {
  Price = 'price',
  Name = 'name',
  Title = 'title',
}

export enum SortParamOrder {
  Email = 'email',
  Name = 'name',
  Date = 'date',
  Value = 'value',
}

export interface GetProductsByPageParams {
  page: number;
  category?: CategoryName;
  sortParam?: SortParamProduct;
  sortDirection?: SortDirection extends { sortParam: infer P }
    ? P extends SortParamProduct
      ? SortDirection
      : never
    : SortDirection;
}

export interface GetOrdersByPageParams {
  page: number;
  sortParam?: SortParamOrder;
  sortDirection?: SortDirection extends { sortParam: infer P }
    ? P extends SortParamOrder
      ? SortDirection
      : never
    : SortDirection;
}

export type GetRecordsByPageParams =
  | GetProductsByPageParams
  | GetOrdersByPageParams;
