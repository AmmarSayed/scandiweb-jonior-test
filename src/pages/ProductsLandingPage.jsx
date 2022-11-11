import React, { Component } from "react";
import Card from "../Components/Products/Card";

import { connect } from "react-redux";
import { addItem } from "../features/cart/cartSlice";
export class ProductsLandingPage extends Component {
  render() {
    const { products, cart } = this.props.store;
    const { addItem } = this.props;

    // favorits, cartItems, addToCart, activeCategory, hasDiscounts, loading
    const { active_category, products_loading, products_items } = products;
    const { cartCurrency } = cart;

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
                    cartCurrency={cartCurrency}
                    // isFavorite={favorits.includes(product.id)}
                    // hasDiscounts={hasDiscounts}
                    addItem={addItem}
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
