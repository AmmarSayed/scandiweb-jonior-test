import React, { Component } from "react";
import Card from "../Components/Products/Card";
// import DataContext, { withDataContext } from "../Context/DataContextProvider";

import withDataContext from "../Context/DataContextProvider";

export class ProductsCategoryPage extends Component {
  render() {
    // const { currency, favorits, cartItems } = this.context;
    // const products = this.context.products.products || [];

    const { currency, favorits, cartItems, addToCart } = this.props.dataContext;
    const products = this.props.dataContext.products.products || [];

    return (
      <div className="container">
        <section className="section">
          <h1>Category page</h1>
          <div className="products">
            {products.map((product) => (
              <Card
                key={product.id}
                {...product}
                currency={currency}
                isFavorite={favorits.includes(product.id)}
                inCart={cartItems.map((item) => item.id).includes(product.id)}
                addToCart={addToCart}
              />
            ))}
          </div>
        </section>
      </div>
    );
  }
}

export default withDataContext(ProductsCategoryPage);

// export default ProductsCategoryPage;
// ProductsCategoryPage.contextType = DataContext;
