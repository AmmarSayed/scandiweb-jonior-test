import React, { Component } from "react";

import Attribute from "../Components/MiniCart/Attribute";
import { getSingleProduct } from "../features/singleProduct/singleProductsSlice";
import { connect } from "react-redux";

export class ProductDescriptionPage extends Component {
  state = {
    loading: true,
    product: {},
    currencyLabel: "USD",
  };

  componentDidMount = function () {
    const { searchParams } = new URL(window.location.href);
    const pId = searchParams.get("id");
    this.props.getSingleProduct(pId);
  };

  /*

  componentDidUpdate = function (_, prevState) {
    if (prevState.product?.id !== this.state.product.id) {
      this.setState({ loading: false });
    }
    console.log(this.state.product);
  };
*/
  render() {
    /*


    const { modifyAttribute } = this.props.dataContext;
    const price = this.state.loading
      ? { amount: 0, currency: { label: "USD", symbol: "$" } }
      : this.state.product.prices.find((p) => p.currency.label === this.state.currencyLabel);

      */
    return (
      <section className="section container product-page">
        {/* 
        
  
        {this.state.loading && <div className="loading"></div>}

        {!this.state.loading && (
          <div>
            <div className="product-tiles"></div>
            <div className="product-info">
              <div className="product-image">
                <img src={this.state.product.gallery[0]} alt={this.state.product.name} />
              </div>
              <div className="product-item-details">
                <div className="cart-item__info">
                  <h5 className="brand">{this.state.product.brand}</h5>
                  <h5>{this.state.product.name}</h5>
                  <p>
                    <b>
                      {price?.currency?.symbol}
                      {price?.amount}
                    </b>
                  </p>

                  {this.state.product.attributes.length > 0 &&
                    this.state.product.attributes
                      .sort((a, b) => {
                        return a.name - b.name;
                      })
                      .map((attr) => {
                        return (
                          <Attribute
                            key={attr.name}
                            selectedAttributes={null}
                            modifyAttribute={modifyAttribute}
                            name={attr.name}
                            type={attr.type}
                            attrItems={attr.items}
                          />
                        );
                      })}
                </div>
              </div>
              <button className="btn btn-primary btn-block">Add to cart</button>

              <p className="product discription"></p>
            </div>
          </div>
        )}

              */}
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  store: state,
});

const mapActionsToProps = { getSingleProduct };

export default connect(mapStateToProps, mapActionsToProps)(ProductDescriptionPage);
