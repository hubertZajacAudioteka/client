import { GetOrdersByPageData, Order } from './order';
import {
  Category,
  CategoryName,
  GetProductsByPageData,
  Product,
} from './product';
import { GetUsersByPageData, Role, User } from './user';

export enum Endpoint {
  Products = 'products',
  Orders = 'orders',
  Users = 'users',
  Categories = 'categories',
  Roles = 'roles',
}

export enum SortDirection {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum SortParamProduct {
  Price = 'price',
  Name = 'title',
}

export enum SortParamOrder {
  Email = 'email',
  Name = 'name',
  Date = 'date',
  Value = 'value',
}

export enum SortParamUser {
  FirstName = 'first_name',
  LastName = 'last_name',
  Email = 'email',
  Role = 'role',
}

type SortParamRecord = SortParamProduct | SortParamOrder | SortParamUser;

interface BasicGetRecordsByPageParams<T extends SortParamRecord> {
  page: number;
  sortParam?: T;
  // this notation states that if sort param is given, sort direction is mandatory
  sortDirection?: SortDirection extends { sortParam: infer P }
    ? P extends SortParamProduct
      ? SortDirection
      : never
    : SortDirection;
}

export interface GetProductsByPageParams
  extends BasicGetRecordsByPageParams<SortParamProduct> {
  category?: CategoryName;
}

export interface GetOrdersByPageParams
  extends BasicGetRecordsByPageParams<SortParamOrder> {
  search?: string;
}

export interface GetUsersByPageParams
  extends BasicGetRecordsByPageParams<SortParamUser> {}

export type GetRecordsByPageParams =
  | GetProductsByPageParams
  | GetOrdersByPageParams
  | GetUsersByPageParams;

export type EndpointDataByPageMap = {
  products: GetProductsByPageData;
  orders: GetOrdersByPageData;
  users: GetUsersByPageData;
};

export type EndpointDataSingleRecordMap = {
  products: Product;
  orders: Order;
  users: User;
};

export type EndpointDataRecordsMap = {
  categories: Category[];
  roles: Role[];
};
