import assert from "node:assert/strict";
import test from "node:test";
import { withPreviewBaseHref } from "./preview-html";

test("preview assets stay inside their private ID after Next removes the trailing slash", () => {
  const html = withPreviewBaseHref('<html><head><script src="./business.js"></script></head></html>', "bakery-123");
  assert.match(html, /<head><base href="\/studio\/leads\/previews\/bakery-123\/">/);
  assert.equal(new URL("./business.js", "https://pixelpiraterij.nl/studio/leads/previews/bakery-123/").pathname,
    "/studio/leads/previews/bakery-123/business.js");
});
