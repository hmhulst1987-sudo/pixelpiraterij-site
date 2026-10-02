import assert from "node:assert/strict";
import test from "node:test";
import { leadHost, parseManualLeadInput } from "./lead-manual-import.ts";

const valid = {
  website: "https://www.mowhair.nl/",
  businessName: "Mowhair",
  sourceUrl: "https://www.mowhair.nl/",
  reviewNote: "Lokale salon in Rotterdam met tekstzware homepage.",
};

test("manual import requires public source and a written review", () => {
  assert.deepEqual(parseManualLeadInput(valid), valid);
  assert.equal(parseManualLeadInput({ ...valid, reviewNote: "" }), null);
  assert.equal(parseManualLeadInput({ ...valid, sourceUrl: "file:///tmp/source" }), null);
  assert.equal(parseManualLeadInput({ ...valid, sourceUrl: "https://user:secret@example.com/" }), null);
  assert.equal(parseManualLeadInput({ ...valid, website: "not-a-url" }), null);
});

test("manual import deduplicates www and bare hosts", () => {
  assert.equal(leadHost("https://www.mowhair.nl/"), leadHost("https://mowhair.nl/contact"));
});
