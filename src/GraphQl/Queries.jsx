export const URL = "http://localhost:4000/";

export const GET_CURRENCIES = `
  query {
    currencies {
      symbol
      label
    }
  }
`;

export const GET_CATEGORIES = `
  query {
    categories {
      name
    }
  }
`;

export const GET_PRODUCTS = (c) => {
  return `
    query {
      category(input: { title: "${c}" }) {
        name
        products {
          id
          name
          description
          brand
          inStock
          attributes {
            name
            type
            items {
              value
            }
          }
            prices {
            amount
            currency {
              label
              symbol
            }
          }

          gallery
        }
      }
    }
  `;
};

export const GET_PRODUCTS_BY_ID = (id) => {
  return `
    query {
      product(id: "${id}") {
        id
        name
        brand
        attributes {
          name
          type
          items {
            value
          }
        }
        prices {
          amount
          currency {
            label
            symbol
          }
        }

        gallery
      }
    }
  `;
};
