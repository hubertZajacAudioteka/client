import { Product } from './product';
import { User } from './user';

export interface OrderItem {
  quantity: number;
  product: Product;
}

export interface Order {
  id: string;
  created_at: string;
  value: number;
  user: User;
  order_items: OrderItem[];
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

export interface EditOrderValues {
  id: string;
  created_at: Date;
  products: { id: string; quantity: number }[];
}
