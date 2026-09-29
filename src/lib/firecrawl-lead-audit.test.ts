import assert from "node:assert/strict";
import test from "node:test";
import { contentFindings, selectDeepAuditCandidates } from "./firecrawl-findings.ts";

test("flags sparse rendered content without claiming a bad visual design", () => {
  const findings = contentFindings("Welkom", "");
  assert.ok(findings.some((item) => item.includes("weinig uitlegbare tekst")));
  assert.ok(findings.some((item) => item.includes("geen duidelijke contact- of aanvraagactie")));
  assert.ok(findings.every((item) => !item.includes("verouderd ontwerp")));
});

test("recognizes visible contact routes in rendered text", () => {
  const home = "Onze lokale diensten helpen ondernemers. Vraag een offerte aan voor een passende route.";
  const contact = "Mail ons op hallo@example.nl of gebruik het contactformulier.";
  assert.deepEqual(contentFindings(home, contact), ["De gerenderde homepage bevat weinig uitlegbare tekst; controleer de inhoud handmatig."]);
});

test("automatic deep scan stops at ten eligible opportunities", () => {
  const items = Array.from({ length: 20 }, (_, index) => ({ id: index, audit: { qualification: { size: index === 19 ? "likely-large" : "unknown", opportunityScore: index + 40 } } }));
  const best = selectDeepAuditCandidates(items);
  assert.equal(best.length, 10);
  assert.equal(best[0].id, 18);
  assert.ok(best.every((item) => item.audit.qualification.size !== "likely-large"));
});
