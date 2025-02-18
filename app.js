import { parseArgs, usageDisplay } from "./cli.js";
import Client from "./shopify/client.js";
import ShopDomain from "./shopify/domain.js";

/**
 * Boot simply does some checks on the arguments to ensure we can continue.
 * It will return the arguments.
 * @throws Error if missing required arguments.
 * @returns {Object}
 */
function boot() {
  const args = parseArgs();
  if (Object.keys(args).length === 0) {
    throw new Error("missing all inputs");
  }

  if (!args.token) {
    throw new Error("missing Shopify API token input");
  }

  if (!args.name) {
    throw new Error("missing partial product name input");
  }

  return args;
}

async function main() {
  let args;
  try {
    args = boot();
  } catch (e) {
    console.log(`Error: ${e.message}.\n${usageDisplay()}`);
    process.exit(1);
  }

  const client = Client(ShopDomain("quickstart-20a6d55c"), args.token);
  const products = await client.productsByTitle("snow");
  console.log(products);
}

main();