import axios from "axios";
import * as graphQl from "../GraphQl/Queries";

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
  if (!sameID) return;

  const sameAttributes = item1.selectedAttributes
    .map((item1Attr) => {
      // get the same attribute for item 2
      const item2Attr = item2.selectedAttributes.filter((attr2) => attr2.name === item1Attr.name)[0];

      console.log(item1Attr);
      console.log(item2Attr);

      return compareAttr(item1Attr, item2Attr);
    })
    .every((item) => item === true);

  const validity = sameID && sameAttributes;
  return validity;
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
