import { NextRequest, NextResponse } from "next/server";
import { notifyOperator } from "@/lib/notify";
import { auditWebsite } from "@/lib/website-audit";

export const runtime = "nodejs";
const CONSENT_VERSION = "websitecheck-beltoestemming-v1-2026-09-09";
const CONSENT_TEXT = "Ik geef PixelPiraterij toestemming mij telefonisch te benaderen over de uitslag van mijn websitecheck en een mogelijk websitevoorstel.";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const company = String(body.company || "").trim().slice(0, 160);
    const website = String(body.website || "").trim().slice(0, 500);
    const name = String(body.name || "").trim().slice(0, 160);
    const email = String(body.email || "").trim().slice(0, 254);
    const phone = String(body.phone || "").trim().slice(0, 40);
    if (!company || !website || !name || !email || !phone || body.phoneConsent !== true) {
      return NextResponse.json({ error: "Vul alle velden in en geef expliciet toestemming voor telefonisch contact." }, { status: 400 });
    }
    const audit = await auditWebsite(website);
    const lead = {
      id: crypto.randomUUID(), company, website, name, email, phone,
      legalForm: String(body.legalForm || "onbekend").slice(0, 80),
      kvk: String(body.kvk || "").replace(/\D/g, "").slice(0, 8),
      source: "gratis-websitecheck", createdAt: new Date().toISOString(), audit,
      consent: { granted: true, text: CONSENT_TEXT, version: CONSENT_VERSION, grantedAt: new Date().toISOString(), ip: request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "niet-beschikbaar", userAgent: request.headers.get("user-agent") || "niet-beschikbaar" },
    };
    const webhook = process.env.LEAD_WEBHOOK_URL;
    if (webhook) {
      const saved = await fetch(webhook, { method: "POST", headers: { "Content-Type": "application/json", ...(process.env.LEAD_WEBHOOK_TOKEN ? { Authorization: `Bearer ${process.env.LEAD_WEBHOOK_TOKEN}` } : {}) }, body: JSON.stringify(lead), signal: AbortSignal.timeout(10000) });
      if (!saved.ok) throw new Error("Leadopslag gaf geen succesvolle reactie.");
    }
    await notifyOperator(`Nieuwe websitecheck: ${company}`, `${company}\n${name}\n${email}\n${phone}\n${website}\nScore: ${audit.score}/100\nPrioriteiten: ${audit.priorities.join(", ") || "geen"}\nToestemming: ${CONSENT_VERSION}\nLead-ID: ${lead.id}`);
    return NextResponse.json({ id: lead.id, audit });
  } catch (error) {
    const message = error instanceof Error ? error.message : "De scan kon niet worden uitgevoerd.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
