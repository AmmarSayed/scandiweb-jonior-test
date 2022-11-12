import React, { Component } from "react";
import Navbar from "./Components/Navbar/Navbar";

import { Routes, Route } from "react-router-dom";
import ProductsLandingPage from "./pages/ProductsLandingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";
import { calcTotal } from "./features/cart/cartSlice";
import { getProducts } from "./features/products/productsSlice";
import { getCategories } from "./features/categories/categoriesSlice";
import { getCurrencies } from "./features/currencies/currenciesSlice";

import { connect } from "react-redux";
export class App extends Component {
  componentDidMount() {
    this.props.calcTotal();
    this.props.getProducts();
    this.props.getCategories();
    this.props.getCurrencies();
  }

  componentDidUpdate(prevProps) {
    const { active_category } = this.props.store.products;
    const prevActiveCategroy = prevProps.store.products.active_category;

    const { cart_items } = this.props.store.cart;
    const prevCartItems = prevProps.store.cart.cart_items;

    // update filters on changing the category
    if (active_category !== prevActiveCategroy) this.props.getProducts();

    // update local storage
    if (!cart_items.length) localStorage.removeItem("cart");
    if (cart_items.length) localStorage.setItem("cart", JSON.stringify(cart_items));

    // update totals on change
    if (cart_items !== prevCartItems) {
      this.props.calcTotal();
    }
  }

  render() {
    return (
      <>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsLandingPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product" element={<ProductDescriptionPage />} />
        </Routes>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { calcTotal, getProducts, getCategories, getCurrencies };

export default connect(mapStateToProps, mapActionsToProps)(App);
