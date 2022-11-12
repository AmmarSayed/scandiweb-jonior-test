import React, { Component } from "react";
import cartIcon from "./icons/Circle Icon.svg";
import heart from "./icons/heart.png";
import * as styles from "./Card.module.css";
import { Link } from "react-router-dom";
export class Card extends Component {
  render() {
    //isFavorite, inCart, hasDiscounts
    const { id, cartCurrency, prices, gallery, name, brand, addItem, attributes, inStock } = this.props;

    const price = prices.find((p) => p.currency.label === cartCurrency);

    // const hasDiscount = hasDiscounts.filter((item) => item.id === id);
    const cartClasses = !inStock ? `${styles.card__cart} ${styles.hide}` : styles.card__cart;

    return (
      <div className={styles.card}>
        <Link to={`product?id=${id}`}>
          <div className={styles.card_img}>
            <img src={gallery[0]} alt="product B" className={`img ${inStock ? "" : styles.imgOut}`} />

            {!inStock && <p className={styles.card__no_stock}>Out of stock</p>}
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
        <div className={styles.card__info}>
          <div className={cartClasses} onClick={() => addItem({ id, gallery, attributes, prices, name, brand })}>
            <img src={cartIcon} alt="cart" />
          </div>
          <p className={styles.card__title}>
            {brand} - {name}
          </p>
          <p>
            <span>{price.currency.symbol}</span> {price?.amount || 0}
          </p>
        </div>
      </div>
    );
  }
}

export default Card;
