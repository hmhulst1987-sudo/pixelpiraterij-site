import pg from "pg";

const databaseUrl = process.env.LEADS_DATABASE_URL;
const siteUrl = process.env.LEADS_SITE_URL;
const workerToken = process.env.LEADS_WORKER_TOKEN;
if (!databaseUrl || !siteUrl || !workerToken || workerToken.length < 32) {
  throw new Error("Set LEADS_DATABASE_URL, LEADS_SITE_URL and a 32+ character LEADS_WORKER_TOKEN.");
}
const site = new URL(siteUrl);
if (site.protocol !== "https:" && site.hostname !== "localhost") throw new Error("LEADS_SITE_URL must use HTTPS.");

const pool = new pg.Pool({ connectionString: databaseUrl, max: 2, connectionTimeoutMillis: 10000 });
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const pollMs = Math.min(300000, Math.max(5000, Number(process.env.LEADS_WORKER_POLL_MS) || 60000));
const lockId = 1935683001;
const chainNames = /^(?:albert heijn|jumbo|lidl|aldi|action|hema|kruidvat|etos|gamma|praxis|karwei|mediamarkt|mcdonald'?s|burger king|starbucks|subway)(?:\b|\s|-)/i;
let stopping = false;
process.on("SIGTERM", () => { stopping = true; });
process.on("SIGINT", () => { stopping = true; });

async function sitePost(path, body, timeout = 120000) {
  const response = await fetch(new URL(path, site), {
    method: "POST",
    headers: { Authorization: `Bearer ${workerToken}`, "Content-Type": "application/json" },
    body: JSON.stringify(body),
    signal: AbortSignal.timeout(timeout),
  });
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.error || `Site API returned ${response.status}`);
    error.status = response.status;
    throw error;
  }
  return data;
}

async function isRunning(client) {
  const result = await client.query("SELECT mode FROM lead_control WHERE id = 1");
  return result.rows[0]?.mode === "running";
}

