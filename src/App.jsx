import React, { Component } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { DataContextProvider } from "./Context/DataContextProvider";
import { Routes, Route } from "react-router-dom";
import ProductsLandingPage from "./pages/ProductsLandingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";
import { calcTotal } from "./features/cart/cartSlice";

import { connect } from "react-redux";
export class App extends Component {
  componentDidMount() {
    this.props.calcTotal();
  }

  componentDidUpdate(prevProps) {
    const { cartItems } = this.props.store.cart;
    const prevCartItems = prevProps.store.cart.cartItems;

    if (cartItems.length !== prevCartItems.length) {
      this.props.calcTotal();
    }
  }

  render() {
    return (
      <DataContextProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductsLandingPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="product" element={<ProductDescriptionPage />} />
        </Routes>
      </DataContextProvider>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { calcTotal };

export default connect(mapStateToProps, mapActionsToProps)(App);
