import React, { Component } from "react";
import MiniCartItem from "../Components/MiniCart/MiniCartItem";
import withDataContext from "../Context/DataContextProvider";

export class CartPage extends Component {
  render() {
    const { cartItems, currency } = this.props.dataContext;

    const cartItemsCount = cartItems.reduce((acc, curr) => (acc += curr.qty), 0);

    const total = cartItems.reduce((acc, cur) => {
      const price = cur.prices.filter((p) => p.currency.label === currency.label)[0].amount;
      const productTotal = cur.qty * price;
      return Number((acc + productTotal).toFixed(2));
    }, 0);

    return (
      <section className="section container">
        <h1>Cart</h1>
        <main className="cart-page-main">
          {cartItems.map((item) => {
            return <MiniCartItem key={item.cartItemId} {...item} displayOnCartPage={true} />;
          })}
        </main>

        <hr />
        <div className="cart-summary">
          <div className="summary-info">
            <p>Tax 21%:</p>
            <span>
              {currency.symbol}
              {Number((total * 0.21).toFixed(2))}
            </span>
          </div>
          <div className="summary-info">
            <p>Quantity:</p>
            <span> {cartItemsCount}</span>
          </div>
          <div className="summary-info">
            <p>Total:</p>
            <span>
              {currency.symbol}
              {total}
            </span>
          </div>
          <button className="btn-cart-order btn btn-primary">Order</button>
        </div>
      </section>
    );
  }
}

export default withDataContext(CartPage);
