import { LeadControlError, leadControlSnapshot, leadPool, setLeadControl, usagePeriod } from "./lead-control";
import { AGENT_PLACES_REQUESTS, agentPayloadDigest, type AgentSearchInput } from "./lead-agent-shared";

const MAX_DEEP_JOBS = 5;
const MAX_FIRECRAWL_REQUESTS = MAX_DEEP_JOBS * 3;

export async function agentStatus() {
  const control = await leadControlSnapshot();
  const workerFresh = !!control.workerLastSeen && Date.now() - Date.parse(control.workerLastSeen) < 120_000;
  const remaining = Object.fromEntries(Object.entries(control.limits).map(([kind, limit]) => [kind, Math.max(0, limit - control.usage[kind as keyof typeof control.usage])]));
  return { ...control, workerFresh, remaining };
}

export async function agentSearchEstimate(input: AgentSearchInput) {
  const status = await agentStatus();
  const blockers = [
    status.mode !== "running" ? "De lead-worker staat gepauzeerd." : null,
    !status.workerFresh ? "De lead-worker is niet recent gezien." : null,
    status.remaining.search_runs < 1 ? "De maandlimiet voor zoekrondes is bereikt." : null,
    status.remaining.places < AGENT_PLACES_REQUESTS ? "Er zijn minder dan vijf Places-verzoeken over." : null,
    status.remaining.firecrawl < MAX_FIRECRAWL_REQUESTS ? "Er zijn te weinig Firecrawl-verzoeken over voor alle verdiepende controles." : null,
    !process.env.GOOGLE_PLACES_API_KEY ? "De server heeft nog geen Google Places-sleutel." : null,
    !process.env.FIRECRAWL_API_KEY ? "De server heeft nog geen Firecrawl-sleutel." : null,
  ].filter((message): message is string => !!message);
  return {
    input,
    plannedMaximum: { placesRequests: AGENT_PLACES_REQUESTS, websiteAudits: input.maxCandidates, deepJobs: MAX_DEEP_JOBS, firecrawlRequests: MAX_FIRECRAWL_REQUESTS },
    remaining: status.remaining,
    period: status.period,
    ready: blockers.length === 0,
    blockers,
  };
}

