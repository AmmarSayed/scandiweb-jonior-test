import React, { Component } from "react";

import { getSingleProduct } from "../features/singleProduct/singleProductsSlice";
import { connect } from "react-redux";
import AttributeSingleProduct from "../Components/MiniCart/AttributeSingleProduct";
import { selectAttribute } from "../features/singleProduct/singleProductsSlice";
import { addItem, cartError } from "../features/cart/cartSlice";
export class ProductDescriptionPage extends Component {
  componentDidMount = function () {
    const { searchParams } = new URL(window.location.href);
    const pId = searchParams.get("id");
    this.props.getSingleProduct(pId);
  };

  render() {
    const { selectAttribute, addItem, cartError } = this.props;
    const { single_product_loading, single_product_item, selected_attributes } = this.props.store.singleProduct;
    const { id, prices, gallery, name, brand, attributes, description } = single_product_item;
    const { active_currency } = this.props.store.products;
    const price = single_product_loading ? null : prices.find((p) => p.currency.label === active_currency);
    const { cart_error } = this.props.store.cart;
    return (
      <section className="section container product-page">
        {single_product_loading && <div className="loading"></div>}

        {!single_product_loading && (
          <div>
            <div className="product-tiles"></div>
            <div className="product-info">
              <div className="product-image">
                <img src={gallery[0]} alt={name} />
              </div>
              <div className="product-item-details">
                <div className="cart-item__info">
                  <h5 className="brand">{brand}</h5>
                  <h5>{name}</h5>
                  <p>
                    <b>
                      {price?.currency?.symbol}
                      {price?.amount}
                    </b>
                  </p>
                  {attributes.map((attr) => {
                    return (
                      <AttributeSingleProduct
                        selectedAttributes={selected_attributes}
                        key={attr.name}
                        attr={attr}
                        select={selectAttribute}
                      />
                    );
                  })}
                </div>
              </div>
              <button
                className="btn btn-primary btn-block"
                onClick={() => {
                  if (Object.keys(selected_attributes).length !== attributes.length) {
                    cartError("please choose an attribute!");
                    return;
                  }

                  addItem({ id, attributes, selected_attributes, prices, gallery });
                  cartError(null);
                }}
              >
                Add to cart
              </button>
              {cart_error && <p className="alert-danger">{cart_error}</p>}

              <div className="product discription" dangerouslySetInnerHTML={{ __html: description }} />
            </div>
          </div>
        )}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { getSingleProduct, selectAttribute, addItem, cartError };

export default connect(mapStateToProps, mapActionsToProps)(ProductDescriptionPage);
