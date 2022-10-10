import React, { Component } from "react";
import cartIcon from "./icons/Circle Icon.svg";
import heart from "./icons/heart.png";

export class Card extends Component {
  state = {
    id: null,
    name: false,
    inStock: false,
    isInCart: false,
  };

  render() {
    const { addToCart, currency, id, name, gallery, prices, inStock, isFavorite, inCart } = this.props;

    const { label = "USD" } = currency;
    const [price] = prices.filter((p) => p.currency.label === label);

    return (
      <div className="card" onClick={() => addToCart(id)}>
        <div className="card_img">
          <img src={gallery[0]} alt="product B" className="img" />
          {!inStock && <p className="card__no-stock">Out of stock</p>}
        </div>

        <div className="cart__discount">-50%</div>
        {isFavorite && (
          <div className="cart_favorite">
            <img src={heart} alt="favorite" />
          </div>
        )}
        <div className="card__info">
          {inCart && (
            <div className="card__cart">
              <img src={cartIcon} alt="cart" />
            </div>
          )}
          <p className="cart__title">{name}</p>
          <p className="cart__price">
            <span>{price.currency.symbol}</span> {price.amount}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
