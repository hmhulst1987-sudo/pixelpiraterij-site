import assert from "node:assert/strict";
import test from "node:test";
import { NextRequest } from "next/server";
import { POST } from "../src/app/api/leads/outreach/send/route.ts";

test("outreach send requires an explicit manual action", async () => {
  const request = new NextRequest("http://localhost/api/leads/outreach/send", { method: "POST" });
  const response = await POST(request);
  assert.equal(response.status, 403);
});

test("outreach remains disabled without the server-side enable flag", async () => {
  const previous = process.env.LEADS_OUTREACH_ENABLED;
  process.env.LEADS_OUTREACH_ENABLED = "false";
  try {
    const request = new NextRequest("http://localhost/api/leads/outreach/send", {
      method: "POST",
      headers: { "x-lead-manual-send": "confirmed" },
    });
    const response = await POST(request);
    assert.equal(response.status, 503);
  } finally {
    if (previous === undefined) delete process.env.LEADS_OUTREACH_ENABLED;
    else process.env.LEADS_OUTREACH_ENABLED = previous;
  }
});
