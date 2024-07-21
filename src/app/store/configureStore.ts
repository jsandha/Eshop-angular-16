import { ShopFeatures } from './shop';
import { configureStore } from '@reduxjs/toolkit';

const store = configureStore({
  reducer: ShopFeatures.reducer,
  // Adding devToolsEnhancer to the store configuration
  devTools: true, // Enable Redux DevTools
});

export default store;
