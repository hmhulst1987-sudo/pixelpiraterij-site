import assert from "node:assert/strict";
import test from "node:test";
import { classifyBusinessSize, qualifyLead, selectContentLinks } from "./lead-qualification.ts";

test("selects relevant internal pages instead of only the landing page", () => {
  const html = '<a href="/privacy">Privacy</a><a href="/diensten">Diensten</a><a href="/contact?from=home">Contact</a><a href="https://other.test/over-ons">Other</a>';
  assert.deepEqual(selectContentLinks(html, "https://example.nl/"), ["https://example.nl/diensten", "https://example.nl/contact"]);
});

test("keeps numeric WordPress page IDs while dropping tracking parameters", () => {
  const html = '<a href="/?page_id=22&utm_source=home">Contact</a><a href="/?page_id=18">Over ons</a><a href="/?page_id=22">Duplicate</a><a href="/?page_id=bad">Invalid</a>';
  assert.deepEqual(selectContentLinks(html, "https://example.nl/"), ["https://example.nl/?page_id=22", "https://example.nl/?page_id=18"]);
});

test("does not label an unknown-size business as a small company", () => {
  assert.equal(classifyBusinessSize("Wij maken websites op maat.").size, "unknown");
  assert.equal(classifyBusinessSize("Wij zijn een lokaal familiebedrijf.").size, "small-medium");
  assert.equal(classifyBusinessSize("Meer dan 25 vestigingen in Nederland.").size, "likely-large");
  assert.equal(classifyBusinessSize("", "Hema Breda").size, "likely-large");
  assert.equal(classifyBusinessSize("", "Kippie Breda").size, "likely-large");
  assert.equal(classifyBusinessSize("", "Domino's Breda").size, "likely-large");
  assert.equal(classifyBusinessSize("", "De Beren Breda").size, "likely-large");
});

test("a likely large business never ranks as a preferred lead", () => {
  assert.equal(qualifyLead(25, "Meer dan 25 vestigingen in Nederland.").opportunityScore, 0);
  assert.equal(qualifyLead(null, "", "Jumbo Breda").opportunityScore, 0);
  assert.ok(qualifyLead(25, "Lokaal familiebedrijf.").opportunityScore > qualifyLead(25, "Onbekend.").opportunityScore);
});
