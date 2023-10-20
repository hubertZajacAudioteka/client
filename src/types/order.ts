import { Product } from './products';
import { User } from './user';

export type Order = {
  id: string;
  created_at: string;
  value: number;
  user: User;
  orderItems: {
    quantity: number;
    product: Omit<Product, 'category'>;
  }[];
};

export type AddOrderValues = {
  products: {
    id: string;
    quantity: number;
  }[];
};

export type GetOrdersResponse = {
  data: Order[];
  per_page: number;
  total: number;
};

export type DeleteOrderResponse = {
  isSuccess: false;
};

export type FetchClientResponse = {
  clientSecret: string;
};
