import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as graphQl from "../../GraphQl/Queries";
import axios from "axios";

export const getSingleProduct = createAsyncThunk("singleProduct/getProduct", async (searchId, thunkAPI) => {
  const qury = graphQl.GET_PRODUCTS_BY_ID(searchId);

  try {
    const { data } = await axios.post(graphQl.URL, {
      query: qury,
    });

    return data.data.product;
  } catch (err) {
    return thunkAPI.rejectWithValue("💥 Something went wrong!");
  }
});

const initialState = {
  single_product: {},
  single_product_loading: false,
  single_product_error: false,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.single_product_loading = true;
    },

    [getSingleProduct.fulfilled]: (state, action) => {
      state.single_product_loading = false;
      state.single_product = action.payload;
    },

    [getSingleProduct.rejected]: (state, payload) => {
      state.single_product_loading = false;
      state.single_product_error = payload;
    },
  },
});

export default singleProductSlice.reducer;

export const {} = singleProductSlice.actions;
