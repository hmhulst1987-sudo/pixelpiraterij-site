import { Pool } from "pg";
import { usageKinds, type LeadLimits, type LeadMode, type LeadUsage, type UsageKind } from "./lead-control-shared";

type ControlRow = { mode: LeadMode } & { [K in UsageKind as `${K}_limit`]: number };
type UsageRow = { kind: UsageKind; total: string };

export class LeadControlError extends Error {
  constructor(message: string, readonly status: number) { super(message); }
}

const globalPool = globalThis as typeof globalThis & { leadControlPool?: Pool };

export function leadPool() {
  const connectionString = process.env.LEADS_DATABASE_URL;
  if (!connectionString) throw new LeadControlError("De lead-database is nog niet ingesteld.", 503);
  if (!globalPool.leadControlPool) {
    globalPool.leadControlPool = new Pool({ connectionString, max: 5, connectionTimeoutMillis: 10000, idleTimeoutMillis: 30000 });
  }
  return globalPool.leadControlPool;
}

export function usagePeriod(date = new Date()) {
  const parts = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Amsterdam", year: "numeric", month: "2-digit" }).formatToParts(date);
  return `${parts.find((part) => part.type === "year")?.value}-${parts.find((part) => part.type === "month")?.value}`;
}

function limitsOf(row: ControlRow): LeadLimits {
  return Object.fromEntries(usageKinds.map((kind) => [kind, row[`${kind}_limit`]])) as LeadLimits;
}

function usageOf(rows: UsageRow[]): LeadUsage {
  const usage = Object.fromEntries(usageKinds.map((kind) => [kind, 0])) as LeadUsage;
  for (const row of rows) usage[row.kind] = Number(row.total);
  return usage;
}

export async function leadControlSnapshot() {
  const db = leadPool();
  const period = usagePeriod();
  const [control, usage, worker] = await Promise.all([
    db.query<ControlRow>("SELECT * FROM lead_control WHERE id = 1"),
    db.query<UsageRow>("SELECT kind, SUM(units)::text AS total FROM lead_usage WHERE period = $1 GROUP BY kind", [period]),
    db.query<{ last_seen_at: Date }>("SELECT last_seen_at FROM lead_worker_health WHERE id = 1"),
  ]);
  if (!control.rows[0]) throw new LeadControlError("Voer eerst de lead-database-migratie uit.", 503);
  return { mode: control.rows[0].mode, limits: limitsOf(control.rows[0]), usage: usageOf(usage.rows), period, workerLastSeen: worker.rows[0]?.last_seen_at?.toISOString() || null };
}

export async function setLeadControl(mode: LeadMode, limits?: Partial<LeadLimits>) {
  if (mode === "running") {
    const worker = await leadPool().query("SELECT 1 FROM lead_worker_health WHERE id = 1 AND last_seen_at > now() - interval '2 minutes'");
    if (!worker.rowCount) throw new LeadControlError("De aparte lead-worker is offline. Start eerst die service.", 503);
  }
  const updates = ["mode = $1", "updated_at = now()"];
  const values: Array<string | number> = [mode];
  for (const kind of usageKinds) {
    const value = limits?.[kind];
    if (value === undefined) continue;
    if (!Number.isSafeInteger(value) || value < 0 || value > 100000) throw new LeadControlError(`Ongeldige limiet voor ${kind}.`, 400);
    values.push(value);
    updates.push(`${kind}_limit = $${values.length}`);
  }
  await leadPool().query(`UPDATE lead_control SET ${updates.join(", ")} WHERE id = 1`, values);
  return leadControlSnapshot();
}

