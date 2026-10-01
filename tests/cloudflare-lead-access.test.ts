import assert from "node:assert/strict";
import { test } from "node:test";
import { createLocalJWKSet, exportJWK, generateKeyPair, SignJWT } from "jose";
import { verifyAccessAssertion } from "../src/lib/cloudflare-lead-access.ts";

const config = {
  teamDomain: "https://example.cloudflareaccess.com",
  audience: "leadstudio-audience",
  email: "owner@example.com",
};

test("Cloudflare Access requires a signed token for this app and owner", async () => {
  const { publicKey, privateKey } = await generateKeyPair("RS256");
  const keySet = createLocalJWKSet({ keys: [{ ...await exportJWK(publicKey), kid: "test-key", alg: "RS256", use: "sig" }] });
  const sign = (claims: Record<string, string>, audience = config.audience, issuer = config.teamDomain) =>
    new SignJWT({ type: "app", email: config.email, ...claims })
      .setProtectedHeader({ alg: "RS256", kid: "test-key" })
      .setAudience(audience)
      .setIssuer(issuer)
      .setIssuedAt()
      .setExpirationTime("5m")
      .sign(privateKey);

  assert.equal(await verifyAccessAssertion(null, config, keySet), false);
  assert.equal(await verifyAccessAssertion(await sign({}), config, keySet), true);
  assert.equal(await verifyAccessAssertion(await sign({ email: "someone-else@example.com" }), config, keySet), false);
  assert.equal(await verifyAccessAssertion(await sign({ type: "service" }), config, keySet), false);
  assert.equal(await verifyAccessAssertion(await sign({}, "other-app"), config, keySet), false);
  assert.equal(await verifyAccessAssertion(await sign({}, config.audience, "https://other.cloudflareaccess.com"), config, keySet), false);
  assert.equal(await verifyAccessAssertion(`${await sign({})}x`, config, keySet), false);
});
