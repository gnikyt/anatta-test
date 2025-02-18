// function fetchProducts(name, cursor = undefined) {

// }

/**
 * Sorter uses the client to query products based on the name input.
 * It will then sort the products' variants by price and return an object
 * containing a list of those products sorted by price low to high.
 * We could've passed in a list of products to sort, however, for test-case
 * purposes, this time, we'll just directly use the client.
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
    
    for (const { node: { variants, title: pTitle } } of products) {
      for (const { node: { price, title: vTitle } } of variants.edges) {
        sorted.push({
          title: pTitle,
          variant: vTitle,
          price: Number(price),
        });
      }
    }
  } while (hasMore);

  sorted.sort((a, b) => {
    if (a.price > b.price) {
      return 1;
    }
    if (a.price < b.price) {
      return -1;
    }
    return 0;
  });
  return sorted;
}