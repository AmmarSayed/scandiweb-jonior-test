import React, { Component } from "react";
import logo from "../../icons/logo.svg";

import { ShoppingCartIcon } from "../../icons/icons";

import MiniCartOverlay from "../MiniCart/MiniCartOverlay";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import { Link } from "react-router-dom";

import { connect } from "react-redux";
import { toggleCartVisibility } from "../../features/cart/cartSlice";
import { toggleCurrenySwitcher } from "../../features/currencies/currenciesSlice";
import { setCategory } from "../../features/products/productsSlice";
export class Navbar extends Component {
  closeNavBarActionButtons = (e) => {
    const nav_action_btn = e.target.closest(".nav__action") || null;
    if (nav_action_btn) return;
    this.props.toggleCurrenySwitcher(false);
    this.props.toggleCartVisibility(false);
  };

  render() {
    const { cart, currencies, categories, products } = this.props.store;
    const { cartItemsCount, isCartOpen, cartCurrency } = cart;
    const { isCurrenySwitchOpen, currencies_loading, currencies_items } = currencies;
    const { categories_items, categories_loading } = categories;
    const { active_category } = products;
    const { toggleCartVisibility, toggleCurrenySwitcher, setCategory } = this.props;

    const activeCurrency = currencies_items.find((c) => c.label === cartCurrency);

    return (
      <header className="header">
        {isCartOpen && <MiniCartOverlay />}

        {isCurrenySwitchOpen && <CurrencySwitcher />}

        <nav onClick={this.closeNavBarActionButtons}>
          <div className="container nav__container">
            <ul className="nav__links">
              {!categories_loading &&
                categories_items.map((c) => {
                  const navClasses = c === active_category ? "nav__link  nav__link-active" : "nav__link";
                  return (
                    <Link key={c} to="/">
                      <li className={navClasses} onClick={() => setCategory(c)}>
                        {c}
                      </li>
                    </Link>
                  );
                })}
            </ul>

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
                <ShoppingCartIcon />
                <span>{cartItemsCount}</span>
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

const mapActionsToProps = { toggleCartVisibility, toggleCurrenySwitcher, setCategory };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);
