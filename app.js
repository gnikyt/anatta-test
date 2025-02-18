import { parseArgs, usageDisplay } from "./src/cli.js";
import Client from "./src/shopify/client.js";
import ShopDomain from "./src/shopify/domain.js";
import sorter from "./src/sorter.js";

/**
 * Boot simply does some checks on the arguments to ensure we can continue.
 * It will return the arguments.
 * @throws Error if missing required arguments.
 * @returns {Object}
 */
function boot() {
  const args = parseArgs();
  if (Object.keys(args).length === 0) {
    throw new Error("missing all required inputs");
  }

  if (args.has("help")) {
    return args;
  }

  if (!args.has("token")) {
    throw new Error("missing Shopify API token input");
  }

  if (!args.has("name")) {
    throw new Error("missing partial product name input");
  }

  return args;
}

/**
 * Main runner.
 * @returns {Promise<void>}
 */
async function main() {
  let args;
  try {
    args = boot();
  } catch (e) {
    console.error(`Error: ${e.message}.\n${usageDisplay()}`);
    process.exit(1);
  }

  if (args.has("help")) {
    console.log(usageDisplay());
    process.exit(0);
  }

  // Init the Shopify GraphQL client then grab all matching products, sorting them
  const client = Client(ShopDomain("anatta-test-store"), args.token);
  const items = await sorter(client, args.name);

  // Format the output and display
  const fmted = items.map(({ title, variant, price }) => `${title} - variant ${variant} - price $${price}`);
  if (fmted.length === 0) {
    console.error(`No products found matching "${args.name}".`);
  }
  console.log(fmted.join("\n"));
}

main();