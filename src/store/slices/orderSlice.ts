import { OrderedProduct, Product } from '@/types/product';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

type OrderState = {
  orderedProducts: OrderedProduct[];
  value: number;
  itemsQuantity: number;
};

const initialState: OrderState = {
  orderedProducts: [],
  value: 0,
  itemsQuantity: 0,
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addProductToOrder: (state, action: PayloadAction<Product>) => {
      const foundIndex = state.orderedProducts.findIndex(
        (product) => product.id === action.payload.id
      );
      state.value += action.payload.price;
      state.itemsQuantity++;
      if (foundIndex === -1) {
        state.orderedProducts = [
          ...state.orderedProducts,
          { ...action.payload, quantity: 1 },
        ];
      } else {
        state.orderedProducts = state.orderedProducts.map((product, index) =>
          index === foundIndex
            ? { ...product, quantity: product.quantity + 1 }
            : product
        );
      }
    },
    removeProductFromOrder: (state, action: PayloadAction<string>) => {
      const foundIndex = state.orderedProducts.findIndex(
        (product) => product.id === action.payload
      );
      if (foundIndex !== -1) {
        state.itemsQuantity--;
        state.value -= state.orderedProducts[foundIndex].price;
        if (state.orderedProducts[foundIndex].quantity > 1) {
          state.orderedProducts = state.orderedProducts.map((product, index) =>
            index === foundIndex
              ? { ...product, quantity: product.quantity - 1 }
              : product
          );
        } else {
          state.orderedProducts = state.orderedProducts.filter(
            (product) => product.id !== action.payload
          );
        }
      }
    },
    clearOrder: (state) => {
      state.orderedProducts = [];
      state.itemsQuantity = 0;
      state.value = 0;
    },
  },
});

export const { addProductToOrder, removeProductFromOrder, clearOrder } =
  orderSlice.actions;

export default orderSlice.reducer;
