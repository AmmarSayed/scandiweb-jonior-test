import React, { Component } from "react";
import Navbar from "./Components/Navbar/Navbar";
import { DataContextProvider } from "./Context/DataContextProvider";
import ProductsCategoryPage from "./pages/ProductsCategoryPage";

export class App extends Component {
  render() {
    return (
      <DataContextProvider>
        <h1>Hello</h1>
        <Navbar />
        <ProductsCategoryPage />
      </DataContextProvider>
    );
  }
}

export default App;
