import { before, describe, it, mock } from "node:test";
import assert from "node:assert";
import fs from "fs/promises";
import ShopDomain from "./shopify/domain.js";
import ShopifyClient from "./shopify/client.js";

describe("sorter", () => {
  // Setup base client
  const client = ShopifyClient(ShopDomain("example"), "abc123");

  before(() => {
    // Override the `request` method... this very crude and simple for time sake
    mock.method(client, "request", async function mockRequest(query, variables = {}) {
      const src = query.includes("cursor: ") ? "fixture/products-page2.json" : "fixture/products-page1.json";
      const data = await fs.readFile(src, { encoding: "utf8" });
      return JSON.parse(data);
    });
  });

  it("should sort products", async () => {
    console.log(await client.productsByTitle("snow"));
  });
});
