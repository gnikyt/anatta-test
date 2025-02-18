/**
 * Parses CLI arguments by grouping them into pairs.
 * Simply opted to do this manually for this instance instead of Node's builtin.
 * @param {Array<string>} src Source for arguments to parse.
 * @returns {Object}
 */
export function parseArgs(src = process.argv) {
  // Remove the node path and script path
  const pargs = [...src].slice(2);

  // Loop to build a k/v pair of arguments
  const args = {};
  let lastKey = "";
  for (let i = 0, n = pargs.length; i < n; i += 1) {
    if (i % 2 !== 0) {
      // Attempt to clean up value by removing quotes and trimming
      args[lastKey] = pargs[i].trim().replace(/"/g, "").replace(/'/g, "");
    } else {
      // Attempt to clean up key by removing the "-" (dash) and trimming
      lastKey = pargs[i].trim().substring(1);
      args[lastKey] = undefined;
    }
  }

  return {
    ...args,

    /**
     * Check for presence of a key.
     * @param {String} key Key to check presence of.
     * @returns {Boolean}
     */
    has(key) {
      return Object.keys(this).includes(key);
    },
  };
}

/**
 * Displays the usage for this CLI app.
 * @returns {String}
 */
export function usageDisplay() {
  return `
Display a list of products matching a partial product name input.

Usage:
  node app.js -name [partial product name] -token [Shopify API token]

Example:
  node app.js -name snow -token xyz123
  `;
}