import React, { createContext } from "react";
import axios from "axios";
import * as graphQl from "../GraphQl/Queries";
import { products } from "./sample";

// Setup Context
const DataContext = createContext();

export const DataContextConsumer = DataContext.Consumer;

/////////////////////////////
// Context provider component
/////////////////////////////
class DataContextProvider extends React.Component {
  state = {
    currency: {
      label: "USD",
      symbol: "$",
    }, // default currency
    error: undefined,
    loading: true,
    currencies: [
      {
        label: "USD",
        symbol: "$",
      }, // default currency
    ],
    categories: [],
    activeCategory: "clothes",
    products: [],
    favorits: ["apple-imac-2021", "huarache-x-stussy-le"],
    inCart: [...products],
  };

  setCurrency = (currency) => {
    this.setState({ currency });
  };

  getProducts = async () => {
    const {
      data: { data },
    } = await axios.post(graphQl.URL, {
      query: graphQl.GET_PRODUCTS(this.state.activeCategory),
    });
    this.setState({ products: data.category });
  };

  getCategories = async () => {
    const {
      data: { data },
    } = await axios.post(graphQl.URL, {
      query: graphQl.GET_CATEGORIES,
    });
    this.setState({ categories: [...data.categories.map((item) => item.name)] });
  };

  getCurrencies = async () => {
    const {
      data: { data },
    } = await axios.post(graphQl.URL, {
      query: graphQl.GET_CURRENCIES,
    });
    this.setState({ currencies: [...data.currencies] });
  };

  selectCategory = (c) => {
    this.setState({ activeCategory: c });
  };

  // update state on mount
  componentDidMount = function () {
    this.getProducts();
    this.getCategories();
    this.getCurrencies();
    this.setState({ loading: false });
  };

  componentDidUpdate = function (prevProps, prevState) {
    if (prevState.activeCategory !== this.state.activeCategory) this.getProducts();
    if (prevState.currency.label !== this.state.currency.label) this.getProducts();
  };

  render() {
    return (
      <DataContext.Provider
        value={{
          categories: this.state.categories,
          currency: this.state.currency,
          error: this.state.error,
          loading: this.state.loading,
          products: this.state.products,
          favorits: this.state.favorits,
          inCart: this.state.inCart,
          activeCategory: this.state.activeCategory,
          currencies: this.state.currencies,
          selectCategory: this.selectCategory,
          setCurrency: this.setCurrency,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default DataContextProvider;
