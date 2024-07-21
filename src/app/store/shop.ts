import { createSlice } from '@reduxjs/toolkit';

export const {
  actions: ShopActions,
  selectors: ShopSelectors,
  ...ShopFeatures
} = createSlice({
  name: 'shop',
  initialState: {
    products: [],
    cart: [],
  },
  reducers: {
    addProduct(state, action) {
      state.products.push(action.payload);
    },
    addToCart(state, action) {
      state.cart.push(action.payload);
    },
  },
});
