import axios from "axios";
import * as graphQl from "../GraphQl/Queries";
import { current } from "@reduxjs/toolkit";

export function compareAttr(attr1, attr2) {
  const { items, name } = attr1;
  const isSameAttrName = attr2.name === name;
  const isSameAttrValue = attr2.items.value === items.value;
  const validity = isSameAttrName && isSameAttrType && isSameAttrValue;

  return validity;
}

// test if an attribute is selected
export const isSelected = (selectedAttr, listOfSelectedAttributes) => {
  // const isSelected = items.filter((i) => i.value === selectedAttr.value);
  /*
  console.log(listOfSelectedAttributes);
  const isSelected =
    listOfSelectedAttributes.filter((attr) => {
      return compareAttr(attr, attrObject);
    }).length > 0;
  return isSelected;

  */
};

export const compareTwoItems = (item1, item2) => {
  const sameID = item1.id === item2.id;
  if (!sameID) return;

  const sameAttributes = item1.selectedAttributes
    .map((item1Attr) => {
      // get the same attribute for item 2
      const item2Attr = item2.selectedAttributes.filter((attr2) => attr2.name === item1Attr.name)[0];

      return compareAttr(item1Attr, item2Attr);
    })
    .every((item) => item === true);

  const isValid = sameID && sameAttributes;
  return isValid;
};

export const getProduct = async (id) => {
  const query = graphQl.GET_PRODUCTS_BY_ID(id);
  const {
    data: { data },
  } = await axios.post(graphQl.URL, {
    query,
  });
  return data;
};

export const addToCart = (cartItems = [], product) => {
  const { id, attributes } = product;

  const selectedAttributes =
    attributes.length > 0 ? attributes.map((attr) => ({ name: attr.name, value: attr.items[0].value })) : null; //set first attribute as default

  // generate Id
  const attrId = selectedAttributes.map((i) => `-${i.name}-${i.value}`).join("");
  const cart_item_id = `${id}${attrId}`;

  const attributesObj = selectedAttributes.reduce((prev, curr) => {
    const newObj = { [curr.name]: curr.value };
    return { ...prev, ...newObj };
  }, {});

  const tempItem = cartItems.find((i) => i.cart_item_id === cart_item_id);

  if (!tempItem) {
    const newItem = {
      ...product,
      cart_item_id,
      qty: 1,
      selectedAttributes: attributesObj,
    };
    return [...cartItems, newItem];
  }

  // update the qty if similar item exists
  const newItems = cartItems.map((item) => {
    if (item.cart_item_id === cart_item_id) item.qty += 1;
    return item;
  });

  return [...newItems];
};
