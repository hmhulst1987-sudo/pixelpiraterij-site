import assert from "node:assert/strict";
import test from "node:test";
import { deepAuditWebsite } from "../src/lib/firecrawl-lead-audit.ts";

test("deep audits use basic proxy so one reserved unit cannot become an enhanced-proxy charge", async () => {
  const requests: Array<Record<string, unknown>> = [];
  const fakeFetch: typeof fetch = async (_input, init) => {
    requests.push(JSON.parse(String(init?.body)));
    return new Response(JSON.stringify({ success: true, data: { markdown: "Contact us", metadata: { title: "Test", statusCode: 200 } } }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  };

  await deepAuditWebsite("https://1.1.1.1/", undefined, "test-key", fakeFetch);
  assert.equal(requests.length, 2);
  assert.ok(requests.every((request) => request.proxy === "basic"));
});
