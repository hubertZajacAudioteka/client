import { Product } from './product';
import { User } from './user';

export interface Order {
  id: string;
  created_at: string;
  value: number;
  user: User;
  orderItems: {
    quantity: number;
    product: Omit<Product, 'category'>;
  }[];
}

export interface AddOrderValues {
  products: {
    id: string;
    quantity: number;
  }[];
}

export interface GetOrdersByPageData {
  data: Order[];
  meta: {
    per_page: number;
    total: number;
  };
}

export interface DeleteOrderResponse {
  isSuccess: false;
}

export interface FetchClientResponse {
  clientSecret: string;
}
