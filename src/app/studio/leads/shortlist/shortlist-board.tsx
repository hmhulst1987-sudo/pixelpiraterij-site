"use client";

import { useEffect, useState } from "react";

type Candidate = {
  id: string;
  source_site_url: string;
  site_title: string;
  technical_score: number;
  opportunity_score: number;
  audit: { priorities?: string[]; qualification?: { scoreReason?: string } };
  deep_audit: { desktopScreenshot?: string; mobileScreenshot?: string } | null;
};

export function ShortlistBoard() {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    async function load() {
      try {
        const response = await fetch("/api/leads/candidates?status=shortlisted", { cache: "no-store" });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error || "Shortlist laden mislukt.");
        if (active) setCandidates(data.candidates);
      } catch (cause) {
        if (active) setError(cause instanceof Error ? cause.message : "Shortlist laden mislukt.");
      } finally {
        if (active) setLoading(false);
      }
    }
    void load();
    return () => { active = false; };
  }, []);

  async function remove(candidate: Candidate) {
    setUpdating(candidate.id);
    setError("");
    try {
      const response = await fetch("/api/leads/candidates", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: candidate.id, status: "reviewing" }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Status wijzigen mislukt.");
      setCandidates((current) => current.filter((item) => item.id !== candidate.id));
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "Status wijzigen mislukt.");
    } finally {
      setUpdating(null);
    }
  }

  return <div className="lead-shortlist-board">
    <p className="section-tag">Zelf geselecteerd · opgeslagen in de leadstudio</p>
    <h2>Mijn kandidaten{!loading ? ` (${candidates.length})` : ""}</h2>
    {loading && <p>Shortlist laden...</p>}
    {error && <p role="alert">{error}</p>}
    {!loading && candidates.length === 0 && <p>Je hebt nog geen kandidaten geselecteerd. Zet op de <a href="/studio/leads">zoekpagina</a> een bedrijf op je shortlist.</p>}
    <div className="lead-shortlist-grid">{candidates.map((candidate) => <article key={candidate.id}>
      <p className="section-tag">Handmatig geselecteerd</p>
      <h3>{candidate.site_title}</h3>
      <p>Kans {candidate.opportunity_score}/100 · techniek {candidate.technical_score}/100</p>
      <p>{candidate.audit.priorities?.join(", ") || "Geen duidelijke technische prioriteit"}</p>
      <small>{candidate.audit.qualification?.scoreReason || "Controleer de bronwebsite zelf voordat je conclusies trekt."}</small>
      <div className="lead-shortlist-actions"><a className="lead-site-check-link" href={candidate.source_site_url} target="_blank" rel="noopener noreferrer">Open live website ↗</a>
        {candidate.deep_audit?.desktopScreenshot && <a href={candidate.deep_audit.desktopScreenshot} target="_blank" rel="noopener noreferrer">Desktopbeeld</a>}
        {candidate.deep_audit?.mobileScreenshot && <a href={candidate.deep_audit.mobileScreenshot} target="_blank" rel="noopener noreferrer">Mobiel beeld</a>}
      </div>
      <button type="button" className="audit-button" disabled={updating === candidate.id} onClick={() => { void remove(candidate); }}>Haal van shortlist</button>
    </article>)}</div>
  </div>;
}
