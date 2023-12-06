import { OrderItem } from '@/types/order';

export const getOrderValue = (orderItems: OrderItem[]): string => {
  if (orderItems) {
    return orderItems
      .reduce((prev, curr) => prev + curr.product.price * curr.quantity, 0)
      .toFixed(2);
  } else {
    return '0.00';
  }
};
