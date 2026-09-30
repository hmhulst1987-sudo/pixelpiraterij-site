import assert from "node:assert/strict";
import test from "node:test";
import { isSameLeadOrigin } from "../src/lib/lead-origin.ts";

test("browser origin follows the requested host, not Next's internal hostname", () => {
  assert.equal(isSameLeadOrigin("http://127.0.0.1:18002", "127.0.0.1:18002", "http"), true);
  assert.equal(isSameLeadOrigin("http://localhost:3400", "localhost:3400", "http:"), true);
  assert.equal(isSameLeadOrigin("https://example.com", "example.com", "https"), true);
  assert.equal(isSameLeadOrigin("https://other.example", "example.com", "https"), false);
  assert.equal(isSameLeadOrigin("http://example.com", "example.com", "https"), false);
  assert.equal(isSameLeadOrigin("null", "example.com", "https"), false);
  assert.equal(isSameLeadOrigin(null, "example.com", "https"), false);
});
