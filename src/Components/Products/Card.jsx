import React, { Component } from "react";
import cartIcon from "./icons/Circle Icon.svg";
import heart from "./icons/heart.png";
import { Link } from "react-router-dom";
export class Card extends Component {
  render() {
    const { addToCart, currency, id, name, brand, gallery, prices, inStock, isFavorite, inCart, hasDiscounts } =
      this.props;

    const { label = "USD" } = currency;
    const [price] = prices.filter((p) => p.currency.label === label);
    const hasDiscount = hasDiscounts.filter((item) => item.id === id);
    const cartClasses = inCart && inStock ? "card__cart show" : !inStock ? "card__cart hide" : "card__cart";
    return (
      <div className="card">
        <Link to={`product?id=${id}&cur=${label}`}>
          <div className="card_img">
            <img src={gallery[0]} alt="product B" className="img" />
            {!inStock && <p className="card__no-stock">Out of stock</p>}
          </div>
        </Link>
        {hasDiscount.length > 0 && <div className="cart__discount">-{hasDiscount[0].rate}</div>}

        {isFavorite && (
          <div className="cart_favorite">
            <img src={heart} alt="favorite" />
          </div>
        )}
        <div className="card__info">
          <div className={cartClasses} onClick={() => addToCart(id)}>
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
