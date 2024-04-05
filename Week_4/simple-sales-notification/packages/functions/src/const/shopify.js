export const SHOPIFY_API_VERSION = '2024-01';
export const SHOPIFY_MAX_RETRY = 5;
export const QUERY_ORDERS_INITIALIZE = `
query {
    orders(first: 30 sortKey: CREATED_AT) {
      edges {
        node {
          id
          billingAddress {
            city
            country
            firstName
          } 
          createdAt
          lineItems(first: 1) {
           nodes {
             id
             name
             image {
               url
             }
             product {
               id
               handle
               title
              
             }
           }
         }
        }
      }
    }
  }
`;
