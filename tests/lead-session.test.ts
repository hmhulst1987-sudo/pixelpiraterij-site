import assert from "node:assert/strict";
import test from "node:test";
import { createLeadSession, verifyLeadSession } from "../src/lib/lead-session.ts";

test("studio session is signed, expires and is bound to the login secret", async () => {
  const now = Date.UTC(2026, 8, 30, 12);
  const session = await createLeadSession("studio-admin", "long-secret", now);
  assert.equal(await verifyLeadSession(session, "studio-admin", "long-secret", now), true);
  assert.equal(await verifyLeadSession(session, "studio-admin", "wrong-secret", now), false);
  assert.equal(await verifyLeadSession(session, "other-user", "long-secret", now), false);
  assert.equal(await verifyLeadSession(session, "studio-admin", "long-secret", now + 12 * 60 * 60 * 1000), false);
  assert.equal(await verifyLeadSession(session.slice(0, -1) + "x", "studio-admin", "long-secret", now), false);
  assert.equal(await verifyLeadSession("garbage", "studio-admin", "long-secret", now), false);
});
