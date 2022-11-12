import React, { Component } from "react";
import * as styles from "./ProductDescriptionPage.module.css";
import { getSingleProduct } from "../features/singleProduct/singleProductsSlice";
import { connect } from "react-redux";
import AttributeSingleProduct from "../Components/MiniCart/AttributeSingleProduct";
import { selectAttribute } from "../features/singleProduct/singleProductsSlice";
import { addItem, cartError } from "../features/cart/cartSlice";
import ProductSlider from "../Components/SingleProduct/ProductSlider";
export class ProductDescriptionPage extends Component {
  componentDidMount = function () {
    const { searchParams } = new URL(window.location.href);
    const pId = searchParams.get("id");
    this.props.getSingleProduct(pId);
  };

  render() {
    const { selectAttribute, addItem, cartError } = this.props;
    const { single_product_loading, single_product_item, selected_attributes } = this.props.store.singleProduct;
    const { id, prices, gallery, name, brand, attributes, description, inStock } = single_product_item;
    const { cartCurrency } = this.props.store.cart;
    const price = single_product_loading ? null : prices.find((p) => p.currency.label === cartCurrency);
    const { cart_error } = this.props.store.cart;

    return (
      <section className="section container ">
        {single_product_loading && <div className="loading"></div>}

        {!single_product_loading && (
          <div className={styles.main}>
            <ProductSlider images={gallery} />
            <section className={styles.productInfo}>
              <h5 className={styles.brand}>{brand}</h5>
              <h5>{name}</h5>
              <p>
                Price:
                <span>
                  <br />
                  <b>
                    {price?.currency?.symbol}
                    {price?.amount}
                  </b>
                </span>
              </p>

              <div>
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
              <button
                className={`btn btn-primary btn-block ${inStock ? "" : styles.disabled}`}
                onClick={() => {
                  if (Object.keys(selected_attributes).length !== attributes.length) {
                    cartError("please choose an attribute!");
                    return;
                  }

                  addItem({ id, attributes, selected_attributes, prices, gallery, brand, name });
                  cartError(null);
                }}
                disabled={!inStock}
              >
                {inStock && "Add to cart"}
                {!inStock && "Out of Stock"}
              </button>
              {cart_error && <p className="alert-danger">{cart_error}</p>}

              <div className="product discription" dangerouslySetInnerHTML={{ __html: description }} />
            </section>
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
