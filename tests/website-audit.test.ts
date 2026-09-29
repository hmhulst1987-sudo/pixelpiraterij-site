import assert from "node:assert/strict";
import test from "node:test";
import { publicAddress } from "../src/lib/website-audit";

function resolved(...addresses: string[]) {
  return async () => addresses.map((address) => ({ address, family: address.includes(":") ? 6 : 4 }));
}

test("public website resolves to a routable address", async () => {
  const result = await publicAddress(new URL("https://example.com"), resolved("93.184.215.14"));
  assert.equal(result.address, "93.184.215.14");
});

test("a mixed public and private DNS answer is rejected", async () => {
  await assert.rejects(publicAddress(new URL("https://example.com"), resolved("93.184.215.14", "169.254.169.254")), /niet veilig/);
});

test("private and documentation IP ranges are rejected", async () => {
  for (const ip of ["127.0.0.1", "10.1.2.3", "172.16.0.1", "192.168.1.1", "192.0.2.10", "198.51.100.5", "203.0.113.3", "::1", "fc00::1", "2001:db8::1"]) {
    await assert.rejects(publicAddress(new URL("https://example.com"), resolved(ip)), /niet veilig/, ip);
  }
});

test("a normal public IPv6 answer is accepted", async () => {
  const result = await publicAddress(new URL("https://example.com"), resolved("2606:4700:4700::1111"));
  assert.equal(result.family, 6);
});
