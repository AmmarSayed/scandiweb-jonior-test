import React, { Component } from "react";
import logo from "./icons/logo.svg";
import cartIcon from "./icons/Empty Cart.svg";
import withDataContext from "../../Context/DataContextProvider";
import MiniCartOverlay from "../MiniCart/MiniCartOverlay";
import CurrencySwitcher from "../CurrencySwitcher/CurrencySwitcher";
import { Link } from "react-router-dom";
import store from "../../app/store";
import { connect } from "react-redux";
import { toggleCartVisibility } from "../../features/cart/cartSlice";

export class Navbar extends Component {
  /*
  closeCurrency = () => {
    this.setState({ isCurrencySwithcerVisible: !this.state.isCurrencySwithcerVisible });
  };

*/

  closeNavBarActionButtons = (e) => {
    const cartBtn = e.target.closest(".cartBtn") || null;
    const currBtn = e.target.closest(".currBtn") || null;

    /*
  if (cartBtn?.dataset.cart === "cartBtn") {
    return this.setState({
      isCurrencySwithcerVisible: false,
    });
  }

  if (currBtn?.dataset.currency === "currBtn") {
    return this.setState({
      isCartVisible: false,
    });
    */
  };

  render() {
    const { cart } = this.props.store;

    const { cartItemsCount, isCartVisible } = cart;
    const { toggleCartVisibility } = this.props;

    return (
      <header className="header">
        {isCartVisible && <MiniCartOverlay toggle={toggleCartVisibility} />}
        {/* 
        {this.state.isCurrencySwithcerVisible && <CurrencySwitcher closeCurrency={this.closeCurrency} />}
        
        */}

        <nav>
          <div className="container nav__container">
            <ul className="nav__links"></ul>
            <div className="nav__logo">
              <img src={logo} alt="logo" />
            </div>

            <div className="nav__actions">
              <div className="currBtn nav__action" data-currency="currBtn"></div>

              <div
                className="nav__action cartBtn"
                data-cart="cartBtn"
                onClick={() => {
                  this.props.toggleCartVisibility();
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

const mapActionsToProps = { toggleCartVisibility };

export default connect(mapStateToProps, mapActionsToProps)(Navbar);

// export default Navbar;
// Navbar.contextType = DataContext;
