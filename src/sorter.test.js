import fs from "fs/promises";
import assert from "node:assert";
import { before, describe, it, mock } from "node:test";
import ShopifyClient from "./shopify/client.js";
import ShopDomain from "./shopify/domain.js";
import sorter from "./sorter.js";

describe("sorter", () => {
  // Setup base client
  const client = ShopifyClient(ShopDomain("example"), "abc123");

  before(() => {
    // Override the `request` method... this very crude and simple for time sake
    mock.method(client, "request", async function mockRequest(query, variables = {}) {
      const src = query.includes("after: ") ? "fixture/products-page2.json" : "fixture/products-page1.json";
      const data = await fs.readFile(src, { encoding: "utf8" });
      return JSON.parse(data);
    });
  });

  it("should sort products", async () => {
    const products = await sorter(client, "snow");
    const slice = products.slice(0, 5);
    const expected = [
      {
        title: "The Complete Snowboard",
        variant: "Powder",
        price: 99.95,
      },
      {
        title: "The Complete Snowboard",
        variant: "Electric",
        price: 100.95,
      },
      {
        title: "The Complete Snowboard",
        variant: "Sunset",
        price: 101.95,
      },
      {
        title: "The Collection Snowboard: Hydrogen",
        variant: "Default Title",
        price: 600,
      },
      {
        title: "The Archived Snowboard",
        variant: "Default Title",
        price: 629.95,
      },
    ];

    assert.deepEqual(slice, expected);
  });
});
