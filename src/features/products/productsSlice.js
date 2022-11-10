import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as graphQl from "../../GraphQl/Queries";
import axios from "axios";

export const getProducts = createAsyncThunk("products/getProducts", async (_, thunkAPI) => {
  try {
    const { data } = await axios.post(
      graphQl.URL,

      {
        query: graphQl.GET_PRODUCTS("all"),
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

  featured_products: [],
};

const productSlice = createSlice({
  name: "products",
  initialState,
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

export const {} = productSlice.actions;
