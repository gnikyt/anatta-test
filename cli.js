/**
 * Parses CLI arguments by grouping them into pairs.
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
      args[lastKey] = pargs[i].trim();
    } else {
      lastKey = pargs[i].trim().substring(1);
      args[lastKey] = undefined;
    }
  }
  return args;
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