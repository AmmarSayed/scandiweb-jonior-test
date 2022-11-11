import React, { Component } from "react";
import Card from "../Components/Products/Card";

import { connect } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
export class ProductsLandingPage extends Component {
  render() {
    const { products } = this.props.store;
    const { addItem } = this.props;

    // favorits, cartItems, addToCart, activeCategory, hasDiscounts, loading
    const { active_currency, active_category, products_loading, products_items } = products;

    return (
      <div className="container">
        <section className="section">
          <h1>{active_category}</h1>
          {products_loading && <div className="loading"></div>}

          {!products_loading && (
            <div className="products">
              {products_items.map((product) => {
                return (
                  <Card
                    key={product.id}
                    {...product}
                    currency={active_currency}
                    // isFavorite={favorits.includes(product.id)}
                    // inCart={cartItems.map((item) => item.id).includes(product.id)}
                    addItem={addItem}
                    // hasDiscounts={hasDiscounts}
                  />
                );
              })}
            </div>
          )}
        </section>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { addItem };

export default connect(mapStateToProps, mapActionsToProps)(ProductsLandingPage);