async function dueRun(client) {
  await client.query("BEGIN");
  try {
    const campaign = await client.query("SELECT id, latitude, longitude, radius_m, interval_minutes, max_candidates, next_run_at FROM lead_campaigns WHERE enabled AND next_run_at <= now() ORDER BY next_run_at, id FOR UPDATE SKIP LOCKED LIMIT 1");
    const row = campaign.rows[0];
    if (!row) { await client.query("COMMIT"); return null; }
    await client.query("UPDATE lead_campaigns SET next_run_at = now() + make_interval(mins => interval_minutes), updated_at = now() WHERE id = $1", [row.id]);
    const run = await client.query("INSERT INTO lead_runs (campaign_id, scheduled_for) VALUES ($1, $2) RETURNING id", [row.id, row.next_run_at]);
    await client.query("COMMIT");
    return { ...row, runId: run.rows[0].id };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

async function updateRun(client, runId, fields) {
  const { placesFound, websitesScanned, deepScanned, status, error } = fields;
  await client.query("UPDATE lead_runs SET places_found = $2, websites_scanned = $3, deep_scanned = $4, status = $5, error = $6, finished_at = now() WHERE id = $1", [runId, placesFound, websitesScanned, deepScanned, status, error?.slice(0, 500) || null]);
}

async function recoverInterruptedRuns(client) {
  const result = await client.query(`UPDATE lead_runs SET status = 'failed',
    error = 'Worker onderbroken. Deze zoekronde is niet automatisch herhaald om dubbele betaalde scans te voorkomen.',
    finished_at = now() WHERE status = 'running' RETURNING id`);
  if (result.rowCount) process.stderr.write(`${result.rowCount} onderbroken lead-run(s) gemarkeerd voor handmatige controle.\n`);
}

async function recoverInterruptedJobs(client) {
  const result = await client.query(`UPDATE lead_deep_jobs SET status = 'interrupted',
    error = 'Worker onderbroken; mogelijk al betaald. Controleer de kandidaat voordat je opnieuw scant.',
    finished_at = now() WHERE status = 'running' RETURNING id`);
  if (result.rowCount) process.stderr.write(`${result.rowCount} verdiepende scan(s) voor handmatige controle gemarkeerd.\n`);
}

async function claimDeepJob(client) {
  await client.query("BEGIN");
  try {
    const result = await client.query(`SELECT j.id, j.run_id, j.candidate_id, c.source_site_url, c.audit
      FROM lead_deep_jobs j JOIN lead_candidates c ON c.id = j.candidate_id
      WHERE j.status = 'pending' AND j.ready_after <= now() ORDER BY j.ready_after, j.id FOR UPDATE OF j SKIP LOCKED LIMIT 1`);
    const job = result.rows[0];
    if (job) await client.query("UPDATE lead_deep_jobs SET status = 'running', started_at = now(), error = NULL WHERE id = $1", [job.id]);
    await client.query("COMMIT");
    return job || null;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  }
}

async function processDeepJob(client, job) {
  let status = "failed";
  let errorMessage = null;
  let deferForLimit = false;
  try {
    const contactPage = job.audit.pagesChecked?.find((page) => page.status < 400 && /\b(?:contact|bereikbaar|over-ons|about)\b/i.test(new URL(page.url).pathname) && page.url !== job.source_site_url)?.url;
    const result = await sitePost("/api/leads/deep-audit", { website: job.source_site_url, contactPage, runId: String(job.run_id) });
    const attempted = Number(result.audit?.requestsAttempted || 0);
    if (attempted > 0) {
      await client.query("UPDATE lead_candidates SET deep_audit = $2::jsonb WHERE id = $1", [job.candidate_id, JSON.stringify(result.audit)]);
      await client.query("UPDATE lead_runs SET deep_scanned = deep_scanned + 1 WHERE id = $1", [job.run_id]);
    }
    status = result.controlStatus === 423 || result.controlStatus === 429 ? (attempted ? "interrupted" : "pending") : "completed";
    deferForLimit = result.controlStatus === 429 && status === "pending";
    if (result.limitReached) errorMessage = result.limitReached;
  } catch (error) {
    errorMessage = String(error.message).slice(0, 500);
    if ([423, 429].includes(error.status)) status = "pending";
    deferForLimit = error.status === 429;
  } finally {
    await client.query(`UPDATE lead_deep_jobs SET status = $2, error = $3,
      ready_after = CASE WHEN $4 THEN (date_trunc('month', now() AT TIME ZONE 'Europe/Amsterdam') + interval '1 month') AT TIME ZONE 'Europe/Amsterdam' ELSE now() END,
      finished_at = CASE WHEN $2 = 'pending' THEN NULL ELSE now() END WHERE id = $1`, [job.id, status, errorMessage, deferForLimit]);
    process.stdout.write(`Deep job ${job.id}: ${status}.\n`);
  }
}

async function saveCandidate(client, placeId, audit, runId) {
  if (!audit?.finalUrl || !audit?.pagesChecked?.[0] || audit.status >= 400) return null;
  const title = String(audit.pagesChecked[0].title || "Website zonder titel").slice(0, 120);
  const { url: _googleSuppliedUrl, ...siteAudit } = audit;
  const candidate = await client.query(`INSERT INTO lead_candidates (place_id, source_site_url, site_title, technical_score, opportunity_score, size_class, audit, last_run_id)
    VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb, $8)
    ON CONFLICT (place_id) DO UPDATE SET source_site_url = EXCLUDED.source_site_url, site_title = EXCLUDED.site_title,
    technical_score = EXCLUDED.technical_score, opportunity_score = EXCLUDED.opportunity_score,
    size_class = EXCLUDED.size_class, audit = EXCLUDED.audit, last_run_id = EXCLUDED.last_run_id, last_seen_at = now()
    RETURNING id`,
  [placeId, audit.finalUrl, title, audit.score, audit.qualification.opportunityScore, audit.qualification.size, JSON.stringify(siteAudit), runId]);
  await client.query(`INSERT INTO lead_outreach (candidate_id, subject, body, source_url)
    VALUES ($1, $2, $3, $4) ON CONFLICT (candidate_id) DO NOTHING`, [
    candidate.rows[0].id,
    "Vraag over uw website",
    `Beste team,\n\nIk ben Marijnus van PixelPiraterij. Ik maak websites voor kleinere bedrijven en zag uw website ${audit.finalUrl}. Als u openstaat voor een gesprek over een vernieuwde vormgeving of betere mobiele presentatie, hoor ik graag wat voor u belangrijk is.\n\nMet vriendelijke groet,\nMarijnus\nPixelPiraterij, onderdeel van Oeuvre de VB\n\nWilt u geen commerciële berichten meer ontvangen? Antwoord op deze e-mail met 'afmelden'; wij plaatsen uw adres dan op onze uitsluitlijst.`,
    audit.finalUrl,
  ]);
  return candidate.rows[0].id;
}

async function processRun(client, campaign) {
  let placesFound = 0;
  let websitesScanned = 0;
  let deepScanned = 0;
  let queued = 0;
  let status = "completed";
  let errorMessage = null;
  try {
    if (!(await isRunning(client))) { status = "paused"; return; }
    const result = await sitePost("/api/leads/nearby", { latitude: campaign.latitude, longitude: campaign.longitude, radius: campaign.radius_m, runId: String(campaign.runId) });
    const places = Array.isArray(result.places) ? result.places : [];
    placesFound = places.length;
    const shortlist = [];
    for (const place of places.slice(0, campaign.max_candidates)) {
      if (stopping || !(await isRunning(client))) { status = "paused"; break; }
      if (!place.id || !place.websiteUri) continue;
      if (chainNames.test(place.displayName?.text || "")) continue;
      try {
        const { audit } = await sitePost("/api/leads/audit", { website: place.websiteUri, businessName: place.displayName?.text || "" }, 45000);
        websitesScanned += 1;
        const candidateId = await saveCandidate(client, place.id, audit, campaign.runId);
        if (candidateId && audit.qualification?.size !== "likely-large" && audit.qualification?.opportunityScore >= 40) shortlist.push({ candidateId, audit });
      } catch (error) {
        process.stderr.write(`Website audit failed for run ${campaign.runId}: ${String(error.message).slice(0, 160)}\n`);
      }
    }
    shortlist.sort((a, b) => b.audit.qualification.opportunityScore - a.audit.qualification.opportunityScore);
    for (const item of shortlist.slice(0, 5)) {
      await client.query(`INSERT INTO lead_deep_jobs (run_id, candidate_id) VALUES ($1, $2)
        ON CONFLICT (run_id, candidate_id) DO NOTHING`, [campaign.runId, item.candidateId]);
      queued += 1;
    }
    if (result.limitReached && status === "completed") status = "limit";
  } catch (error) {
    status = error.status === 423 ? "paused" : error.status === 429 ? "limit" : "failed";
    errorMessage = String(error.message);
  } finally {
    await updateRun(client, campaign.runId, { placesFound, websitesScanned, deepScanned, status, error: errorMessage });
    process.stdout.write(`Lead run ${campaign.runId}: ${status}, ${websitesScanned} sites, ${queued} deep scans queued.\n`);
  }
}

async function tick() {
  const client = await pool.connect();
  let locked = false;
  try {
    await client.query("INSERT INTO lead_worker_health (id, last_seen_at) VALUES (1, now()) ON CONFLICT (id) DO UPDATE SET last_seen_at = now()");
    const result = await client.query("SELECT pg_try_advisory_lock($1) AS locked", [lockId]);
    locked = result.rows[0]?.locked === true;
    if (!locked) return;
    await recoverInterruptedRuns(client);
    await recoverInterruptedJobs(client);
    if (!(await isRunning(client))) return;
    const job = await claimDeepJob(client);
    if (job) { await processDeepJob(client, job); return; }
    const campaign = await dueRun(client);
    if (campaign) await processRun(client, campaign);
  } finally {
    if (locked) await client.query("SELECT pg_advisory_unlock($1)", [lockId]);
    client.release();
  }
}

const heartbeat = setInterval(() => {
  pool.query("INSERT INTO lead_worker_health (id, last_seen_at) VALUES (1, now()) ON CONFLICT (id) DO UPDATE SET last_seen_at = now()")
    .catch((error) => process.stderr.write(`Lead worker heartbeat failed: ${String(error.message).slice(0, 160)}\n`));
}, 30000);

try {
  process.stdout.write("Lead worker started. Campaigns run only while control mode is running.\n");
  while (!stopping) {
    try { await tick(); }
    catch (error) { process.stderr.write(`Lead worker tick failed: ${String(error.message).slice(0, 300)}\n`); }
    if (!stopping) await sleep(pollMs);
  }
} finally {
  clearInterval(heartbeat);
  await pool.end();
}
