#!/usr/bin/env node
import { randomUUID } from "node:crypto";

const [command, ...args] = process.argv.slice(2);
const base = process.env.LEADS_AGENT_URL || "https://leads.pixelpiraterij.nl";
const token = process.env.LEADS_AGENT_TOKEN;
const accessId = process.env.CF_ACCESS_CLIENT_ID;
const accessSecret = process.env.CF_ACCESS_CLIENT_SECRET;

function option(name) {
  const index = args.indexOf(`--${name}`);
  return index >= 0 ? args[index + 1] : undefined;
}

function confirmed() { return args.includes("--confirm"); }

function searchInput() {
  return {
    label: option("label"), latitude: Number(option("lat")), longitude: Number(option("lon")),
    radius: Number(option("radius")), maxCandidates: Number(option("max")), searchProfile: option("profile") || "mixed",
  };
}

async function call(path, method = "GET", body, extraHeaders = {}) {
  const url = new URL(path, base);
  const headers = { Authorization: `Bearer ${token}`, Accept: "application/json", ...extraHeaders };
  if (body !== undefined) headers["Content-Type"] = "application/json";
  if (accessId && accessSecret) {
    headers["CF-Access-Client-Id"] = accessId;
    headers["CF-Access-Client-Secret"] = accessSecret;
  }
  const response = await fetch(url, { method, headers, body: body === undefined ? undefined : JSON.stringify(body), signal: AbortSignal.timeout(30_000) });
  const data = await response.json().catch(() => ({ error: `HTTP ${response.status}: antwoord is geen JSON.` }));
  if (!response.ok) throw new Error(`${response.status} ${data.error || response.statusText}`);
  process.stdout.write(`${JSON.stringify(data, null, 2)}\n`);
}

const root = "/api/leads/agent/v1/";
try {
  if (!token || token.length < 32) throw new Error("LEADS_AGENT_TOKEN ontbreekt of is te kort.");
  const parsed = new URL(base);
  if (parsed.protocol !== "https:" && !(parsed.protocol === "http:" && ["localhost", "127.0.0.1"].includes(parsed.hostname))) {
    throw new Error("Gebruik HTTPS of een lokale SSH-tunnel voor LEADS_AGENT_URL.");
  }
  if (Boolean(accessId) !== Boolean(accessSecret)) throw new Error("Stel beide Cloudflare Access service-tokenwaarden in.");
  switch (command) {
    case "status": await call(`${root}status`); break;
    case "candidates": {
      const params = new URLSearchParams({ status: args.includes("--shortlisted") ? "shortlisted" : "all", limit: option("limit") || "30" });
      if (option("run")) params.set("runId", option("run"));
      await call(`${root}candidates?${params}`); break;
    }
    case "runs": await call(`${root}runs`); break;
    case "estimate": await call(`${root}estimate`, "POST", searchInput()); break;
    case "queue": {
      if (!confirmed()) throw new Error("Een zoekronde kan betaalde API-aanroepen doen. Voeg --confirm toe na de menselijke keuze voor deze run.");
      const key = option("key") || randomUUID();
      process.stderr.write(`Idempotency-Key: ${key}\n`);
      await call(`${root}runs`, "POST", searchInput(), { "Idempotency-Key": key, "X-Leads-Confirm-Search": "confirmed" });
      break;
    }
    case "pause": await call(`${root}control`, "POST", { mode: "paused" }); break;
    case "resume": {
      if (!confirmed()) throw new Error("Hervatten vraagt --confirm na de menselijke keuze.");
      await call(`${root}control`, "POST", { mode: "running" }, { "X-Leads-Confirm-Resume": "confirmed" });
      break;
    }
    case "shortlist": {
      const id = args[0];
      if (!/^[1-9]\d{0,17}$/.test(id || "") || !confirmed()) throw new Error("Gebruik shortlist <id> --confirm na de menselijke keuze.");
      await call(`${root}candidates/${id}`, "PATCH", {}, { "X-Leads-Confirm-Shortlist": "confirmed" });
      break;
    }
    default: throw new Error("Gebruik: status | candidates [--shortlisted] [--limit N] [--run ID] | runs | estimate/queue --label NAAM --lat N --lon N --radius M --max N [--profile mixed|local-services] [--key UUID] [--confirm] | pause | resume --confirm | shortlist ID --confirm");
  }
} catch (error) {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
}
