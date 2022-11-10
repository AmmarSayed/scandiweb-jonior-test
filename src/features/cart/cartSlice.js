import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: [{ name: "sample", amount: 2, price: 0 }],
  cartItemsCount: 0,
  cartTotalCost: 0,
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
        totalCount += i.amount;
        totalCost += i.amount * i.price;
      });

      state.cartItemsCount = totalCount;
      state.cartTotalCost = totalCost;
    },
    toggleCartVisibility: (state) => {
      console.log("toggle");
      state.isCartVisible = !state.isCartVisible;
    },
  },
});

export default cartSlice.reducer;
export const { clearCart, addItem, removeItem, calcTotal, toggleCartVisibility } = cartSlice.actions;
