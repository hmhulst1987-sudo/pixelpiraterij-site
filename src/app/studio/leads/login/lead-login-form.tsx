"use client";

import { useState, type FormEvent } from "react";

export function LeadLoginForm() {
  const [user, setUser] = useState("studio-admin");
  const [password, setPassword] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/leads/session", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ user, password }) });
      if (!response.ok) { setError("Aanmelden is niet gelukt. Controleer de aparte studio-gegevens."); return; }
      const next = new URLSearchParams(window.location.search).get("next") || "/studio/leads";
      window.location.assign(next.startsWith("/studio/leads") && !next.startsWith("//") ? next : "/studio/leads");
    } catch { setError("De studio is tijdelijk niet bereikbaar. Probeer het later opnieuw."); }
    finally { setPending(false); }
  }

  return <form className="lead-form lead-login-form" onSubmit={submit}>
    <p className="eyebrow">Sales Studio / aanmelden</p>
    <label>Gebruikersnaam<input autoComplete="username" value={user} onChange={(event) => setUser(event.target.value)} required /></label>
    <label>Wachtwoord<input autoComplete="current-password" type="password" value={password} onChange={(event) => setPassword(event.target.value)} required /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button-primary" type="submit" disabled={pending}>{pending ? "Aanmelden..." : "Open de studio"}</button>
    <p className="form-note">De studio is alleen bereikbaar via de beveiligde verbinding. Gebruik niet je Coolify-wachtwoord.</p>
  </form>;
}
