// test if an attribute is selected
export const isSelected = (testedAttr, listOfSelectedAttributes) => {
  const valid =
    listOfSelectedAttributes.filter((attr) => {
      const isSameName = attr.name === testedAttr.name;
      const isSameType = attr.type === testedAttr.type;
      const isSameValue = attr.items.value === testedAttr.items?.value;
      return isSameName && isSameValue & isSameType;
    }).length > 0;
  return valid;
};
