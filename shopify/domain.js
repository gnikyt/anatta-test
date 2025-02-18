/**
 * Value object which ensures shop domain is the full myshopify domain.
 * @param {String} shop Shopify domain.
 * @returns {Object}
 */
export default function ShopDomain(shop) {
  const suffix = ".myshopify.com";
  let fshop = shop;
  if (!fshop.includes(suffix)) {
    fshop = `${shop}${suffix}`;
  }

  return {
    /**
     * Full myshopify domain to string.
     * @returns {String}
     */
    toString() {
      return fshop;
    },

    /**
     * Compare this shop domain to another shop domain.
     * @param {String} val Value object to compare against.
     */
    isSame(val) {
      return val.toString() === fshop.toString();
    },

    /**
     * Length of the shop string.
     */
    length: fshop.length,
  };
}
