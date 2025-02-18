// function fetchProducts(name, cursor = undefined) {

// }

/**
 * Sorter uses the client to query products based on the name input.
 * It will then sort the products' variants by price and return an object
 * containing a list of those products sorted by price low to high.
 * @param {ShopifyClient} client Shopify GraphQL API client instance. 
 * @param {String} name Partial product name to query products for.
 * @returns {Promise<Array<Object>>} 
 */
export default async function sorter(client, name) {
  let hasMore = true;
  let cursor;  
  const sorted = [];

  do {
    const { products, pageInfo } = await client.productsByTitle(name, cursor);
    hasMore = pageInfo.hasNextPage;
    cursor = pageInfo?.endCursor;
    sorted.push(...products);
  } while (hasMore);

  console.log(sorted);
}