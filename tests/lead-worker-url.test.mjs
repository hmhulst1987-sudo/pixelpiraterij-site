import test from "node:test";
import assert from "node:assert/strict";
import { validateSiteUrl } from "../scripts/lead-worker-url.mjs";

test("worker accepts HTTPS and local smoke-test origins", () => {
  assert.equal(validateSiteUrl("https://studio.example.com/").origin, "https://studio.example.com");
  assert.equal(validateSiteUrl("http://localhost:3000/").origin, "http://localhost:3000");
});

test("worker accepts only the explicitly configured private HTTP host", () => {
  assert.equal(validateSiteUrl("http://leads-site-staging:3000/", "leads-site-staging").hostname, "leads-site-staging");
  assert.throws(() => validateSiteUrl("http://other-service:3000/", "leads-site-staging"));
  assert.throws(() => validateSiteUrl("http://leads-site-staging:3000/"));
  assert.throws(() => validateSiteUrl("http://public.example.com/", "public.example.com"));
});

test("worker rejects credentials and non-origin URLs", () => {
  for (const url of ["https://user:secret@studio.example.com/", "https://studio.example.com/path", "https://studio.example.com/?token=x", "https://studio.example.com/#fragment"]) {
    assert.throws(() => validateSiteUrl(url));
  }
});
