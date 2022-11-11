import React, { Component } from "react";
import { toggleCurrenySwitcher } from "../../features/currencies/currenciesSlice";
import { connect } from "react-redux";
import { setCartCurrency } from "../../features/cart/cartSlice";

export class CurrencySwitcher extends Component {
  render() {
    const { setCartCurrency, toggleCurrenySwitcher } = this.props;
    const { currencies } = this.props.store;
    const { isCurrenySwitchOpen } = this.props.store.products;
    const { currencies_items } = currencies;

    return (
      <div>
        <div
          className="cart-overlay "
          onClick={() => {
            toggleCurrenySwitcher(false);
          }}
        ></div>

        <div className="currency-list">
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
