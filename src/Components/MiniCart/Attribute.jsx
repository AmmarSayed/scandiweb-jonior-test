import React, { Component } from "react";
import { isSelected } from "../../utils/utils";

export class Attribute extends Component {
  render() {
    const { selectedAttributes, attr } = this.props;
    return (
      <div key={attr.name} className="cart-item__info__attribute">
        <p className="attribute">{attr.name}:</p>
        <ul>
          {attr.items.map((attrItem) => {
            const listStyle = attr.type === "swatch" ? "color" : "";
            const content = attr.type === "swatch" ? "" : attrItem.value;
            const bgColor = attr.type === "swatch" ? attrItem.value : "";

            const isSelectedAttribute = selectedAttributes ? selectedAttributes[attr.name] === attrItem.value : null;

            const classes = `${listStyle} ${isSelectedAttribute ? "active" : null}`;
            return (
              <li key={attrItem.value} className={classes} style={{ backgroundColor: bgColor }}>
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
