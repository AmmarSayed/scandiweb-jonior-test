import React, { Component } from "react";

export class Attribute extends Component {
  render() {
    const { selectedAttributes, isSelected = null, modifyAttribute, cartItemId, name, type, attrItems } = this.props;
    return (
      <div key={name} className="cart-item__info__attribute">
        <p className="attribute">{name}:</p>
        <ul>
          {attrItems.map((item) => {
            const listStyle = type === "swatch" ? "color" : "";
            const content = type === "swatch" ? "" : item.value;
            const bgColor = type === "swatch" ? item.value : "";
            const attrObject = { name, type, items: item };
            const isSelectedAttribute = !isSelected ? false : isSelected(attrObject, selectedAttributes);
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
  }
}

export default Attribute;
