import React, { Component } from "react";
import withDataContext from "../../Context/DataContextProvider";
import { isSelected } from "../../utils/utils";
import Attribute from "./Attribute";

export class MiniCartItem extends Component {
  render() {
    const { cartItemId, name, brand, prices, attributes, gallery, selectedAttributes, qty, displayOnCartPage } =
      this.props;
    const { currency, addItemCountInCart, substractItemCountInCart, modifyAttribute } = this.props.dataContext;
    const [price] = prices.filter((price) => price.currency.label === currency.label);

    return (
      <div className={`cart-item ${displayOnCartPage ? "displayOnCartPage" : null}`}>
        <div className="cart-item__info">
          <h5 className="brand">{brand}</h5>
          <h5>{name}</h5>
          <p>
            <b>
              {price.currency.symbol}
              {price.amount}
            </b>
          </p>

          {attributes.length > 0 &&
            attributes
              .sort((a, b) => {
                return a.name - b.name;
              })
              .map((attr) => {
                return (
                  <Attribute
                    key={attr.name}
                    selectedAttributes={selectedAttributes}
                    modifyAttribute={modifyAttribute}
                    isSelected={isSelected}
                    cartItemId={cartItemId || null}
                    name={attr.name}
                    type={attr.type}
                    attrItems={attr.items}
                  />
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
