import React, { Component } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { DataContextProvider } from "./Context/DataContextProvider";
import { Routes, Route } from "react-router-dom";
import ProductsLandingPage from "./pages/ProductsLandingPage";
import ProductDescriptionPage from "./pages/ProductDescriptionPage";
import CartPage from "./pages/CartPage";
export class App extends Component {
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

export default App;
