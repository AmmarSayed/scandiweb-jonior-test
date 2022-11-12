import React, { Component } from "react";
import MiniCartItem from "../Components/MiniCart/MiniCartItem";
import { connect } from "react-redux";
import * as styles from "./CartPage.module.css";
export class CartPage extends Component {
  render() {
    const { cart } = this.props.store;
    const { cart_items, cartCurrency, cartTotalCost, cartItemsCount } = cart;

    return (
      <section className="section container">
        <h1>Cart</h1>
        <main>
          {cart_items.map((item) => {
            return (
              <MiniCartItem
                key={item.cart_item_id}
                onCartPage={true}
                {...item}
                cartCurrency={cartCurrency}
                cartTotalCost={cartTotalCost}
              />
            );
          })}
        </main>

        <hr />
        <div className={styles.cart_summary}>
          <div className={styles.summary_info}>
            <p>Tax 21%:</p>
            <span>
              {cartCurrency} {cartTotalCost.toFixed(2)}
            </span>
          </div>
          <div className={styles.summary_info}>
            <p>Quantity:</p>
            <span> {cartItemsCount} </span>
          </div>
          <div className={styles.summary_info}>
            <p>Total:</p>
            <span>
              {cartCurrency} {cartTotalCost.toFixed(2)}
            </span>
          </div>
          <button className={`${styles.btn_cart_order} btn btn-primary`}>Order</button>
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = {};

export default connect(mapStateToProps, mapActionsToProps)(CartPage);
