import assert from "node:assert/strict";
import test from "node:test";
import { normalizeDutchPhone } from "../src/lib/lead-phone.ts";

test("normalizes Dutch national and international phone formats for suppression", () => {
  assert.equal(normalizeDutchPhone("06 12 34 56 78"), "+31612345678");
  assert.equal(normalizeDutchPhone("0031 (0)6 1234-5678"), null);
  assert.equal(normalizeDutchPhone("+31 6 1234 5678"), "+31612345678");
});

test("rejects invalid phone values", () => {
  for (const value of ["", "12345678", "+310612345678", "06abcdefghi", "+31612345678;rm"]) {
    assert.equal(normalizeDutchPhone(value), null, value);
  }
});
