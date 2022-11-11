import React, { Component } from "react";
import cartIcon from "./icons/Circle Icon.svg";
import heart from "./icons/heart.png";
import { Link } from "react-router-dom";
export class Card extends Component {
  render() {
    //isFavorite, inCart, hasDiscounts
    const { id, currency, prices, gallery, name, brand, addItem, attributes, inStock } = this.props;
    const { label = "USD" } = currency;

    const [price] = prices.filter((p) => p.currency.label === label);

    // const hasDiscount = hasDiscounts.filter((item) => item.id === id);
    const cartClasses = !inStock ? "card__cart hide" : "card__cart";
    return (
      <div className="card">
        <Link to={`product?id=${id}&cur=${label}`}>
          <div className="card_img">
            <img src={gallery[0]} alt="product B" className="img" />

            {!inStock && <p className="card__no-stock">Out of stock</p>}
          </div>
        </Link>

        {/* 
        
        {hasDiscount.length > 0 && <div className="cart__discount">-{hasDiscount[0].rate}</div>}  

        {isFavorite && (
          <div className="cart_favorite">
            <img src={heart} alt="favorite" />
          </div>
        )}

        */}
        <div className="card__info">
          <div className={cartClasses} onClick={() => addItem({ id, gallery, attributes, prices, name, brand })}>
            <img src={cartIcon} alt="cart" />
          </div>
          <p className="cart__title">
            {brand} - {name}
          </p>
          <p className="cart__price">
            <span>{price.currency.symbol}</span> {price.amount}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
