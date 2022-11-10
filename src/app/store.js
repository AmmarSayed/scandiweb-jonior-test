import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productsSlice";
import singleProductReducer from "../features/singleProduct/singleProductsSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    singleProduct: singleProductReducer,
  },
});

export default store;
