"use client";

import { useState } from "react";

type Result = { score: number; finalUrl: string; signals: { label: string; ok: boolean; detail: string }[]; priorities: string[] };

export function WebsiteCheckForm() {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  async function submit(formData: FormData) {
    setBusy(true); setError("");
    const payload = Object.fromEntries(formData.entries());
    const response = await fetch("/api/leads/website-scan", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...payload, phoneConsent: formData.get("phoneConsent") === "on" }) });
    const data = await response.json();
    setBusy(false);
    if (!response.ok) return setError(data.error || "De scan is niet gelukt.");
    setResult(data.audit);
  }
  if (result) return <div className="lead-result"><p className="section-tag">Eerste meting</p><p className="lead-score">{result.score}<span>/100</span></p><h2>Dit is je technische vertrekpunt.</h2><div className="lead-signals">{result.signals.map((signal) => <div key={signal.label} className={signal.ok ? "is-good" : "is-attention"}><b>{signal.ok ? "Goed" : "Aandacht"}</b><span>{signal.label}</span><small>{signal.detail}</small></div>)}</div><p className="form-note">We nemen alleen telefonisch contact op omdat je daar zojuist expliciet toestemming voor gaf. Intrekken kan via privacy@pixelpiraterij.nl.</p></div>;
  return <form className="lead-form" action={submit}>
    <label>Bedrijfsnaam<input name="company" required autoComplete="organization" /></label>
    <label>Website<input name="website" required type="text" inputMode="url" placeholder="jouwbedrijf.nl" /></label>
    <div className="lead-form-row"><label>Naam<input name="name" required autoComplete="name" /></label><label>E-mailadres<input name="email" required type="email" autoComplete="email" /></label></div>
    <div className="lead-form-row"><label>Telefoonnummer<input name="phone" required type="tel" autoComplete="tel" /></label><label>KvK-nummer <span>(optioneel)</span><input name="kvk" inputMode="numeric" maxLength={8} /></label></div>
    <label>Rechtsvorm<select name="legalForm" defaultValue="onbekend"><option value="onbekend">Nog niet ingevuld</option><option value="eenmanszaak">Eenmanszaak</option><option value="vof">VOF / maatschap</option><option value="bv">BV / NV</option><option value="stichting">Stichting / vereniging</option></select></label>
    <label className="consent-box"><input name="phoneConsent" type="checkbox" required /><span>Ik geef PixelPiraterij toestemming mij telefonisch te benaderen over de uitslag van mijn websitecheck en een mogelijk websitevoorstel.</span></label>
    <p className="form-note">We bewaren het toestemmingsmoment als bewijs. Je kunt toestemming altijd intrekken via privacy@pixelpiraterij.nl. Bekijk ook ons <a href="/legal">privacybeleid</a>.</p>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button-primary" disabled={busy}>{busy ? "Website wordt gecontroleerd..." : "Start mijn gratis websitecheck"}</button>
  </form>;
}
