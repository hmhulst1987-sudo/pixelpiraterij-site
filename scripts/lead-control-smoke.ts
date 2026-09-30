import assert from "node:assert/strict";
import { randomUUID } from "node:crypto";
import { leadPool, reserveLeadUsage, finishLeadUsage, reservePreviewRequest, finishPreviewRequest, usagePeriod } from "../src/lib/lead-control.ts";

const url = new URL(process.env.LEADS_DATABASE_URL || "postgres://invalid/");
if (url.hostname !== "127.0.0.1" || url.port !== "15432" || url.pathname !== "/lead_studio_test") {
  throw new Error("This integration test only runs against the isolated lead_studio_test database through the local SSH tunnel.");
}

async function main() {
const pool = leadPool();
try {
  await pool.query("TRUNCATE lead_usage CASCADE");
  await pool.query("UPDATE lead_control SET mode = 'paused', places_limit = 1, previews_limit = 1 WHERE id = 1");

  await assert.rejects(() => reserveLeadUsage("places", 1, true), { status: 423 });
  await pool.query("UPDATE lead_control SET mode = 'running' WHERE id = 1");
  const concurrent = await Promise.allSettled([reserveLeadUsage("places"), reserveLeadUsage("places")]);
  const accepted = concurrent.filter((result) => result.status === "fulfilled");
  const denied = concurrent.filter((result) => result.status === "rejected");
  assert.equal(accepted.length, 1, "Only one concurrent reservation may pass the cap");
  assert.equal(denied.length, 1);
  assert.equal(denied[0].status === "rejected" && denied[0].reason.status, 429);
  if (accepted[0].status !== "fulfilled") throw new Error("Missing accepted reservation");
  await finishLeadUsage(accepted[0].value, false, 503);
  await assert.rejects(() => reserveLeadUsage("places"), { status: 429 });
  const usage = await pool.query("SELECT COALESCE(SUM(units), 0)::int AS total FROM lead_usage WHERE period = $1 AND kind = 'places'", [usagePeriod()]);
  assert.equal(usage.rows[0].total, 1, "A failed provider request still consumes the conservative cap");

  await pool.query("UPDATE lead_control SET mode = 'paused' WHERE id = 1");
  const requestKey = randomUUID();
  const digest = "a".repeat(64);
  const first = await reservePreviewRequest(requestKey, digest);
  const retry = await reservePreviewRequest(requestKey, digest);
  assert.equal(retry.usageId, first.usageId, "Retry must not consume another preview unit");
  await assert.rejects(() => reservePreviewRequest(requestKey, "b".repeat(64)), { status: 409 });
  await assert.rejects(() => reservePreviewRequest(randomUUID(), digest), { status: 429 });
  const path = "/preview/lead-control-smoke/";
  assert.equal(await finishPreviewRequest(requestKey, first.usageId, path), path);
  assert.equal((await reservePreviewRequest(requestKey, digest)).previewPath, path);
  await assert.rejects(() => finishPreviewRequest(requestKey, first.usageId, "/preview/different-result/"), { status: 409 });
  process.stdout.write("Lead control smoke passed: pause, concurrent hard cap, failed usage and idempotent preview.\n");
} finally {
  await pool.query("UPDATE lead_control SET mode = 'paused', places_limit = 100, previews_limit = 10 WHERE id = 1");
  await pool.query("TRUNCATE lead_usage CASCADE");
  await pool.end();
}
}

main().catch((error) => {
  process.stderr.write(`${String(error)}\n`);
  process.exitCode = 1;
});
