import assert from "node:assert/strict";
import test from "node:test";
import { looksLikeLoginWall } from "./website-audit.ts";

test("detects a login-only homepage without mistaking a full site with a login form", () => {
  const login = '<html><title>Frezzo Food</title><body>Gebruikersnaam Wachtwoord<input type="password"></body></html>';
  assert.equal(looksLikeLoginWall(login, "https://frezzofood.nl/"), true);
  const content = `<html><body><h1>Onze diensten</h1>${"Wij bouwen websites voor lokale bedrijven. ".repeat(25)}<input type="password"></body></html>`;
  assert.equal(looksLikeLoginWall(content, "https://example.nl/"), false);
  assert.equal(looksLikeLoginWall("<html><body>Aanmelden</body></html>", "https://example.nl/login"), true);
});
