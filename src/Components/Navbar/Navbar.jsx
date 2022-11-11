import React, { Component } from "react";
import logo from "./icons/logo.svg";
import cartIcon from "./icons/Empty Cart.svg";

import MiniCartOverlay from "../MiniCart/MiniCartOverlay";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../features/cart/cartSlice";
import { toggleCurrenySwitcher } from "../../features/currencies/currenciesSlice";

export class Navbar extends Component {
  closeNavBarActionButtons = (e) => {
    const nav_action_btn = e.target.closest(".nav__action") || null;
    if (nav_action_btn) return;
    this.props.toggleCurrenySwitcher(false);
    this.props.toggleCartVisibility(false);
  };

  render() {
    const { cart, currencies } = this.props.store;
    const { cartItemsCount, isCartOpen, cartCurrency } = cart;
    const { isCurrenySwitchOpen, currencies_loading, currencies_items } = currencies;
    const activeCurrency = currencies_items.find((c) => c.label === cartCurrency);
    const { toggleCartVisibility, toggleCurrenySwitcher } = this.props;

    return (
      <header className="header">
        {isCartOpen && <MiniCartOverlay />}

        {isCurrenySwitchOpen && <CurrencySwitcher />}

        <nav onClick={this.closeNavBarActionButtons}>
          <div className="container nav__container">
            <ul className="nav__links"></ul>
            <div className="nav__logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="nav__actions">
              <div
                className="currBtn nav__action"
                onClick={() => {
                  toggleCurrenySwitcher(!isCurrenySwitchOpen);
                  toggleCartVisibility(false);
                }}
              >
                {!currencies_loading ? activeCurrency?.symbol : "USD"}
                {isCurrenySwitchOpen ? <p className="up">⌃</p> : <p>⌄</p>}
              </div>

              <div
                className="nav__action cartBtn"
                onClick={() => {
                  toggleCartVisibility(!isCartOpen);
                  toggleCurrenySwitcher(false);
                }}
              >
                <img src={cartIcon} alt="cart" />
                <span>{cartItemsCount}</span>;
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { toggleCartVisibility, toggleCurrenySwitcher };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
