export function compareAttr(attr1, attr2) {
  const { items, name, type } = attr1;
  const isSameAttrName = attr2.name === name;
  const isSameAttrType = attr2.type === type;
  const isSameAttrValue = attr2.items.value === items.value;
  const validity = isSameAttrName && isSameAttrType && isSameAttrValue;

  return validity;
}

// test if an attribute is selected
export const isSelected = (testedAttr, listOfSelectedAttributes) => {
  const valid =
    listOfSelectedAttributes.filter((attr) => {
      return compareAttr(attr, testedAttr);
    }).length > 0;
  return valid;
};

export const compareTwoItems = (item1, item2) => {
  const sameID = item1.id === item2.id;

  const sameAttributes = item1.selectedAttributes
    .map((item1Attr) => {
      // get the same attribute from item 2
      const item2Attr = item2.selectedAttributes.filter((attr2) => attr2.name === item1Attr.name)[0];
      return compareAttr(item1Attr, item2Attr);
    })
    .every((item) => item === true);

  const validity = sameID && sameAttributes;
  return validity;
};

// Add to Cart function

export const addToCart = async (id) => {
  const query = graphQl.GET_PRODUCTS_BY_ID(id);
  const {
    data: { data },
  } = await axios.post(graphQl.URL, {
    query,
  });

  const selectedAttributes =
    data.product.attributes.length > 0
      ? data.product.attributes.map((attr) => ({ ...attr, items: attr.items[0] }))
      : null; //set first attribute as default

  const newProduct = {
    ...data.product,
    qty: 1,
    selectedAttributes,
  };

  // check if similar item exists
  const similarProducts = this.state.cartItems.filter((currentItem) => compareTwoItems(currentItem, newProduct));

  // update the qty if similar item exists
  if (similarProducts.length > 0) {
    const existingCartId = similarProducts[0].cartItemId;
    const newItems = this.state.cartItems.map((item) => {
      if (item.cartItemId === existingCartId) item.qty = item.qty + 1;
      return item;
    });
    this.setState({ cartItems: [...newItems] });
    return;
  }

  // create a new  Id to add item into the cart
  newProduct.cartItemId = new Date().getTime();
  // put a new item in cart
  this.setState({ cartItems: [...this.state.cartItems, newProduct] });
};
