import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCartVisibility } from "../../features/cart/cartSlice";
import MiniCartItem from "./MiniCartItem";
import * as styles from "./MiniCartOverlay.module.css";

export class MiniCartOverlay extends Component {
  render() {
    const { cart_items, cartCurrency, cartTotalCost, cartItemsCount } = this.props.store.cart;
    const { toggleCartVisibility } = this.props;

    return (
      <div>
        <div className={styles.cart_overlay__container}>
          <h5>
            <b>my bag, </b>
            <span>{cartItemsCount > 1 ? `${cartItemsCount} items` : `${cartItemsCount} item`}</span>
          </h5>
          <div className={styles.items}>
            {cart_items.map((item) => {
              return (
                <MiniCartItem
                  key={item.cart_item_id}
                  {...item}
                  cartCurrency={cartCurrency}
                  cartTotalCost={cartTotalCost}
                />
              );
            })}
          </div>
          <div className={styles.cart_overlay__total_price}>
            <p>total</p>
            <p>
              {cartCurrency} {cartTotalCost.toFixed(2)}
            </p>
          </div>
          <div className={styles.cart_overlay__actions}>
            <button className="btn btn-secondary" onClick={() => toggleCartVisibility(false)}>
              <Link to="cart">View Bag</Link>
            </button>
            <button className="btn btn-primary" onClick={() => toggleCartVisibility(false)}>
              checkout
            </button>
          </div>
        </div>

        <div className={styles.cart_overlay} onClick={() => toggleCartVisibility(false)}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { toggleCartVisibility };

export default connect(mapStateToProps, mapActionsToProps)(MiniCartOverlay);
