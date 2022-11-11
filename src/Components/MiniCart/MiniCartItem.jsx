import React, { Component } from "react";
import Attribute from "./Attribute";
import { connect } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "../../features/cart/cartSlice.js";
export class MiniCartItem extends Component {
  render() {
    const {
      cart_item_id,
      brand,
      name,
      prices,
      attributes,
      selectedAttributes,
      gallery,
      qty,
      cartCurrency,
      increaseQty,
      decreaseQty,
      removeItem,
    } = this.props;
    const [price] = prices.filter((price) => price.currency.label === cartCurrency);

    return (
      <div className={`cart-item`}>
        <div className="cart-item__info">
          <p className="brand">{brand}</p>
          <p>
            <b>{name}</b>
          </p>
          <p>
            <b>
              {price.currency.symbol}
              {price.amount}
            </b>
          </p>

          {attributes.length > 0 &&
            attributes.map((attr) => {
              return (
                <Attribute
                  key={attr.name}
                  cartItemId={cart_item_id || null}
                  attr={attr}
                  selectedAttributes={selectedAttributes}
                />
              );
            })}
        </div>
        <div className="cart-item__controls">
          <button onClick={() => increaseQty(cart_item_id)}>+</button>
          <span>{qty}</span>
          <button
            onClick={() => {
              if (qty === 1) return removeItem(cart_item_id);
              decreaseQty(cart_item_id);
            }}
          >
            -
          </button>
        </div>
        <div className="cart-item__image">
          <img src={gallery[0]} alt="product" className="img" />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { increaseQty, decreaseQty, removeItem };

export default connect(mapStateToProps, mapActionsToProps)(MiniCartItem);
