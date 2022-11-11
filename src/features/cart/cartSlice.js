import { createSlice, current } from "@reduxjs/toolkit";
import { addToCart } from "../../utils/utils";

const getLocalStorage = () => {
  let cart = localStorage.getItem("cart");
  if (!cart) return [];
  return JSON.parse(cart);
};

const initialState = {
  cartItems: getLocalStorage(),
  cartItemsCount: 0,
  cartTotalCost: 0,
  cartCurrency: "RUB",
  cart_error: null,
  isCartVisible: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cartItems = [];
    },
    addItem: (state, action) => {
      const tempCart = addToCart(state.cartItems, action.payload);
      state.cartItems = tempCart;
    },
    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.cart_item_id !== action.payload);
    },
    increaseQty: (state, action) => {
      const index = state.cartItems.findIndex((i) => i.cart_item_id === action.payload);
      state.cartItems[index].qty += 1;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItems.findIndex((i) => i.cart_item_id === action.payload);
      state.cartItems[index].qty -= 1;
    },
    cartError: (state, action) => {
      state.cart_error = action.payload;
    },

    calcTotal: (state) => {
      let totalCost = 0;
      let totalCount = 0;

      if (!state.cartItems.length) {
        state.cartItemsCount = 0;
        state.cartTotalCost = 0;
        return;
      }

      state.cartItems.forEach((i) => {
        const [filteredPrice] = i.prices.filter((pr) => pr.currency.label === state.cartCurrency);
        const { amount } = filteredPrice;
        totalCount += i.qty;
        totalCost += i.qty * amount;
      });

      state.cartItemsCount = totalCount;
      state.cartTotalCost = totalCost;
    },
    toggleCartVisibility: (state) => {
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export default cartSlice.reducer;
export const { clearCart, increaseQty, decreaseQty, addItem, removeItem, cartError, calcTotal, toggleCartVisibility } =
  cartSlice.actions;
