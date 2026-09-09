"use client";
import { useState } from "react";

type Place = { id: string; displayName?: { text: string }; formattedAddress?: string; websiteUri?: string };
type Score = { score: number; priorities: string[] };

export function LeadsStudio() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanning, setScanning] = useState("");

  async function discover(data: FormData) {
    setBusy(true); setMessage(""); setScores({});
    const response = await fetch("/api/leads/discover", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(Object.fromEntries(data)) });
    const json = await response.json(); setBusy(false);
    if (!response.ok) return setMessage(json.error || "Zoeken mislukt.");
    setPlaces(json.places || []);
  }

  async function scan(place: Place) {
    if (!place.websiteUri) return;
    setScanning(place.id); setMessage("");
    const response = await fetch("/api/leads/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ website: place.websiteUri }) });
    const json = await response.json(); setScanning("");
    if (!response.ok) return setMessage(json.error || "Scan mislukt.");
    setScores((current) => ({ ...current, [place.id]: json.audit }));
  }

  const ranked = [...places].sort((a, b) => (scores[a.id]?.score ?? 101) - (scores[b.id]?.score ?? 101));
  return <>
    <form action={discover} className="lead-form studio-search"><label>Branche<input name="sector" required placeholder="bijvoorbeeld kapper" /></label><label>Plaats of regio<input name="location" required placeholder="bijvoorbeeld Breda" /></label><button className="button-primary" disabled={busy}>{busy ? "Zoeken..." : "Vind bedrijven via Google Places"}</button>{message && <p className="form-error">{message}</p>}</form>
    <div className="lead-table"><div className="lead-table-head"><span>Bedrijf</span><span>Website en scan</span><span>Adres</span><span>Belroute</span></div>{ranked.map((place) => <article key={place.id}><span><b>{place.displayName?.text}</b><small>Place ID: {place.id}</small></span><span>{place.websiteUri ? <><a href={place.websiteUri} target="_blank">Website openen</a><button className="audit-button" onClick={() => scan(place)} disabled={scanning === place.id}>{scanning === place.id ? "Scant..." : scores[place.id] ? `Score ${scores[place.id].score}/100` : "Techniek scannen"}</button>{scores[place.id] && <small>{scores[place.id].priorities.join(", ") || "Geen directe technische aandachtspunten"}</small>}</> : "Geen website vermeld"}</span><span>{place.formattedAddress}</span><span><b className="status-hold">Eerst rechtsvorm controleren</b><small>Eenmanszaak/VOF alleen bellen met aantoonbare opt-in.</small></span></article>)}</div>
    <p className="form-note">Laagste websitescore komt na scannen bovenaan. Google Places-resultaten zijn een werklijst, geen beltoestemming. Bewaar duurzaam alleen het Place ID en je eigen audits/notities; controleer rechtsvorm en bestaande klantrelatie vóór telefonisch contact.</p>
  </>;
}
