import assert from "node:assert/strict";
import test from "node:test";
import { selectAuditCandidates } from "../scripts/lead-candidate-selection.mjs";

const place = (id, type, websiteUri, name = id) => ({ id, primaryType: type, websiteUri, displayName: { text: name } });

test("filters chains and invalid websites before applying the scan cap", () => {
  const selected = selectAuditCandidates([
    place("chain", "bakery", "https://example-chain.nl", "Albert Heijn Centrum"),
    place("kippie", "restaurant", "https://www.kippie.nl/winkels/breda", "Kippie Breda"),
    place("dominos", "restaurant", "https://www.dominos.nl/breda", "Domino's Breda"),
    place("ok", "car_repair", "https://ok.nl/overzicht-tankstations/", "Tanken bij OK"),
    place("hanos", "store", "https://www.hanos.nl/nl/groothandel/HANOS-ISPC-Breda", "HANOS Breda"),
    place("intratuin", "store", "https://www.intratuin.nl/intratuin-breda", "Intratuin Breda"),
    place("beren", "restaurant", "https://www.beren.nl/vestigingen/breda", "De Beren Breda"),
    place("booking", "beauty_salon", "https://nailsroombreda.salonized.com/widget_bookings/new", "Nailsroom Breda"),
    place("social", "bakery", "https://www.facebook.com/localshop"),
    place("missing", "bakery", undefined),
    place("local", "bakery", "https://local-bakery.nl"),
  ], 1);
  assert.deepEqual(selected.map((item) => item.id), ["local"]);
});

test("deduplicates place IDs and business hosts", () => {
  const selected = selectAuditCandidates([
    place("one", "cafe", "https://www.corner-cafe.nl/"),
    place("one", "cafe", "https://another.nl/"),
    place("two", "restaurant", "https://corner-cafe.nl/menu"),
    place("three", "restaurant", "https://third.nl"),
  ], 10);
  assert.deepEqual(selected.map((item) => item.id), ["one", "three"]);
});

test("spreads the first scans across different business types", () => {
  const selected = selectAuditCandidates([
    place("b1", "bakery", "https://bakery-1.nl"),
    place("b2", "bakery", "https://bakery-2.nl"),
    place("b3", "bakery", "https://bakery-3.nl"),
    place("c1", "cafe", "https://cafe-1.nl"),
    place("r1", "restaurant", "https://restaurant-1.nl"),
  ], 3);
  assert.deepEqual(selected.map((item) => item.id), ["b1", "c1", "r1"]);
});
