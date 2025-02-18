/**
 * Product GraphQL query generator.
 * @param {String} query Query to run for the products.
 * @param {Number} param1.first How many records to pull.
 * @param {String|undefined} param1.cursor Optional after cursor for records. 
 * @example
 *  const query = productQuery("title:*snow*", { first: 50 });
 * @returns {String}
 */
function productQuery(query, { first = 50, cursor = undefined } = {}) {
  const args = {
    first,
    query,
    after: undefined,
  };
  if (cursor) {
    args.after = cursor;
  }

  // Format the arguments for the GraphQL call
  const fmtArgs = Object.entries(args)
    .filter(([k,v ]) => v !== undefined)
    .map(([k, v]) => {
      return typeof v === "string" ? `${k}: "${v}"` : `${k}: ${v}`;
    })
    .join(", ");

  return `{
    products(${fmtArgs}) {
      edges {
        node {
          id
          title
          variants(first: 25) {
            edges {
              node {
                id
                title
                price
              }
            }
          }
        }
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }`;
}

/**
 * GraphQL client for communication with Shopify's API.
 * @param {ShopDomain} store Shopify store name ([name].myshopify.com).
 * @param {String} token Shopify API token. 
 * @param {String} param2.apiVersion Shopify API version.
 * @throws Error if shop is not supplied.
 * @throws Error if token is not supplied.
 * @example
 *   const client = ShopifyClient(ShopDomain("example"), "abc123");
 *   const products = await client.productsByTitle("snow");
 * @returns {Object} 
 */
export default function ShopifyClient(store, token, { apiVersion = "2025-01" } = {}) {
  if (!store.isSame) {
    throw new Error("expected ShopDomain object for store value");
  }
  if (!token || token.length === 0) {
    throw new Error("missing token value");
  }

  // Base URL for running netwrok requests
  const baseUrl = `https://${store}/admin/api/${apiVersion}/graphql.json`;

  return {
    /**
     * Run a GraphQL request to Shopify.
     * @param {String} query GraphQL query to run.
     * @param {Object} variables GraphQL variables for the query (optional).
     * @returns {Promise<Object>} 
     */
    async request(query, variables = {}) {
      const resp = await fetch(baseUrl, {
        method: "post",
        headers: {
          "content-type": "application/json",
          "x-shopify-access-token": token,
        },
        body: JSON.stringify({ query, variables }),
      });
      return resp.json();
    },

    /**
     * Get products by title.
     * A title input of "snow" will search for "*snow*".
     * @param {String} title Partial or full title to search for matching products.
     * @param {String} cursor Optional cursor.
     * @returns {Promise<Object>} Containing an object of `products` and `pageInfo`.
     */
    async productsByTitle(title, cursor = undefined) {
      const fmtTitle = title.toLowerCase().replace(/\*/g, "");
      const {
        data: {
          products: {
            pageInfo,
            edges: products,
          },
        },
      } = await this.request(productQuery(fmtTitle, { cursor, first: 50 }));
      return {
        products,
        pageInfo,
      };
    },
  };
}
