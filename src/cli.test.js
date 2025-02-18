import assert from "node:assert";
import { describe, it } from "node:test";
import { parseArgs } from "./cli.js";

describe("cli", () => {
  it("should parse args fully", () => {
    const args = parseArgs(["node", "app.js", "-name", "'snow'", "-token", "abc123"]);
    assert.strictEqual(args.name, "snow");
    assert.strictEqual(args.token, "abc123");
    assert.strictEqual(args.has("name"), true);
    assert.strictEqual(args.has("token"), true);
    assert.strictEqual(args.has("help"), false);
  });
});
