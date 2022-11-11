import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as graphQl from "../../GraphQl/Queries";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async (_, thunkAPI) => {
  const { active_category } = thunkAPI.getState().products;
  try {
    const { data } = await axios.post(
      graphQl.URL,

      {
        query: graphQl.GET_PRODUCTS(active_category),
      }
    );
    return data.data.category.products;
  } catch (err) {
    return thunkAPI.rejectWithValue("💥 Something went wrong!");
  }
});

const initialState = {
  products_items: [],
  products_loading: false,
  products_error: false,
  favorits: ["apple-imac-2021", "huarache-x-stussy-le"],

  hasDiscounts: [
    { id: "huarache-x-stussy-le", rate: "50%" },
    { id: "jacket-canada-goosee", rate: "30%" },
    { id: "apple-imac-2021", rate: "15%" },
  ],

  active_category: "all",
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.active_category = action.payload;
    },
  },
  extraReducers: {
    [getProducts.pending]: (state) => {
      state.products_loading = true;
    },

    [getProducts.fulfilled]: (state, action) => {
      state.products_loading = false;
      state.products_items = action.payload;
    },

    [getProducts.rejected]: (state, payload) => {
      state.products_loading = false;
      state.products_error = payload;
    },
  },
});

export default productSlice.reducer;

export const { setCategory } = productSlice.actions;
