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
  selected_attributes: {},
  single_product_item: {},
  single_product_loading: true,
  single_product_error: false,
};

const singleProductSlice = createSlice({
  name: "singleProduct",
  initialState,
  reducers: {
    selectAttribute: (state, action) => {
      const { name, value } = action.payload;
      state.selected_attributes = { ...state.selected_attributes, [name]: value };
    },
  },
  extraReducers: {
    [getSingleProduct.pending]: (state) => {
      state.single_product_loading = true;
    },

    [getSingleProduct.fulfilled]: (state, action) => {
      state.single_product_loading = false;
      state.single_product_item = action.payload;
    },

    [getSingleProduct.rejected]: (state, payload) => {
      state.single_product_loading = false;
      state.single_product_error = payload;
    },
  },
});

export default singleProductSlice.reducer;

export const { selectAttribute } = singleProductSlice.actions;
