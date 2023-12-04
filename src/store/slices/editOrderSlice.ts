import { Order } from '@/types/order';
import { Product } from '@/types/product';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface EditOrderState {
  orderToEdit: Order | null;
  value: number;
}

const initialState: EditOrderState = {
  orderToEdit: null,
  value: 0,
};

export const editOrderSlice = createSlice({
  name: 'editOrder',
  initialState,
  reducers: {
    setOrderToEdit: (state, action: PayloadAction<Order>) => {
      state.orderToEdit = action.payload;
    },
    addProductToEditedOrder: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.orderToEdit?.order_items.findIndex(
        (orderItem) => orderItem.product.id === action.payload.id
      );

      if (state.orderToEdit) {
        state.value += action.payload.price;

        if (foundIndex === -1 || !foundIndex) {
          state.orderToEdit.order_items = [
            ...state.orderToEdit.order_items,
            { quantity: 1, product: action.payload },
          ];
        } else {
          state.orderToEdit.order_items = state.orderToEdit.order_items.map(
            (orderItem, index) =>
              index === foundIndex
                ? { ...orderItem, quantity: orderItem.quantity + 1 }
                : orderItem
          );
        }
      }
    },
    removeProductFromEditedOrder: (state, action: PayloadAction<string>) => {
      const foundIndex = state.orderToEdit?.order_items.findIndex(
        (orderItem) => orderItem.product.id === action.payload
      );
      if (state.orderToEdit && foundIndex !== -1 && foundIndex) {
        const orderItem = state.orderToEdit.order_items[foundIndex];
        state.value -= orderItem.product.price;

        if (orderItem.quantity > 1) {
          state.orderToEdit.order_items = state.orderToEdit.order_items.map(
            (item) =>
              item.product.id === action.payload
                ? { ...item, quantity: item.quantity - 1 }
                : item
          );
        } else {
          state.orderToEdit.order_items = state.orderToEdit.order_items.filter(
            (item) => item.product.id !== action.payload
          );
        }
      }
    },
    clearOrderToEdit: (state) => {
      state.orderToEdit = null;
      state.value = 0;
    },
  },
});

export const {
  addProductToEditedOrder,
  removeProductFromEditedOrder,
  setOrderToEdit,
  clearOrderToEdit,
} = editOrderSlice.actions;

export default editOrderSlice.reducer;
