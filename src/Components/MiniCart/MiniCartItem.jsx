import React, { Component } from "react";
import withDataContext from "../../Context/DataContextProvider";
import { isSelected } from "../../utils/utils";

export class MiniCartItem extends Component {
  render() {
    const { cartItemId, name, brand, prices, attributes, gallery, selectedAttributes, qty } = this.props;
    const { currency, addItemCountInCart, substractItemCountInCart, modifyAttribute } = this.props.dataContext;
    const [price] = prices.filter((price) => price.currency.label === currency.label);

    return (
      <div className="cart-item">
        <div className="cart-item__info">
          <h4>{brand}</h4>
          <h5>{name}</h5>
          <p>
            <b>
              {price.currency.symbol}
              {price.amount}
            </b>
          </p>

          {attributes.length > 0 &&
            attributes.map((attr) => {
              const { name, type, items } = attr;

              return (
                <div key={name} className="cart-item__info__attribute">
                  <h5>{name}</h5>
                  <ul>
                    {items.map((item) => {
                      const listStyle = type === "swatch" ? "color" : "";
                      const content = type === "swatch" ? "" : item.value;
                      const bgColor = type === "swatch" ? item.value : "";
                      const attrObject = { name, type, items: item };
                      const isSelectedAttribute = isSelected(attrObject, selectedAttributes);
                      const classes = `${listStyle} ${isSelectedAttribute ? "active" : null}`;
                      return (
                        <li
                          key={item.value}
                          className={classes}
                          style={{ backgroundColor: bgColor }}
                          onClick={() => modifyAttribute(cartItemId, attrObject)}
                        >
                          {content}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
        </div>
        <div className="cart-item__controls">
          <button onClick={() => addItemCountInCart(cartItemId)}>+</button>
          <span>{qty}</span>
          <button onClick={() => substractItemCountInCart(cartItemId)}>-</button>
        </div>
        <div className="cart-item__image">
          <img src={gallery[0]} alt="product" className="img" />
        </div>
      </div>
    );
  }
}

export default withDataContext(MiniCartItem);