export async function createAgentOneShot(input: AgentSearchInput, requestKey: string) {
  if (!process.env.GOOGLE_PLACES_API_KEY || !process.env.FIRECRAWL_API_KEY) {
    throw new LeadControlError("Google Places en Firecrawl moeten eerst op de server zijn ingesteld.", 503);
  }
  const digest = agentPayloadDigest(input);
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const existing = await client.query<{ id: string; api_payload_digest: string }>(
      "SELECT id::text, api_payload_digest FROM lead_campaigns WHERE api_request_key = $1 FOR UPDATE", [requestKey]);
    if (existing.rows[0]) {
      if (existing.rows[0].api_payload_digest !== digest) throw new LeadControlError("Deze idempotency-key hoort bij een andere zoekopdracht.", 409);
      await client.query("COMMIT");
      return { campaignId: existing.rows[0].id, repeated: true };
    }

    const control = await client.query<{ mode: string; search_runs_limit: number; places_limit: number; firecrawl_limit: number }>(
      "SELECT mode, search_runs_limit, places_limit, firecrawl_limit FROM lead_control WHERE id = 1 FOR UPDATE");
    const row = control.rows[0];
    if (!row) throw new LeadControlError("Voer eerst de lead-database-migratie uit.", 503);
    const concurrent = await client.query<{ id: string; api_payload_digest: string }>(
      "SELECT id::text, api_payload_digest FROM lead_campaigns WHERE api_request_key = $1 FOR UPDATE", [requestKey]);
    if (concurrent.rows[0]) {
      if (concurrent.rows[0].api_payload_digest !== digest) throw new LeadControlError("Deze idempotency-key hoort bij een andere zoekopdracht.", 409);
      await client.query("COMMIT");
      return { campaignId: concurrent.rows[0].id, repeated: true };
    }
    if (row.mode !== "running") throw new LeadControlError("De lead-worker staat gepauzeerd.", 423);
    const worker = await client.query("SELECT 1 FROM lead_worker_health WHERE id = 1 AND last_seen_at > now() - interval '2 minutes'");
    if (!worker.rowCount) throw new LeadControlError("De lead-worker is offline.", 503);
    const active = await client.query(`SELECT 1 FROM lead_campaigns c WHERE c.one_shot AND
      (c.enabled OR EXISTS (SELECT 1 FROM lead_runs r WHERE r.campaign_id = c.id AND r.status = 'running')) LIMIT 1`);
    if (active.rowCount) throw new LeadControlError("Er staat al een eenmalige zoekronde klaar of die wordt uitgevoerd.", 409);

    const usage = await client.query<{ kind: string; total: string }>(
      "SELECT kind, SUM(units)::text AS total FROM lead_usage WHERE period = $1 AND kind IN ('search_runs', 'places', 'firecrawl') GROUP BY kind", [usagePeriod()]);
    const used = Object.fromEntries(usage.rows.map((item) => [item.kind, Number(item.total)]));
    if ((used.search_runs || 0) + 1 > row.search_runs_limit || (used.places || 0) + AGENT_PLACES_REQUESTS > row.places_limit || (used.firecrawl || 0) + MAX_FIRECRAWL_REQUESTS > row.firecrawl_limit) {
      throw new LeadControlError("De resterende maandlimieten zijn te laag voor deze volledige zoekronde.", 429);
    }

    const created = await client.query<{ id: string }>(`INSERT INTO lead_campaigns
      (label, latitude, longitude, radius_m, max_candidates, one_shot, api_request_key, api_payload_digest)
      VALUES ($1, $2, $3, $4, $5, true, $6, $7) RETURNING id::text`,
    [input.label, input.latitude, input.longitude, input.radius, input.maxCandidates, requestKey, digest]);
    await client.query("COMMIT");
    return { campaignId: created.rows[0].id, repeated: false };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function listAgentRuns() {
  const result = await leadPool().query(`SELECT c.id::text AS campaign_id, c.label, c.latitude, c.longitude,
    c.radius_m, c.max_candidates, c.enabled, c.created_at, r.id::text AS run_id, r.status,
    r.places_found, r.websites_scanned, r.deep_scanned, r.error, r.started_at, r.finished_at
    FROM lead_campaigns c LEFT JOIN LATERAL (SELECT * FROM lead_runs WHERE campaign_id = c.id ORDER BY id DESC LIMIT 1) r ON true
    WHERE c.one_shot ORDER BY c.id DESC LIMIT 30`);
  return { runs: result.rows };
}

export async function listAgentCandidates(status: "all" | "shortlisted", limit: number, runId?: string) {
  if (runId) {
    const run = await leadPool().query("SELECT 1 FROM lead_runs r JOIN lead_campaigns c ON c.id = r.campaign_id WHERE r.id = $1 AND c.one_shot", [runId]);
    if (!run.rowCount) throw new LeadControlError("Deze eenmalige zoekronde bestaat niet.", 404);
  }
  const result = await leadPool().query(`SELECT id::text, source_site_url, site_title, technical_score,
    opportunity_score, size_class, status, audit, deep_audit, last_run_id::text, last_seen_at
    FROM lead_candidates WHERE (status = 'shortlisted' OR ($1 = 'all' AND status <> 'dismissed'))
    AND ($3::bigint IS NULL OR last_run_id = $3::bigint)
    ORDER BY CASE WHEN status = 'shortlisted' THEN 0 ELSE 1 END, opportunity_score DESC, last_seen_at DESC LIMIT $2`, [status, limit, runId || null]);
  return { candidates: result.rows };
}

export async function shortlistAgentCandidate(id: string) {
  const result = await leadPool().query<{ id: string; status: string }>(
    "UPDATE lead_candidates SET status = 'shortlisted' WHERE id = $1 AND status <> 'dismissed' RETURNING id::text, status", [id]);
  if (!result.rowCount) throw new LeadControlError("Kandidaat ontbreekt of is eerder afgewezen.", 404);
  return result.rows[0];
}

export async function setAgentControl(mode: "paused" | "running") {
  if (mode === "running" && !process.env.GOOGLE_PLACES_API_KEY) throw new LeadControlError("Stel eerst de server-sleutel voor Google Places in.", 503);
  return setLeadControl(mode);
}
