import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as graphQl from "../../GraphQl/Queries";
import axios from "axios";

export const getCurrencies = createAsyncThunk("currencies/getcurrencies", async (_, thunkAPI) => {
  try {
    const { data } = await axios.post(
      graphQl.URL,

      {
        query: graphQl.GET_CURRENCIES,
      }
    );
    return data.data.currencies;
  } catch (err) {
    return thunkAPI.rejectWithValue("💥 Something went wrong!");
  }
});

const initialState = {
  currencies_items: [],
  isCurrenySwitchOpen: false,
};

const currenciesSlice = createSlice({
  name: "currency",
  initialState,
  reducers: {
    toggleCurrenySwitcher: (state, action) => {
      state.isCurrenySwitchOpen = action.payload;
    },
  },
  extraReducers: {
    [getCurrencies.pending]: (state) => {
      state.currencies_loading = true;
    },

    [getCurrencies.fulfilled]: (state, action) => {
      state.currencies_loading = false;
      state.currencies_items = action.payload;
    },

    [getCurrencies.rejected]: (state, payload) => {
      state.currencies_loading = false;
      state.currencies_error = payload;
    },
  },
});

export default currenciesSlice.reducer;

export const { setCurrency, toggleCurrenySwitcher } = currenciesSlice.actions;
