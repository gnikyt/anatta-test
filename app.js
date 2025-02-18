import { parseArgs, usageDisplay } from "./cli.js";
import Client from "./shopify/client.js";
import ShopDomain from "./shopify/domain.js";

function boot() {
  const args = parseArgs();
  if (Object.keys(args).length === 0) {
    console.log(usageDisplay());
    process.exit(1);
  }

  if (!args.token) {
    console.log(`Error: Missing API token input.\n${usageDisplay()}`);
    process.exit(1);
  }

  if (!args.name) {
    console.log(`Error: Missing partial product name input.\n${usageDisplay()}`);
    process.exit(1);
  }
}

async function main() {
  const args = boot();

  const client = Client(ShopDomain("quickstart-20a6d55c"), args[token]);
  const products = await client.productsByTitle("snow");
  console.log(products);
}

main();