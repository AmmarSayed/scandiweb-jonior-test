import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cart/cartSlice";
import productReducer from "../features/products/productsSlice";
import singleProductReducer from "../features/singleProduct/singleProductsSlice";
import categoriesReducer from "../features/categories/categoriesSlice";
import currenciesReducer from "../features/currencies/currenciesSlice";

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: productReducer,
    singleProduct: singleProductReducer,
    categories: categoriesReducer,
    currencies: currenciesReducer,
  },
});

export default store;