export async function reserveLeadUsage(kind: UsageKind, units = 1, requireRunning = true, runId?: string) {
  if (!usageKinds.includes(kind) || !Number.isSafeInteger(units) || units < 1 || units > 1000) throw new LeadControlError("Ongeldig verbruiksverzoek.", 400);
  if (runId !== undefined && !/^[1-9]\d*$/.test(runId)) throw new LeadControlError("Ongeldige zoekronde.", 400);
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const control = await client.query<ControlRow>("SELECT * FROM lead_control WHERE id = 1 FOR UPDATE");
    const row = control.rows[0];
    if (!row) throw new LeadControlError("Voer eerst de lead-database-migratie uit.", 503);
    if (requireRunning && row.mode !== "running") throw new LeadControlError("De lead-worker staat gepauzeerd.", 423);
    if (runId !== undefined) {
      const run = await client.query("SELECT 1 FROM lead_runs WHERE id = $1 AND status IN ('running', 'completed', 'paused', 'limit')", [runId]);
      if (!run.rowCount) throw new LeadControlError("De zoekronde is niet meer actief.", 409);
    }
    const period = usagePeriod();
    const used = await client.query<{ total: string }>("SELECT COALESCE(SUM(units), 0)::text AS total FROM lead_usage WHERE period = $1 AND kind = $2", [period, kind]);
    if (Number(used.rows[0].total) + units > row[`${kind}_limit`]) throw new LeadControlError(`De maandlimiet voor ${kind} is bereikt.`, 429);
    const created = await client.query<{ id: string }>("INSERT INTO lead_usage (period, kind, units, run_id) VALUES ($1, $2, $3, $4) RETURNING id::text", [period, kind, units, runId ?? null]);
    await client.query("COMMIT");
    return created.rows[0].id;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function finishLeadUsage(id: string, succeeded: boolean, externalStatus?: number) {
  await leadPool().query("UPDATE lead_usage SET outcome = $2, external_status = $3, finished_at = now() WHERE id = $1 AND outcome = 'reserved'", [id, succeeded ? "succeeded" : "failed", externalStatus ?? null]);
}

export async function reservePreviewRequest(requestKey: string, draftDigest: string) {
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const control = await client.query<ControlRow>("SELECT * FROM lead_control WHERE id = 1 FOR UPDATE");
    const row = control.rows[0];
    if (!row) throw new LeadControlError("Voer eerst de lead-database-migratie uit.", 503);
    const previous = await client.query<{ draft_digest: string; usage_id: string; preview_path: string | null; created_at: Date }>(
      "SELECT draft_digest, usage_id::text, preview_path, created_at FROM lead_preview_requests WHERE request_key = $1", [requestKey]);
    if (previous.rows[0]) {
      const existing = previous.rows[0];
      if (existing.draft_digest !== draftDigest) throw new LeadControlError("Deze conceptaanvraag hoort bij andere gegevens. Start een nieuwe bouwactie.", 409);
      if (Date.now() - existing.created_at.getTime() > 13 * 86400_000) throw new LeadControlError("Deze conceptaanvraag is verlopen. Start een nieuwe bouwactie.", 410);
      await client.query("COMMIT");
      return { usageId: existing.usage_id, previewPath: existing.preview_path };
    }
    const period = usagePeriod();
    const used = await client.query<{ total: string }>("SELECT COALESCE(SUM(units), 0)::text AS total FROM lead_usage WHERE period = $1 AND kind = 'previews'", [period]);
    if (Number(used.rows[0].total) + 1 > row.previews_limit) throw new LeadControlError("De maandlimiet voor previews is bereikt.", 429);
    const usage = await client.query<{ id: string }>("INSERT INTO lead_usage (period, kind, units) VALUES ($1, 'previews', 1) RETURNING id::text", [period]);
    await client.query("INSERT INTO lead_preview_requests (request_key, draft_digest, usage_id) VALUES ($1, $2, $3)", [requestKey, draftDigest, usage.rows[0].id]);
    await client.query("COMMIT");
    return { usageId: usage.rows[0].id, previewPath: null };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export async function finishPreviewRequest(requestKey: string, usageId: string, previewPath: string | null, externalStatus?: number) {
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    const current = await client.query<{ preview_path: string | null }>(
      "SELECT preview_path FROM lead_preview_requests WHERE request_key = $1 AND usage_id = $2 FOR UPDATE", [requestKey, usageId]);
    if (!current.rows[0]) throw new LeadControlError("De conceptaanvraag is niet meer beschikbaar.", 409);
    if (current.rows[0].preview_path && previewPath && current.rows[0].preview_path !== previewPath) {
      throw new LeadControlError("De conceptaanvraag heeft twee verschillende resultaten opgeleverd.", 409);
    }
    if (previewPath) {
      await client.query("UPDATE lead_preview_requests SET preview_path = $2, completed_at = now() WHERE request_key = $1 AND usage_id = $3", [requestKey, previewPath, usageId]);
    }
    const succeeded = Boolean(current.rows[0].preview_path || previewPath);
    await client.query("UPDATE lead_usage SET outcome = $2, external_status = CASE WHEN $2 = 'succeeded' THEN 201 ELSE $3 END, finished_at = now() WHERE id = $1 AND kind = 'previews'", [usageId, succeeded ? "succeeded" : "failed", externalStatus ?? null]);
    await client.query("COMMIT");
    return current.rows[0].preview_path || previewPath;
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}
