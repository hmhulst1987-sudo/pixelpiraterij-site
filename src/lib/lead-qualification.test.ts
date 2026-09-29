import assert from "node:assert/strict";
import test from "node:test";
import { classifyBusinessSize, qualifyLead, selectContentLinks } from "./lead-qualification.ts";

test("selects relevant internal pages instead of only the landing page", () => {
  const html = '<a href="/privacy">Privacy</a><a href="/diensten">Diensten</a><a href="/contact?from=home">Contact</a><a href="https://other.test/over-ons">Other</a>';
  assert.deepEqual(selectContentLinks(html, "https://example.nl/"), ["https://example.nl/diensten", "https://example.nl/contact"]);
});

test("does not label an unknown-size business as a small company", () => {
  assert.equal(classifyBusinessSize("Wij maken websites op maat.").size, "unknown");
  assert.equal(classifyBusinessSize("Wij zijn een lokaal familiebedrijf.").size, "small-medium");
  assert.equal(classifyBusinessSize("Meer dan 25 vestigingen in Nederland.").size, "likely-large");
  assert.equal(classifyBusinessSize("", "Hema Breda").size, "likely-large");
});

test("a likely large business never ranks as a preferred lead", () => {
  assert.equal(qualifyLead(25, "Meer dan 25 vestigingen in Nederland.").opportunityScore, 0);
  assert.equal(qualifyLead(null, "", "Jumbo Breda").opportunityScore, 0);
  assert.ok(qualifyLead(25, "Lokaal familiebedrijf.").opportunityScore > qualifyLead(25, "Onbekend.").opportunityScore);
});
