import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { toggleCartVisibility } from "../../features/cart/cartSlice";

export class MiniCartOverlay extends Component {
  render() {
    const { cartItems, cartCurrency, cartTotalCost } = this.props.store.cart;
    const { toggleCartVisibility } = this.props;
    const len = cartItems.length;

    return (
      <div>
        <div className="cart-verlay__container">
          <h5>
            <b>my bag, </b>
            <span>{len > 1 ? `${len} items` : `${len} item`}</span>
          </h5>
          <div className="items">
            {/* 
            
            
            {cartItems.map((item) => {
              return <MiniCartItem key={item.id} {...item} />;
            })}
            
            */}
          </div>
          <div className="cart-overlay__total-price">
            <p>total</p>
            <p>
              {cartCurrency} {cartTotalCost}
            </p>
          </div>
          <div className="cart-overlay__actions">
            <button className=" btn btn-secondary" onClick={() => toggleCartVisibility()}>
              <Link to="cart">View Bag</Link>
            </button>
            <button className=" btn btn-primary" onClick={() => toggleCartVisibility()}>
              checkout
            </button>
          </div>
        </div>

        <div className="cart-overlay " onClick={() => toggleCartVisibility()}></div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { toggleCartVisibility };

export default connect(mapStateToProps, mapActionsToProps)(MiniCartOverlay);
