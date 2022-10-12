import React, { Component } from "react";
import Card from "../Components/Products/Card";

import withDataContext from "../Context/DataContextProvider";

export class ProductsLandingPage extends Component {
  render() {
    const { currency, favorits, cartItems, addToCart, activeCategory, hasDiscounts, loading } = this.props.dataContext;
    const products = this.props.dataContext.products.products || [];

    return (
      <div className="container">
        <section className="section">
          <h1>{activeCategory}</h1>
          {loading && <div className="loading"></div>}

          {!loading && (
            <div className="products">
              {products.map((product) => (
                <Card
                  key={product.id}
                  {...product}
                  currency={currency}
                  isFavorite={favorits.includes(product.id)}
                  inCart={cartItems.map((item) => item.id).includes(product.id)}
                  addToCart={addToCart}
                  hasDiscounts={hasDiscounts}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default withDataContext(ProductsLandingPage);
