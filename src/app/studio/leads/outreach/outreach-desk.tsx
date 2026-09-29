"use client";

import { useEffect, useState } from "react";

type Draft = {
  id: string; site_title: string; opportunity_score: number; source_url: string;
  recipient_email: string | null; subject: string; body: string;
  legal_basis: "none" | "consent" | "existing_customer"; legal_evidence: string | null;
  status: string; revision: number; last_error: string | null; provider_message_id: string | null;
};

export function OutreachDesk() {
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [sendEnabled, setSendEnabled] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [form, setForm] = useState({ recipientEmail: "", subject: "", message: "", legalBasis: "none", legalEvidence: "" });
  const [notice, setNotice] = useState("");
  const [busy, setBusy] = useState(false);
  const selected = drafts.find((draft) => draft.id === selectedId);
  const formDirty = Boolean(selected && (form.recipientEmail !== (selected.recipient_email || "") || form.subject !== selected.subject || form.message !== selected.body || form.legalBasis !== selected.legal_basis || form.legalEvidence !== (selected.legal_evidence || "")));

  async function refresh() {
    const response = await fetch("/api/leads/outreach", { cache: "no-store" });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Berichten laden mislukt.");
    setDrafts(data.drafts);
    setSendEnabled(Boolean(data.sendEnabled));
  }

  useEffect(() => { void refresh().catch((error: Error) => setNotice(error.message)); }, []);

  function select(draft: Draft) {
    setSelectedId(draft.id);
    setForm({ recipientEmail: draft.recipient_email || "", subject: draft.subject, message: draft.body, legalBasis: draft.legal_basis, legalEvidence: draft.legal_evidence || "" });
    setNotice("");
  }

  async function action(name: "edit" | "approve" | "cancel") {
    if (!selected) return;
    setBusy(true);
    try {
      const response = await fetch("/api/leads/outreach", {
        method: "PATCH", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id, action: name, expectedRevision: selected.revision, ...form }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Actie mislukt.");
      await refresh();
      if (name === "edit") setForm({ recipientEmail: form.recipientEmail.trim().toLowerCase(), subject: form.subject.trim(), message: form.message.trim(), legalBasis: form.legalBasis, legalEvidence: form.legalEvidence.trim() });
      setNotice(name === "edit" ? "Concept opgeslagen. Keur de exacte tekst daarna apart goed." : name === "approve" ? "Goedgekeurd, maar nog niet verzonden." : "Concept geannuleerd.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Actie mislukt."); }
    finally { setBusy(false); }
  }

  async function send() {
    if (!selected || selected.status !== "approved" || formDirty || !window.confirm(`Verstuur dit goedgekeurde bericht naar ${selected.recipient_email}? Controleer dat de vastgelegde contactgrond werkelijk geldt.`)) return;
    setBusy(true);
    try {
      const response = await fetch("/api/leads/outreach/send", {
        method: "POST", headers: { "Content-Type": "application/json", "X-Lead-Manual-Send": "confirmed" },
        body: JSON.stringify({ id: selected.id, expectedRevision: selected.revision }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Verzenden mislukt.");
      await refresh();
      setNotice("Bericht door Resend geaccepteerd. Controleer de bezorgstatus afzonderlijk.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Verzendstatus onbekend."); await refresh().catch(() => undefined); }
    finally { setBusy(false); }
  }

  async function suppress() {
    if (!selected?.recipient_email || !window.confirm(`Zet ${selected.recipient_email} op de uitsluitlijst?`)) return;
    const reason = window.prompt("Reden van uitsluiting, bijvoorbeeld afmelding of bezwaar:");
    if (!reason) return;
    setBusy(true);
    try {
      const response = await fetch("/api/leads/outreach", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email: selected.recipient_email, reason }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Uitsluiten mislukt.");
      await refresh();
      setNotice("Adres uitgesloten van toekomstige outreach.");
    } catch (error) { setNotice(error instanceof Error ? error.message : "Uitsluiten mislukt."); }
    finally { setBusy(false); }
  }

  return <div className="lead-outreach-layout">
    <div className="lead-outreach-list"><p className="section-tag">Voorbereid, niet automatisch verzonden</p><h2>Concepten</h2><p>Geen geldige contactgrond? Dan blijft de mail uit, ook als het bedrijf interessant is.</p>{drafts.length === 0 && <p>Er zijn nog geen voorbereide berichten.</p>}{drafts.map((draft) => <button key={draft.id} type="button" className={draft.id === selectedId ? "lead-outreach-item active" : "lead-outreach-item"} onClick={() => select(draft)}><strong>{draft.site_title}</strong><span>{draft.status} · kans {draft.opportunity_score}/100</span></button>)}</div>
    <div className="lead-outreach-editor">{!selected ? <p>Kies een concept om tekst, bron en contactstatus te controleren.</p> : <><p className="section-tag">{selected.status}</p><h2>{selected.site_title}</h2><p>Bron: <a href={selected.source_url} target="_blank" rel="noreferrer">eigen website controleren</a></p><label>Ontvanger<input type="email" value={form.recipientEmail} onChange={(event) => setForm({ ...form, recipientEmail: event.target.value })} disabled={busy || !["draft", "approved"].includes(selected.status)} /></label><label>Onderwerp<input value={form.subject} onChange={(event) => setForm({ ...form, subject: event.target.value })} disabled={busy || !["draft", "approved"].includes(selected.status)} /></label><label>Volledige tekst<textarea rows={12} value={form.message} onChange={(event) => setForm({ ...form, message: event.target.value })} disabled={busy || !["draft", "approved"].includes(selected.status)} /></label><label>Contactgrond<select value={form.legalBasis} onChange={(event) => setForm({ ...form, legalBasis: event.target.value })} disabled={busy || !["draft", "approved"].includes(selected.status)}><option value="none">Niet vastgesteld, niet mailen</option><option value="consent">Voorafgaande toestemming</option><option value="existing_customer">Bestaande klant, relevante dienst</option></select></label><label>Bewijs en herkomst van contactgrond<textarea rows={3} value={form.legalEvidence} onChange={(event) => setForm({ ...form, legalEvidence: event.target.value })} placeholder="Datum, bron en wat er precies is toegestaan" disabled={busy || !["draft", "approved"].includes(selected.status)} /></label><div className="lead-outreach-actions">{["draft", "approved"].includes(selected.status) && <><button type="button" onClick={() => void action("edit")} disabled={busy || !formDirty}>Concept opslaan</button><button type="button" onClick={() => void action("approve")} disabled={busy || selected.status !== "draft" || formDirty}>Exacte tekst goedkeuren</button><button type="button" onClick={() => void action("cancel")} disabled={busy}>Annuleren</button></>}{selected.status === "approved" && <button type="button" onClick={() => void send()} disabled={busy || !sendEnabled || formDirty}>Afzonderlijk versturen</button>}{selected.recipient_email && <button type="button" onClick={() => void suppress()} disabled={busy}>Adres uitsluiten</button>}</div>{formDirty && <small>Niet-opgeslagen wijzigingen: sla eerst op en keur de definitieve tekst opnieuw goed.</small>}{!sendEnabled && <small>Verzenden staat op serverniveau uit totdat afzender en juridische controle zijn ingericht.</small>}{selected.status === "failed_unknown" && <strong>Niet opnieuw versturen. Controleer eerst de providerstatus.</strong>}{selected.provider_message_id && <small>Resend-ID: {selected.provider_message_id}</small>}{selected.last_error && <small>Laatste fout: {selected.last_error}</small>}</>}{notice && <p role="status">{notice}</p>}</div>
  </div>;
}
