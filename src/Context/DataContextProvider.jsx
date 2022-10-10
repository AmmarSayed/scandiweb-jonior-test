import React, { createContext } from "react";
import axios from "axios";
import * as graphQl from "../GraphQl/Queries";
import { products } from "./sample";

// Setup Context
const DataContext = createContext();
// export const DataContextConsumer = DataContext.Consumer;

const withDataContext = function (WrappedComponent) {
  return class DataComponentContext extends React.Component {
    render() {
      return (
        <DataContext.Consumer>
          {(dataContext) => <WrappedComponent {...this.props} dataContext={dataContext} />}
        </DataContext.Consumer>
      );
    }
  };
};

/////////////////////////////
// Context provider component
/////////////////////////////
export class DataContextProvider extends React.Component {
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
    cartItems: [],
  };

  addToCart = async (id) => {
    const query = graphQl.GET_PRODUCTS_BY_ID(id);
    const {
      data: { data },
    } = await axios.post(graphQl.URL, {
      query,
    });

    const selectedAttributes =
      data.product.attributes.length > 0
        ? data.product.attributes.map((attr) => ({ ...attr, items: attr.items[0] }))
        : null; //set first attribute as default

    const product = {
      ...data.product,
      qty: 1,
      selectedAttributes,
      cartItemId: new Date().getTime(),
    };
    this.setState({ cartItems: [...this.state.cartItems, product] });
  };

  addItemCountInCart = (id) => {
    this.setState({
      cartItems: this.state.cartItems.map((item) => {
        if (item.cartItemId === id) item.qty = item.qty + 1;
        return item;
      }),
    });
  };

  substractItemCountInCart = (id) => {
    const newArray = this.state.cartItems.map((item) => {
      if (item.cartItemId === id) item.qty = item.qty - 1;
      return item;
    });
    this.setState({
      cartItems: newArray,
    });
  };

  modifyAttribute = (id, newSelectedAttribute) => {
    // function to modify attribute on a cart item
    const modifiedAttributes = (cartItem, newAttribute) => {
      return cartItem.selectedAttributes.map((oldAttr) => {
        // check if the same attribute to be modified
        const isSameName = oldAttr.name === newAttribute.name;
        const sameType = oldAttr.type === newAttribute.type;

        if (isSameName && sameType) {
          // change the attribute
          return newAttribute;
        } else {
          // return the original attribute
          return oldAttr;
        }
      });
    };

    // create a new modified array to set the cart State
    const newArray = this.state.cartItems.map((item) => {
      // check access to correct item
      if (item.cartItemId === id) {
        // loop through the attributes
        return { ...item, selectedAttributes: modifiedAttributes(item, newSelectedAttribute) };
      } else {
        return item;
      }
    });

    this.setState({ cartItems: [...newArray] });
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
    const { categories, currency, error, loading, products, favorits, cartItems, activeCategory, currencies } =
      this.state;
    const { addToCart, selectCategory, setCurrency, addItemCountInCart, substractItemCountInCart, modifyAttribute } =
      this;
    return (
      <DataContext.Provider
        value={{
          categories,
          currency,
          error,
          loading,
          products,
          favorits,
          cartItems,
          activeCategory,
          currencies,
          selectCategory,
          setCurrency,
          addToCart,
          addItemCountInCart,
          substractItemCountInCart,
          modifyAttribute,
        }}
      >
        {this.props.children}
      </DataContext.Provider>
    );
  }
}

export default withDataContext;
// export default DataContextConsumer;
