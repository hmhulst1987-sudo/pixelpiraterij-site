import assert from "node:assert/strict";
import test from "node:test";
import { agentPayloadDigest, parseAgentSearchInput, validAgentBearer, validRequestKey } from "../src/lib/lead-agent-shared";

const input = { label: "Eindhoven centrum", latitude: 51.4416, longitude: 5.4697, radius: 20_000, maxCandidates: 20 };

test("agent bearer requires the exact independent secret", () => {
  const secret = "this-is-a-dedicated-agent-secret-longer-than-32";
  assert.equal(validAgentBearer(`Bearer ${secret}`, secret), true);
  assert.equal(validAgentBearer(`Bearer ${secret}x`, secret), false);
  assert.equal(validAgentBearer(`Basic ${secret}`, secret), false);
  assert.equal(validAgentBearer(`Bearer ${secret}`, "too-short"), false);
  assert.equal(validAgentBearer(null, secret), false);
});

test("one-shot search input has hard candidate and radius caps", () => {
  assert.deepEqual(parseAgentSearchInput(input), input);
  assert.equal(parseAgentSearchInput({ ...input, maxCandidates: 21 }), null);
  assert.equal(parseAgentSearchInput({ ...input, radius: 30_001 }), null);
  assert.equal(parseAgentSearchInput({ ...input, latitude: 91 }), null);
  assert.equal(parseAgentSearchInput({ ...input, longitude: Infinity }), null);
  assert.equal(parseAgentSearchInput({ ...input, label: " " }), null);
  assert.equal(parseAgentSearchInput({ ...input, radius: "20000" }), null);
});

test("idempotency keys and payload digest distinguish different searches", () => {
  assert.equal(validRequestKey("a3456bcd-1234-4abc-8def-123456789abc"), true);
  assert.equal(validRequestKey("reused-key"), false);
  assert.equal(agentPayloadDigest(input), agentPayloadDigest({ ...input }));
  assert.notEqual(agentPayloadDigest(input), agentPayloadDigest({ ...input, radius: 15_000 }));
});
