import assert from "node:assert";
import { describe, it } from "node:test";
import ShopDomain from "./domain.js";

describe("ShopDomain value object", () => {
  it("should format without myshopify extension", () => {
    assert.strictEqual(String(ShopDomain("example")), "example.myshopify.com");
  });

  it("should format with myshopify extension", () => {
    assert.strictEqual(String(ShopDomain("example.myshopify.com")), "example.myshopify.com");
  });

  it("should match same", () => {
    const d1 = ShopDomain("example");
    const d2 = ShopDomain("example");
    const d3 = ShopDomain("outsider");

    assert.strictEqual(true, d1.isSame(d2));
    assert.strictEqual(false, d1.isSame(d3));
  });
});
