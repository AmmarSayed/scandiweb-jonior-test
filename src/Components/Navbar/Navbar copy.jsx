import React, { Component } from "react";
import logo from "./icons/logo.svg";
import cart from "./icons/Empty Cart.svg";
import withDataContext from "../../Context/DataContextProvider";
import MiniCartOverlay from "../MiniCart/MiniCartOverlay";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import { Link } from "react-router-dom";

export class Navbar extends Component {
  state = {
    isCartVisible: false,
    isCurrencySwithcerVisible: false,
  };

  toggleCartVisiblity = () => {
    this.setState({ isCartVisible: !this.state.isCartVisible });
  };

  toggleCurrency = () => {
    this.setState({ isCurrencySwithcerVisible: !this.state.isCurrencySwithcerVisible });
  };

  closeCurrency = () => {
    this.setState({ isCurrencySwithcerVisible: !this.state.isCurrencySwithcerVisible });
  };

  closeNavBarActionButtons = (e) => {
    const cartBtn = e.target.closest(".cartBtn") || null;
    const currBtn = e.target.closest(".currBtn") || null;

    if (cartBtn?.dataset.cart === "cartBtn") {
      return this.setState({
        isCurrencySwithcerVisible: false,
      });
    }

    if (currBtn?.dataset.currency === "currBtn") {
      return this.setState({
        isCartVisible: false,
      });
    }

    this.setState({ isCartVisible: false, isCurrencySwithcerVisible: false });
  };

  render() {
    const { categories = [], activeCategory, selectCategory, currency, cartItems = [] } = this.props.dataContext;

    //count number of items in the cart
    const cartItemsCount = cartItems.reduce((acc, curr) => (acc += curr.qty), 0);

    return (
      <header className="header">
        {this.state.isCartVisible && <MiniCartOverlay toggle={this.toggleCartVisiblity} />}

        {this.state.isCurrencySwithcerVisible && <CurrencySwitcher closeCurrency={this.closeCurrency} />}

        <nav onClick={this.closeNavBarActionButtons}>
          <div className="container nav__container">
            <ul className="nav__links">
              {categories.length > 0 &&
                categories.map((c) => {
                  const navClasses = c === activeCategory ? "nav__link  nav__link-active" : "nav__link";
                  return (
                    <Link key={c} to="/">
                      <li className={navClasses} onClick={() => selectCategory(c)}>
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
              <div className="currBtn nav__action" data-currency="currBtn" onClick={this.toggleCurrency}>
                {currency.symbol}
                {this.state.isCurrencySwithcerVisible ? <p className="up">⌃</p> : <p>⌄</p>}
              </div>

              <div className="nav__action cartBtn" onClick={this.toggleCartVisiblity} data-cart="cartBtn">
                <img src={cart} alt="cart" />
                <span>{cartItemsCount}</span>;
              </div>
            </div>
          </div>
        </nav>
      </header>
    );
  }
}

export default withDataContext(Navbar);

// export default Navbar;
// Navbar.contextType = DataContext;
