import { createHash } from "node:crypto";
import { leadPool, LeadControlError } from "./lead-control";
import { auditWebsite } from "./website-audit";

export type ManualLeadInput = { website: string; businessName: string; sourceUrl: string; reviewNote: string };

export function parseManualLeadInput(value: unknown): ManualLeadInput | null {
  if (!value || typeof value !== "object" || Array.isArray(value)) return null;
  const fields = value as Record<string, unknown>;
  const website = typeof fields.website === "string" ? fields.website.trim() : "";
  const businessName = typeof fields.businessName === "string" ? fields.businessName.trim() : "";
  const sourceUrl = typeof fields.sourceUrl === "string" ? fields.sourceUrl.trim() : "";
  const reviewNote = typeof fields.reviewNote === "string" ? fields.reviewNote.trim() : "";
  if (!/^https?:\/\//i.test(website) || website.length > 500 || !businessName || businessName.length > 160
    || !/^https?:\/\//i.test(sourceUrl) || sourceUrl.length > 500 || !reviewNote || reviewNote.length > 1000) return null;
  try {
    const source = new URL(sourceUrl);
    if (source.username || source.password || !["http:", "https:"].includes(source.protocol)) return null;
    new URL(website);
  } catch { return null; }
  return { website, businessName, sourceUrl, reviewNote };
}

export function leadHost(value: string) {
  return new URL(value).hostname.toLowerCase().replace(/^www\./, "");
}

export async function importManualLead(input: ManualLeadInput) {
  const audit = await auditWebsite(input.website, input.businessName);
  if (!audit.finalUrl || audit.status >= 400 || !audit.pagesChecked[0]) {
    throw new LeadControlError("De website is niet bereikbaar voor een betrouwbare audit.", 422);
  }
  const host = leadHost(audit.finalUrl);
  const placeId = `manual:${createHash("sha256").update(host).digest("hex")}`;
  const { url: _submittedUrl, ...siteAudit } = audit;
  const evidence = { ...siteAudit, discovery: { method: "manual-public-search", sourceUrl: input.sourceUrl,
    businessName: input.businessName, reviewNote: input.reviewNote, checkedAt: new Date().toISOString() } };
  const client = await leadPool().connect();
  try {
    await client.query("BEGIN");
    await client.query("SELECT pg_advisory_xact_lock(hashtext($1))", [host]);
    const existing = await client.query<{ id: string; source_site_url: string }>("SELECT id::text, source_site_url FROM lead_candidates");
    const duplicate = existing.rows.find((row) => {
      try { return leadHost(row.source_site_url) === host; } catch { return false; }
    });
    if (duplicate) {
      await client.query("ROLLBACK");
      return { id: duplicate.id, status: "existing", website: duplicate.source_site_url };
    }
    const result = await client.query<{ id: string }>(`INSERT INTO lead_candidates
      (place_id, source_site_url, site_title, technical_score, opportunity_score, size_class, audit)
      VALUES ($1, $2, $3, $4, $5, $6, $7::jsonb) RETURNING id::text`,
    [placeId, audit.finalUrl, String(audit.pagesChecked[0].title || input.businessName).slice(0, 120), audit.score,
      audit.qualification.opportunityScore, audit.qualification.size, JSON.stringify(evidence)]);
    await client.query("COMMIT");
    return { id: result.rows[0].id, status: "new", website: audit.finalUrl };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally { client.release(); }
}
