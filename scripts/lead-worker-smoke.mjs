import assert from "node:assert/strict";
import { spawn } from "node:child_process";
import http from "node:http";
import pg from "pg";

const databaseUrl = process.env.LEADS_DATABASE_URL;
if (!databaseUrl) throw new Error("Use only an isolated LEADS_DATABASE_URL for this smoke test.");
const pool = new pg.Pool({ connectionString: databaseUrl, max: 2 });
const testName = `worker-smoke-${Date.now()}`;
const calls = { nearby: 0, audit: 0, deep: 0, unexpected: 0 };
const audit = {
  url: "https://example.com", finalUrl: "https://example.com/", status: 200, score: 45,
  pagesChecked: [{ url: "https://example.com/", title: testName, status: 200 }],
  priorities: ["Mobiele viewport"], qualification: { opportunityScore: 70, size: "small-medium" },
};
const server = http.createServer(async (request, response) => {
  for await (const _chunk of request) { /* Drain the request body. */ }
  response.setHeader("Content-Type", "application/json");
  if (request.url === "/api/leads/nearby") {
    calls.nearby += 1;
    response.end(JSON.stringify({ places: [{ id: testName, websiteUri: "https://example.com", displayName: { text: testName } }], requestCount: 1 }));
  } else if (request.url === "/api/leads/audit") {
    calls.audit += 1;
    response.end(JSON.stringify({ audit }));
  } else if (request.url === "/api/leads/deep-audit") {
    calls.deep += 1;
    response.end(JSON.stringify({ audit: { website: "https://example.com/", requestsAttempted: 1, desktopScreenshot: null, mobileScreenshot: null, pages: [], findings: [], warnings: [] }, controlStatus: null }));
  } else {
    calls.unexpected += 1;
    response.writeHead(404);
    response.end(JSON.stringify({ error: "Unexpected route" }));
  }
});

function listen() {
  return new Promise((resolve) => server.listen(0, "::", () => resolve(server.address().port)));
}

async function waitFor(check, label, timeout = 30000) {
  const until = Date.now() + timeout;
  while (Date.now() < until) {
    if (await check()) return;
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Timed out waiting for ${label}. Calls: ${JSON.stringify(calls)}`);
}

function startWorker(port) {
  const child = spawn(process.execPath, ["scripts/lead-worker.mjs"], {
    env: { ...process.env, LEADS_SITE_URL: `http://localhost:${port}`, LEADS_WORKER_TOKEN: "worker-smoke-token-that-is-at-least-32-chars", LEADS_WORKER_POLL_MS: "5000" },
    stdio: ["ignore", "pipe", "pipe"],
  });
  child.stdout.on("data", (chunk) => process.stdout.write(chunk));
  child.stderr.on("data", (chunk) => process.stderr.write(chunk));
  return child;
}

async function stopWorker(child) {
  if (!child || child.exitCode !== null || child.signalCode !== null) return;
  child.kill("SIGTERM");
  await Promise.race([
    new Promise((resolve) => child.once("exit", resolve)),
    new Promise((_resolve, reject) => setTimeout(() => reject(new Error("Worker did not stop")), 10000)),
  ]);
}

let worker;
try {
  const port = await listen();
  const campaign = await pool.query("INSERT INTO lead_campaigns (label, latitude, longitude, radius_m, interval_minutes, max_candidates) VALUES ($1, 51.5719, 4.7683, 5000, 1440, 1) RETURNING id", [testName]);
  await pool.query("UPDATE lead_control SET mode = 'running' WHERE id = 1");
  worker = startWorker(port);

  await waitFor(async () => {
    const result = await pool.query("SELECT j.status FROM lead_deep_jobs j JOIN lead_candidates c ON c.id = j.candidate_id WHERE c.place_id = $1", [testName]);
    return result.rows[0]?.status === "completed";
  }, "one completed deep job");

  const candidate = await pool.query(`SELECT c.id, c.place_id, c.last_run_id, o.status AS mail_status, o.recipient_email,
    o.legal_basis, o.approved_at, o.body, COUNT(j.id)::int AS job_count
    FROM lead_candidates c JOIN lead_outreach o ON o.candidate_id = c.id
    LEFT JOIN lead_deep_jobs j ON j.candidate_id = c.id
    WHERE c.place_id = $1 GROUP BY c.id, o.status, o.recipient_email, o.legal_basis, o.approved_at, o.body`, [testName]);
  assert.equal(candidate.rows.length, 1);
  const run = await pool.query("SELECT campaign_id FROM lead_runs WHERE id = $1", [candidate.rows[0].last_run_id]);
  assert.equal(String(run.rows[0].campaign_id), String(campaign.rows[0].id));
  assert.equal(candidate.rows[0].job_count, 1);
  assert.equal(candidate.rows[0].mail_status, "draft");
  assert.equal(candidate.rows[0].recipient_email, null);
  assert.equal(candidate.rows[0].legal_basis, "none");
  assert.equal(candidate.rows[0].approved_at, null);
  assert.match(candidate.rows[0].body, /afmelden/i);
  assert.deepEqual(calls, { nearby: 1, audit: 1, deep: 1, unexpected: 0 });

  await pool.query("UPDATE lead_control SET mode = 'paused' WHERE id = 1");
  await pool.query("INSERT INTO lead_campaigns (label, latitude, longitude, radius_m) VALUES ($1, 51.5719, 4.7683, 5000)", [`${testName}-paused`]);
  await new Promise((resolve) => setTimeout(resolve, 6000));
  assert.equal(calls.nearby, 1, "Pause must stop new automatic searches");
  await stopWorker(worker);
  worker = undefined;

  const unfinished = await pool.query("INSERT INTO lead_runs (campaign_id, scheduled_for) VALUES ($1, now()) RETURNING id", [campaign.rows[0].id]);
  worker = startWorker(port);
  await waitFor(async () => {
    const result = await pool.query("SELECT status FROM lead_runs WHERE id = $1", [unfinished.rows[0].id]);
    return result.rows[0]?.status === "failed";
  }, "interrupted run recovery", 15000);
  assert.equal(calls.nearby, 1, "Restart must not repeat the paid search");
  process.stdout.write("Worker smoke passed: queue, draft gate, pause, restart, no duplicate requests.\n");
} finally {
  await pool.query("UPDATE lead_control SET mode = 'paused' WHERE id = 1").catch(() => undefined);
  await stopWorker(worker).catch(() => undefined);
  await pool.end();
  server.close();
}
