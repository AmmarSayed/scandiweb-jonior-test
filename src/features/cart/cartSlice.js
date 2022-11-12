import { createSlice, current } from "@reduxjs/toolkit";
import { addToCart } from "../../utils/utils";

const getLocalStorageCart = () => {
  let cart = localStorage.getItem("cart");
  if (!cart) return [];
  return JSON.parse(cart);
};

const getLocalStorageCurrency = () => {
  let currency = localStorage.getItem("currency");
  if (!currency) return "USD";
  return JSON.parse(currency);
};
const initialState = {
  cart_items: getLocalStorageCart(),
  cartItemsCount: 0,
  cartTotalCost: 0,
  cartCurrency: getLocalStorageCurrency(),
  cart_error: null,
  isCartOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    clearCart: (state) => {
      state.cart_items = [];
    },
    addItem: (state, action) => {
      const tempCart = addToCart(state.cart_items, action.payload);
      state.cart_items = tempCart;
    },
    removeItem: (state, action) => {
      state.cart_items = state.cart_items.filter((i) => i.cart_item_id !== action.payload);
    },
    increaseQty: (state, action) => {
      const index = state.cart_items.findIndex((i) => i.cart_item_id === action.payload);
      state.cart_items[index].qty += 1;
    },
    decreaseQty: (state, action) => {
      const index = state.cart_items.findIndex((i) => i.cart_item_id === action.payload);
      state.cart_items[index].qty -= 1;
    },
    cartError: (state, action) => {
      state.cart_error = action.payload;
    },

    setCartCurrency: (state, action) => {
      state.cartCurrency = action.payload;
      localStorage.setItem("currency", JSON.stringify(action.payload));
    },
    calcTotal: (state) => {
      let totalCost = 0;
      let totalCount = 0;

      if (!state.cart_items.length) {
        state.cartItemsCount = 0;
        state.cartTotalCost = 0;
        return;
      }

      state.cart_items.forEach((i) => {
        const [filteredPrice] = i.prices.filter((pr) => pr.currency.label === state.cartCurrency);
        const { amount } = filteredPrice;
        totalCount += i.qty;
        totalCost += i.qty * amount;
      });

      state.cartItemsCount = totalCount;
      state.cartTotalCost = totalCost;
    },

    toggleCartVisibility: (state, action) => {
      state.isCartOpen = action.payload;
    },
  },
});

export default cartSlice.reducer;
export const {
  clearCart,
  increaseQty,
  decreaseQty,
  addItem,
  removeItem,
  cartError,
  calcTotal,
  toggleCartVisibility,
  setCartCurrency,
} = cartSlice.actions;
