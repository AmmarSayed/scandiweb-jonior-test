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
      // state.cartItemsCount += 1;
    },
    removeItem: (state, action) => {
      state.cartItems.filter((i) => i.cart_item_id !== action.payload);
      // state.cartItemsCount -= 1;
    },
    increaseQty: (state, action) => {
      const index = state.cartItems.findIndex((i) => i.cart_item_id === action.payload);
      state.cartItems[index].qty += 1;
    },
    decreaseQty: (state, action) => {
      const index = state.cartItems.findIndex((i) => i.cart_item_id === action.payload);
      state.cartItems[index].qty -= 1;
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
export const { clearCart, increaseQty, decreaseQty, addItem, removeItem, calcTotal, toggleCartVisibility } =
  cartSlice.actions;
