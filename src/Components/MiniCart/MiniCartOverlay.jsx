import React, { Component } from "react";
import withDataContext from "../../Context/DataContextProvider";
import MiniCartItem from "./MiniCartItem";

export class MiniCartOverlay extends Component {
  render() {
    const { cartItems, currency } = this.props.dataContext;
    const { toggle } = this.props;
    const len = cartItems.length;

    const total = cartItems.reduce((acc, cur) => {
      const price = cur.prices.filter((p) => p.currency.label === currency.label)[0].amount;
      const productTotal = cur.qty * price;
      return Number((acc + productTotal).toFixed(2));
    }, 0);
    return (
      <div>
        <div className="cart-verlay__container">
          <h5>
            <b>my bag, </b>
            <span>
              {len}
              {len > 1 ? " items" : " item"}
            </span>
          </h5>
          <div className="items">
            {cartItems.map((item) => {
              return <MiniCartItem key={item.cartItemId} {...item} />;
            })}
          </div>
          <div className="cart-overlay__total-price">
            <p>total</p>
            <p>
              {currency.symbol}
              {total}
            </p>
          </div>
          <div className="cart-overlay__actions">
            <button className=" btn btn-secondary">View Bag</button>
            <button className=" btn btn-primary">checkout</button>
          </div>
        </div>

        <div className="cart-overlay " onClick={toggle}></div>
      </div>
    );
  }
}

export default withDataContext(MiniCartOverlay);
