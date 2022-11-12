import React, { Component } from "react";
import { toggleCurrenySwitcher } from "../../features/currencies/currenciesSlice";
import { connect } from "react-redux";
import { setCartCurrency } from "../../features/cart/cartSlice";
import * as styles from "./CurrencySwitcher.module.css";

export class CurrencySwitcher extends Component {
  render() {
    const { setCartCurrency, toggleCurrenySwitcher } = this.props;
    const { currencies } = this.props.store;
    const { currencies_items } = currencies;

    return (
      <div>
        <div
          className={styles.cart_overlay}
          onClick={() => {
            toggleCurrenySwitcher(false);
          }}
        ></div>

        <div className={styles.currency_list}>
          <ul>
            {currencies_items.map((cur) => {
              const { label, symbol } = cur;
              return (
                <li
                  key={label}
                  onClick={() => {
                    setCartCurrency(label);
                    toggleCurrenySwitcher(false);
                  }}
                >
                  <p>{symbol}</p> <p>{label}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { toggleCurrenySwitcher, setCartCurrency };

export default connect(mapStateToProps, mapActionsToProps)(CurrencySwitcher);
