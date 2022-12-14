import React, { Component } from "react";
import Attribute from "./Attribute";
import { connect } from "react-redux";
import { increaseQty, decreaseQty, removeItem } from "../../features/cart/cartSlice.js";
import CartImageSlider from "../ImageSlider/CartImageSlider";
import * as styles from "./MiniCartItem.module.css";

export class MiniCartItem extends Component {
  render() {
    const {
      cart_item_id,
      selected_attributes,
      brand,
      name,
      prices,
      attributes,
      gallery,
      qty,
      cartCurrency,
      increaseQty,
      decreaseQty,
      removeItem,
      onCartPage,
    } = this.props;

    const [price] = prices.filter((price) => price.currency.label === cartCurrency);

    return (
      <div className={styles.cart_item}>
        <div className={styles.cart_item__info}>
          <p className={styles.brand}>{brand}</p>
          <p>
            <b>{name}</b>
          </p>
          <p>
            <b>
              {price.currency.symbol}
              {price.amount}
            </b>
          </p>

          {attributes.length &&
            attributes.map((attr) => {
              return (
                <Attribute
                  key={attr.name}
                  cartItemId={cart_item_id || null}
                  attr={attr}
                  selectedAttributes={selected_attributes}
                />
              );
            })}
        </div>
        <div className={styles.item_display}>
          <div className={styles.cart_item__controls}>
            <button onClick={() => increaseQty(cart_item_id)}>+</button>
            <span>{qty}</span>
            <button
              onClick={() => {
                if (qty === 1) {
                  removeItem(cart_item_id);
                  return;
                }
                decreaseQty(cart_item_id);
              }}
            >
              -
            </button>
          </div>
          {!onCartPage && (
            <div className={styles.cart_item__image}>
              {gallery && <img src={gallery[0]} alt="product" className="img" />}
            </div>
          )}

          {onCartPage && (
            <div className={styles.slider_container}>
              <CartImageSlider images={gallery} />
            </div>
          )}
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
