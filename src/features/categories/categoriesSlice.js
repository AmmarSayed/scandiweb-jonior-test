import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as graphQl from "../../GraphQl/Queries";
import axios from "axios";

export const getCategories = createAsyncThunk("categories/getCategories", async (_, thunkAPI) => {
  try {
    const { data } = await axios.post(
      graphQl.URL,

      {
        query: graphQl.GET_CATEGORIES,
      }
    );
    return data.data.categories;
  } catch (err) {
    return thunkAPI.rejectWithValue("💥 Something went wrong!");
  }
});

const initialState = {
  categories_items: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.categories_loading = true;
    },

    [getCategories.fulfilled]: (state, action) => {
      state.categories_loading = false;
      state.categories_items = action.payload.map((c) => c.name);
    },

    [getCategories.rejected]: (state, payload) => {
      state.categories_loading = false;
      state.categories_error = payload;
    },
  },
});

export default categoriesSlice.reducer;

export const {} = categoriesSlice.actions;
