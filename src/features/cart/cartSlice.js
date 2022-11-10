import { createSlice } from "@reduxjs/toolkit";
import { cartItems } from "../sampleData";

const initialState = {
  cartItems: cartItems,
  cartItemsCount: 0,
  cartTotalCost: 0,
  cartCurrency: "RUB",
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
      state.cartItems.push(action.payload);
      state.cartItemsCount += 1;
    },
    removeItem: (state, action) => {
      state.cartItems.filter((i) => i.id !== action.payload);
      state.cartItemsCount -= 1;
    },
    calcTotal: (state) => {
      let totalCost = 0;
      let totalCount = 0;
      if (!state.cartItems.length) return;

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
export const { clearCart, addItem, removeItem, calcTotal, toggleCartVisibility } = cartSlice.actions;
