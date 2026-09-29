import assert from "node:assert/strict";
import test from "node:test";
import { estimatedGrossMapsUsd } from "../src/lib/lead-control-shared";

test("gross Maps list estimate uses Enterprise Nearby and Geocoding rates", () => {
  assert.equal(estimatedGrossMapsUsd(100, 25), 3.63);
  assert.equal(estimatedGrossMapsUsd(0, 0), 0);
});
