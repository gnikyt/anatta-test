import fs from "fs/promises";
import assert from "node:assert";
import { describe, it, mock } from "node:test";
import ShopifyClient from "./client.js";
import ShopDomain from "./domain.js";

describe("ShopifyClient service", () => {
  it("should throw error for non-shopdomain object", () => {
    assert.throws(() => ShopifyClient("example", "abc123"), {
      message: "expected ShopDomain object for store value",
    });
  });

  it("should throw error for missing token", () => {
    assert.throws(() => ShopifyClient(ShopDomain("example")), {
      message: "missing token value",
    });
  });


  it("should fetch products by title", async () => {
    // Setup base client
    const client = ShopifyClient(ShopDomain("example"), "abc123");
    
    // Override the `request` method... this very crude and simple for time sake
    mock.method(client, "request", async function mockRequest(query, variables = {}) {
      const data = await fs.readFile("fixture/products-page1.json", { encoding: "utf8" });
      return JSON.parse(data);
    });

    const { products, pageInfo } = await client.productsByTitle("snow");
    assert.strictEqual(products.length > 0, true);
    assert.strictEqual(pageInfo.hasNextPage, true);
  });
});
