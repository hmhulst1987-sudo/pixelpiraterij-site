"use client";

import { useEffect, useRef, useState } from "react";
import { qualifyLead, type LeadQualification } from "@/lib/lead-qualification";
import type { DeepAudit } from "@/lib/firecrawl-lead-audit";
import { selectDeepAuditCandidates } from "@/lib/firecrawl-findings";
import { estimatedGrossMapsUsd, usageKinds, type LeadLimits, type LeadMode, type LeadUsage, type UsageKind } from "@/lib/lead-control-shared";

type Coordinates = { lat: number; lng: number };
type Place = { id: string; displayName?: { text: string }; formattedAddress?: string; websiteUri?: string; primaryType?: string; location?: { latitude: number; longitude: number } };
type Score = { score: number; finalUrl: string; priorities: string[]; signals?: { label: string; ok: boolean; detail: string }[]; qualification: LeadQualification; pagesChecked: { url: string; title: string; status: number }[] };
type Filter = "all" | "no-site" | "opportunity" | "unscanned" | "large";
type PreviewDraft = { template: "service-editorial" | "garden-atelier" | "harbor-light"; name: string; city: string; service: string; tagline: string; description: string; email: string; phone: string };
type MapLike = { setCenter(position: Coordinates): void; setZoom(zoom: number): void; fitBounds(bounds: unknown): void; addListener(event: string, callback: (event: { latLng?: { lat(): number; lng(): number } }) => void): void };
type MarkerLike = { setMap(map: MapLike | null): void };
type CircleLike = { setMap(map: MapLike | null): void };
type ControlSnapshot = { mode: LeadMode; limits: LeadLimits; usage: LeadUsage; period: string; workerLastSeen: string | null };
type Campaign = { id: string; label: string; latitude: number; longitude: number; radius_m: number; interval_minutes: number; max_candidates: number; enabled: boolean; next_run_at: string };
type CampaignRun = { id: string; campaign_id: string; status: string; places_found: number; websites_scanned: number; deep_scanned: number; places_requests: number; firecrawl_requests: number; error: string | null; started_at: string };
type SavedCandidate = { id: string; source_site_url: string; site_title: string; technical_score: number; opportunity_score: number; size_class: string; status: string; audit: Score; deep_audit: DeepAudit | null; last_seen_at: string };

declare global {
  interface Window {
    google?: { maps: {
      Map: new (element: HTMLElement, options: Record<string, unknown>) => MapLike;
      Marker: new (options: Record<string, unknown>) => MarkerLike;
      Circle: new (options: Record<string, unknown>) => CircleLike;
      LatLngBounds: new () => { extend(position: Coordinates): void };
    } };
  }
}

const DEFAULT_CENTER = { lat: 51.5719, lng: 4.7683 };
const usageLabels: Record<UsageKind, string> = { search_runs: "Zoekrondes", places: "Places Enterprise", firecrawl: "Firecrawl", geocode: "Plaatszoekacties", previews: "Handmatige concepten", ai: "AI-verzoeken" };
const usd = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "USD" });

function SavedCandidateEvidence({ candidate }: { candidate: SavedCandidate }) {
  const deep = candidate.deep_audit;
  const screenshots = [
    { label: "Desktop", url: deep?.desktopScreenshot },
    { label: "Mobiel", url: deep?.mobileScreenshot },
  ].filter((item): item is { label: string; url: string } => Boolean(item.url));

  return <details className="lead-deep-audit">
    <summary>Bekijk bewijs, beelden en onzekerheden</summary>
    <div className="lead-evidence-grid">
      <section>
        <h5>Technische feiten</h5>
        <small>{candidate.audit.pagesChecked.length} pagina(&apos;s) van de eigen website gecontroleerd.</small>
        <ul>{(candidate.audit.signals || []).map((signal) => <li key={signal.label}><b>{signal.label}: {signal.ok ? "aanwezig" : "aandachtspunt"}</b><small>{signal.detail}</small></li>)}</ul>
        <small>{deep?.findings.length ? deep.findings.join(" ") : "Geen extra gerenderde tekstsignalen opgeslagen."}</small>
      </section>
      <section>
        <h5>Visuele controle</h5>
        {screenshots.length ? <div className="lead-screenshots">{screenshots.map((shot) => <a key={shot.label} href={shot.url} target="_blank" rel="noreferrer"><img src={shot.url} alt={`${shot.label}-opname van ${candidate.site_title}`} /><small>{shot.label}</small></a>)}</div> : <small>Geen gerenderde screenshots beschikbaar.</small>}
        <small>Screenshots kunnen na 24 uur verlopen. Er is geen automatische esthetische score; beoordeel het ontwerp zelf.</small>
      </section>
      <section>
        <h5>Onzekerheden</h5>
        <small>{candidate.audit.qualification.sizeReason}</small>
        <small>{candidate.audit.qualification.scoreReason}</small>
        {(deep?.warnings || []).map((warning) => <small key={warning}>{warning}</small>)}
        <small>De score bewijst geen bedrijfsgrootte, contacttoestemming of behoefte aan een nieuwe website.</small>
      </section>
    </div>
  </details>;
}

function loadMaps(key: string) {
  if (window.google?.maps) return Promise.resolve();
  return new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-pixel-maps="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener("error", () => reject(new Error("Google Maps kon niet laden.")), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(key)}&v=weekly`;
    script.async = true;
    script.dataset.pixelMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Google Maps kon niet laden."));
    document.head.appendChild(script);
  });
}

export function LeadsStudio({ mapKey, previewReady, firecrawlReady }: { mapKey: string; previewReady: boolean; firecrawlReady: boolean }) {
  const mapElement = useRef<HTMLDivElement>(null);
  const map = useRef<MapLike | null>(null);
  const pin = useRef<MarkerLike | null>(null);
  const circle = useRef<CircleLike | null>(null);
  const resultMarkers = useRef<MarkerLike[]>([]);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [radius, setRadius] = useState(20_000);
  const [places, setPlaces] = useState<Place[]>([]);
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [auditErrors, setAuditErrors] = useState<Record<string, string>>({});
  const [deepAudits, setDeepAudits] = useState<Record<string, DeepAudit>>({});
  const [deepErrors, setDeepErrors] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanProgress, setScanProgress] = useState({ done: 0, total: 0 });
  const [deepProgress, setDeepProgress] = useState({ done: 0, total: 0, requests: 0 });
  const [filter, setFilter] = useState<Filter>("opportunity");
  const [control, setControl] = useState<ControlSnapshot | null>(null);
  const [controlError, setControlError] = useState("");
  const [controlBusy, setControlBusy] = useState(false);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [campaignRuns, setCampaignRuns] = useState<CampaignRun[]>([]);
  const [candidates, setCandidates] = useState<SavedCandidate[]>([]);
  const [pipelineError, setPipelineError] = useState("");
  const [draftPlace, setDraftPlace] = useState<Place | null>(null);
  const [draft, setDraft] = useState<PreviewDraft>({ template: "service-editorial", name: "", city: "", service: "", tagline: "", description: "", email: "", phone: "" });
  const [verified, setVerified] = useState(false);
  const [previewBusy, setPreviewBusy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewError, setPreviewError] = useState("");
  const previewActionKey = useRef<string | null>(null);

  useEffect(() => {
    void refreshControl();
    void refreshPipeline();
    const interval = window.setInterval(() => { void refreshControl(); void refreshPipeline(); }, 15000);
    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!mapKey || !mapElement.current) return;
    let active = true;
    loadMaps(mapKey).then(() => {
      if (!active || !mapElement.current || !window.google) return;
      map.current = new window.google.maps.Map(mapElement.current, { center: DEFAULT_CENTER, zoom: 11, mapTypeControl: false, streetViewControl: false, fullscreenControl: false });
      map.current.addListener("click", (event) => {
        if (event.latLng) setCenter({ lat: event.latLng.lat(), lng: event.latLng.lng() });
      });
    }).catch((error: Error) => setMessage(error.message));
    return () => { active = false; };
  }, [mapKey]);

  useEffect(() => {
    if (!map.current || !window.google) return;
    pin.current?.setMap(null);
    circle.current?.setMap(null);
    pin.current = new window.google.maps.Marker({ map: map.current, position: center, title: "Middelpunt zoekgebied" });
    circle.current = new window.google.maps.Circle({ map: map.current, center, radius, fillColor: "#c95634", fillOpacity: 0.1, strokeColor: "#c95634", strokeOpacity: 0.8, strokeWeight: 2 });
    map.current.setCenter(center);
  }, [center, radius]);

  useEffect(() => {
    if (!map.current || !window.google) return;
    resultMarkers.current.forEach((marker) => marker.setMap(null));
    resultMarkers.current = [];
    const bounds = new window.google.maps.LatLngBounds();
    let count = 0;
    for (const place of places) {
      if (!place.location) continue;
      const position = { lat: place.location.latitude, lng: place.location.longitude };
      bounds.extend(position);
      resultMarkers.current.push(new window.google.maps.Marker({ map: map.current, position, title: place.displayName?.text || "Bedrijf" }));
      count += 1;
    }
    if (count > 1) map.current.fitBounds(bounds);
  }, [places]);

  async function refreshControl() {
    try {
      const response = await fetch("/api/leads/control", { cache: "no-store" });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "De meter kon niet laden.");
      setControl(result as ControlSnapshot);
      setControlError("");
    } catch (error) {
      setControlError(error instanceof Error ? error.message : "De meter kon niet laden.");
    }
  }

  async function refreshPipeline() {
    try {
      const [campaignResponse, candidateResponse] = await Promise.all([fetch("/api/leads/campaigns", { cache: "no-store" }), fetch("/api/leads/candidates", { cache: "no-store" })]);
      const [campaignData, candidateData] = await Promise.all([campaignResponse.json(), candidateResponse.json()]);
      if (!campaignResponse.ok || !candidateResponse.ok) throw new Error(campaignData.error || candidateData.error || "De wachtrij kon niet laden.");
      setCampaigns(campaignData.campaigns as Campaign[]);
      setCampaignRuns(campaignData.runs as CampaignRun[]);
      setCandidates(candidateData.candidates as SavedCandidate[]);
      setPipelineError("");
    } catch (error) { setPipelineError(error instanceof Error ? error.message : "De wachtrij kon niet laden."); }
  }

  async function createCampaign(data: FormData) {
    setPipelineError("");
    try {
      const response = await fetch("/api/leads/campaigns", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ label: String(data.get("label") || "").trim(), latitude: center.lat, longitude: center.lng, radius, intervalHours: Number(data.get("intervalHours")), maxCandidates: Number(data.get("maxCandidates")) }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Campagne opslaan mislukt.");
      await refreshPipeline();
    } catch (error) { setPipelineError(error instanceof Error ? error.message : "Campagne opslaan mislukt."); }
  }

  async function setCampaignEnabled(campaign: Campaign, enabled: boolean) {
    try {
      const response = await fetch("/api/leads/campaigns", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: campaign.id, enabled }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Campagne wijzigen mislukt.");
      await refreshPipeline();
    } catch (error) { setPipelineError(error instanceof Error ? error.message : "Campagne wijzigen mislukt."); }
  }

  async function setCandidateStatus(candidate: SavedCandidate, status: string) {
    try {
      const response = await fetch("/api/leads/candidates", { method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: candidate.id, status }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Lead wijzigen mislukt.");
      await refreshPipeline();
    } catch (error) { setPipelineError(error instanceof Error ? error.message : "Lead wijzigen mislukt."); }
  }

  async function updateControl(mode: LeadMode, limits?: Partial<LeadLimits>) {
    setControlBusy(true);
    setControlError("");
    try {
      const response = await fetch("/api/leads/control", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ mode, limits }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Instellingen opslaan mislukt.");
      setControl(result as ControlSnapshot);
    } catch (error) {
      setControlError(error instanceof Error ? error.message : "Instellingen opslaan mislukt.");
    } finally { setControlBusy(false); }
  }

  async function findLocation(data: FormData) {
    const location = String(data.get("location") || "").trim();
    if (!location) return setMessage("Vul een plaats in of kies een punt op de kaart.");
    setMessage("");
    try {
      const response = await fetch("/api/leads/geocode", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ location }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setCenter(result.center);
      map.current?.setZoom(11);
    } catch {
      setMessage("Deze plaats kon niet op de kaart worden gevonden.");
    }
  }

  async function auditPlace(place: Place) {
    if (!place.websiteUri) return null;
    try {
      const response = await fetch("/api/leads/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ website: place.websiteUri, businessName: place.displayName?.text }) });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Scan niet gelukt.");
      setScores((current) => ({ ...current, [place.id]: json.audit }));
      return { place, audit: json.audit as Score };
    } catch (error) {
      setAuditErrors((current) => ({ ...current, [place.id]: error instanceof Error ? error.message : "Scan niet gelukt." }));
      return null;
    } finally {
      setScanProgress((current) => ({ ...current, done: current.done + 1 }));
    }
  }

  async function auditAll(found: Place[]) {
    const websites = found.filter((place) => place.websiteUri && qualifyLead(null, "", place.displayName?.text).size !== "likely-large");
    const successful: Array<{ place: Place; audit: Score }> = [];
    setScanProgress({ done: 0, total: websites.length });
    let cursor = 0;
    async function worker() {
      while (cursor < websites.length) {
        const place = websites[cursor++];
        const result = await auditPlace(place);
        if (result) successful.push(result);
      }
    }
    await Promise.all(Array.from({ length: Math.min(3, websites.length) }, worker));
    return successful;
  }

  async function deepenBest(scanned: Array<{ place: Place; audit: Score }>) {
    const best = selectDeepAuditCandidates(scanned);
    setDeepProgress({ done: 0, total: best.length, requests: 0 });
    for (const { place, audit } of best) {
      const contactPage = audit.pagesChecked.find((page) => page.status < 400 && /\b(?:contact|bereikbaar|over-ons|about)\b/i.test(new URL(page.url).pathname) && page.url !== audit.finalUrl)?.url;
      try {
        const response = await fetch("/api/leads/deep-audit", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ website: audit.finalUrl, contactPage }),
        });
        const json = await response.json();
        if (!response.ok) throw new Error(json.error || "Verdieping mislukt.");
        const deep = json.audit as DeepAudit;
        setDeepAudits((current) => ({ ...current, [place.id]: deep }));
        setDeepProgress((current) => ({ done: current.done + 1, total: current.total, requests: current.requests + deep.requestsAttempted }));
        if (deep.warnings.some((warning) => /sleutel is ongeldig|credits zijn op|verzoeklimiet bereikt/i.test(warning))) {
          setMessage("Firecrawl is gestopt: controleer de API-sleutel, credits of verzoeklimiet. De goedkope scans blijven zichtbaar.");
          break;
        }
      } catch (error) {
        setDeepErrors((current) => ({ ...current, [place.id]: error instanceof Error ? error.message : "Verdieping mislukt." }));
        setDeepProgress((current) => ({ ...current, done: current.done + 1 }));
      }
    }
    await refreshControl();
  }

  async function discoverNearby() {
    setBusy(true); setMessage(""); setScores({}); setAuditErrors({}); setDeepAudits({}); setDeepErrors({}); setPlaces([]); setScanProgress({ done: 0, total: 0 }); setDeepProgress({ done: 0, total: 0, requests: 0 });
    try {
      const response = await fetch("/api/leads/nearby", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ latitude: center.lat, longitude: center.lng, radius }) });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Zoeken mislukt.");
      const found = (json.places || []) as Place[];
      setPlaces(found);
      if (json.failures) setMessage(`${json.failures} van de 5 zoekgroepen gaf geen resultaat; de overige resultaten zijn wel verwerkt.`);
      if (json.limitReached) setMessage(`De zoekronde stopte vroeg: ${json.limitReached}`);
      const scanned = await auditAll(found);
      if (firecrawlReady) await deepenBest(scanned);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Zoeken mislukt.");
    } finally { setBusy(false); await refreshControl(); }
  }

  function qualificationFor(place: Place) {
    return scores[place.id]?.qualification ?? qualifyLead(null, "", place.displayName?.text);
  }

  function openPreviewDraft(place: Place) {
    setDraftPlace(place);
    previewActionKey.current = null;
    setDraft({ template: "service-editorial", name: place.displayName?.text || "", city: "", service: "", tagline: "", description: "", email: "", phone: "" });
    setVerified(false);
    setPreviewUrl("");
    setPreviewError("");
    requestAnimationFrame(() => document.getElementById("preview-draft")?.scrollIntoView({ behavior: "smooth", block: "start" }));
  }

  async function createPreview() {
    setPreviewBusy(true);
    setPreviewError("");
    setPreviewUrl("");
    try {
      previewActionKey.current ||= crypto.randomUUID();
      const response = await fetch("/api/leads/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, verified, idempotencyKey: previewActionKey.current }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "De preview kon niet worden gemaakt.");
      setPreviewUrl(result.url);
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : "De preview kon niet worden gemaakt.");
    } finally {
      await refreshControl();
      setPreviewBusy(false);
    }
  }

  const ranked = [...places].filter((place) => {
    const qualification = qualificationFor(place);
    if (filter === "no-site") return !place.websiteUri;
    if (filter === "opportunity") return !auditErrors[place.id] && qualification.size !== "likely-large" && qualification.opportunityScore >= 40;
    if (filter === "unscanned") return Boolean(place.websiteUri) && !scores[place.id];
    if (filter === "large") return qualification.size === "likely-large";
    return true;
  }).sort((a, b) => {
    return qualificationFor(b).opportunityScore - qualificationFor(a).opportunityScore;
  });
  const opportunities = places.filter((place) => !auditErrors[place.id] && qualificationFor(place).size !== "likely-large" && qualificationFor(place).opportunityScore >= 40).length;
  const workerOnline = Boolean(control?.workerLastSeen && Date.now() - new Date(control.workerLastSeen).getTime() < 120000);

  return <>
    <div className="lead-map-layout">
      <div className="lead-map-panel">
        {mapKey ? <div ref={mapElement} className="lead-map" aria-label="Google Maps zoekgebied" /> : <div className="lead-map lead-map-missing">Stel `GOOGLE_MAPS_BROWSER_KEY` in om de kaart te laden.</div>}
        <div className="lead-map-caption"><span>Klik op de kaart om het middelpunt te verplaatsen.</span><b>{radius / 1000} km zoekcirkel</b></div>
      </div>
      <div className="lead-controls">
        <div className="lead-control-panel">
          <p className="section-tag">Lead-worker · {control?.period || "geen database"}</p>
          <div className="lead-control-header"><strong>{control?.mode === "running" ? "Actief" : "Gepauzeerd"}</strong><button type="button" className="audit-button" disabled={!control || controlBusy || busy || (control.mode === "paused" && !workerOnline)} onClick={() => { if (control) void updateControl(control.mode === "running" ? "paused" : "running"); }}>{control?.mode === "running" ? "Pauzeer worker" : "Start worker"}</button></div>
          <small>{workerOnline ? "Worker verbonden" : "Worker offline: start eerst de aparte service op de VPS."}</small>
          <small>Start en Pauze sturen alleen de automatische lead-worker. Het dashboard blijft bereikbaar. Betaalde API-verzoeken worden ook op de server gecontroleerd.</small>
          {control && <div className="lead-control-meters">{usageKinds.map((kind) => <div className="lead-usage" key={kind}><div><small>{usageLabels[kind]}</small><strong>{control.usage[kind]}<span> / {control.limits[kind]} deze maand</span></strong></div><progress max={Math.max(1, control.limits[kind])} value={Math.min(control.usage[kind], control.limits[kind])} /></div>)}</div>}
          {control && usageKinds.some((kind) => control.limits[kind] > 0 && control.usage[kind] / control.limits[kind] >= .8) && <p className="form-error" role="alert">Waarschuwing: {usageKinds.filter((kind) => control.limits[kind] > 0 && control.usage[kind] / control.limits[kind] >= .8).map((kind) => `${usageLabels[kind]} ${Math.min(100, Math.round(100 * control.usage[kind] / control.limits[kind]))}%`).join(" · ")}. Bij 100% weigert de server nieuwe verzoeken voor die dienst.</p>}
          {control && <small>Indicatie bruto Google Maps-lijsttarief deze maand: {usd.format(estimatedGrossMapsUsd(control.usage.places, control.usage.geocode))}. Dit is geen factuur: mogelijke gratis SKU-limieten, gedeeld billingverbruik, kaartloads, Firecrawl-abonnement, AI en belastingen ontbreken. <a href="https://developers.google.com/maps/billing-and-pricing/pricing" target="_blank" rel="noreferrer">Actuele Google-tarieven</a> · <a href="https://www.firecrawl.dev/pricing" target="_blank" rel="noreferrer">Firecrawl-credits</a>.</small>}
          {control && <form className="lead-limit-form" key={JSON.stringify(control.limits)} onSubmit={(event) => { event.preventDefault(); const data = new FormData(event.currentTarget); const limits = Object.fromEntries(usageKinds.map((kind) => [kind, Number(data.get(kind))])) as LeadLimits; void updateControl(control.mode, limits); }}><p className="section-tag">Harde maandlimieten</p><div>{usageKinds.map((kind) => <label key={kind}>{usageLabels[kind]}<input name={kind} type="number" min="0" max="100000" step="1" defaultValue={control.limits[kind]} required /></label>)}</div><button className="audit-button" type="submit" disabled={controlBusy}>Limieten opslaan</button></form>}
          {controlError && <p className="form-error">{controlError}</p>}
        </div>
        <form action={createCampaign} className="lead-campaign-form"><p className="section-tag">Automatische zoekcampagne</p><label>Naam van de campagne<input name="label" placeholder="bijvoorbeeld Breda centrum" maxLength={120} required /></label><div><label>Herhaal elke (uren)<input name="intervalHours" type="number" min="1" max="720" defaultValue="24" required /></label><label>Maximaal te scannen sites<input name="maxCandidates" type="number" min="1" max="100" defaultValue="20" required /></label></div><small>Gebruikt het gekozen middelpunt en de zoekstraal van de kaart. Een nieuwe campagne start pas als de worker op Start staat.</small><button type="submit" className="audit-button" disabled={!control}>Campagne bewaren</button></form>
        {campaigns.length > 0 && <div className="lead-campaign-list"><p className="section-tag">Geplande campagnes</p>{campaigns.map((campaign) => <div key={campaign.id}><span><b>{campaign.label}</b><small>{campaign.radius_m / 1000} km · iedere {campaign.interval_minutes / 60} uur · maximaal {campaign.max_candidates} sites</small><small>Volgende ronde: {new Date(campaign.next_run_at).toLocaleString("nl-NL")}</small></span><button type="button" className="audit-button" onClick={() => { void setCampaignEnabled(campaign, !campaign.enabled); }}>{campaign.enabled ? "Zet uit" : "Zet aan"}</button></div>)}</div>}
        {campaignRuns.length > 0 && <div className="lead-campaign-list"><p className="section-tag">Laatste runs</p>{campaignRuns.slice(0, 5).map((run) => <small key={run.id}>{new Date(run.started_at).toLocaleString("nl-NL")} · {run.status} · {run.places_found} gevonden, {run.websites_scanned} websites, {run.deep_scanned} verdiept · {run.places_requests} Places- en {run.firecrawl_requests} Firecrawl-verzoeken · bruto Places {usd.format(estimatedGrossMapsUsd(run.places_requests, 0))}{run.error ? ` · ${run.error}` : ""}</small>)}</div>}
        {pipelineError && <p className="form-error">{pipelineError}</p>}
        <form action={findLocation} className="lead-form studio-location-search"><label>Plaats<input name="location" placeholder="bijvoorbeeld Breda" /></label><button className="audit-button" type="submit" disabled={!mapKey}>Zet op kaart</button></form>
        <div className="lead-radius"><span>Zoekstraal</span>{[5, 10, 20, 25].map((km) => <button key={km} className={radius === km * 1000 ? "is-active" : ""} onClick={() => setRadius(km * 1000)}>{km} km</button>)}</div>
        <button className="button-primary" onClick={discoverNearby} disabled={busy || !mapKey || !control}>{busy ? deepProgress.total && scanProgress.done === scanProgress.total ? `Verdiept ${deepProgress.done}/${deepProgress.total} kandidaten` : scanProgress.total ? `Scant ${scanProgress.done}/${scanProgress.total} websites` : "Zoekt bedrijven..." : "Vind en beoordeel lokale bedrijven"}</button>
        <small>{firecrawlReady ? `${deepProgress.requests} Firecrawl-verzoeken in deze zoekronde. De servermeter hierboven is leidend voor de maandlimiet.` : "Firecrawl staat uit totdat de sleutel op de server is ingesteld."}</small>
        {message && <p className="form-error">{message}</p>}
      </div>
    </div>
    {candidates.length > 0 && <section className="lead-saved-candidates"><p className="section-tag">Automatisch beoordeeld · handmatige beslissingen</p><h3>Shortlist uit geplande zoekrondes</h3><div className="lead-saved-grid">{candidates.map((candidate) => <article key={candidate.id}><small>{candidate.status} · {new Date(candidate.last_seen_at).toLocaleDateString("nl-NL")}</small><h4>{candidate.site_title}</h4><a href={candidate.source_site_url} target="_blank" rel="noreferrer">Bekijk oorspronkelijke website</a><p>Kans {candidate.opportunity_score}/100 · techniek {candidate.technical_score}/100 · {candidate.size_class === "likely-large" ? "waarschijnlijk groot" : candidate.size_class === "small-medium" ? "MKB-indicatie" : "grootte onbekend"}</p><small>{candidate.audit.priorities?.join(", ") || "Geen duidelijke technische prioriteit"}</small><SavedCandidateEvidence candidate={candidate} /><div className="lead-candidate-actions"><button type="button" className="audit-button" onClick={() => { void setCandidateStatus(candidate, "shortlisted"); }}>Zet op shortlist</button><button type="button" className="audit-button" onClick={() => { void setCandidateStatus(candidate, "dismissed"); }}>Sla over</button>{previewReady && <button type="button" className="audit-button" onClick={() => openPreviewDraft({ id: candidate.id, displayName: { text: candidate.site_title }, websiteUri: candidate.source_site_url })}>Bouw concept</button>}</div></article>)}</div></section>}
    {places.length > 0 && <><div className="lead-summary"><div><small>Gevonden</small><strong>{places.length}</strong></div><div><small>Verkoopkansen</small><strong>{opportunities}</strong></div><div><small>Zonder website</small><strong>{places.filter((place) => !place.websiteUri).length}</strong></div><div><small>Gescoord</small><strong>{Object.keys(scores).length}</strong></div></div>
      <div className="lead-filters">{([['opportunity', 'Beste kansen'], ['all', 'Alles'], ['no-site', 'Geen website'], ['unscanned', 'Niet gescand'], ['large', 'Waarschijnlijk groot']] as Array<[Filter, string]>).map(([value, label]) => <button key={value} className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div>
      <div className="lead-table"><div className="lead-table-head"><span>Bedrijf</span><span>Website en scan</span><span>Adres</span><span>Belroute</span></div>{ranked.map((place) => {
        const audit = scores[place.id];
        const qualification = qualificationFor(place);
        const deep = deepAudits[place.id];
        return <article key={place.id}><span><b>{place.displayName?.text}</b><small>{place.primaryType?.replaceAll("_", " ")}</small></span><span>{place.websiteUri ? <><a href={place.websiteUri} target="_blank" rel="noreferrer">Website openen</a><b className={qualification.opportunityScore >= 40 ? "status-opportunity" : ""}>{audit ? `Kans ${qualification.opportunityScore}/100 · techniek ${audit.score}/100` : qualification.size === "likely-large" ? "Ketenindicatie: scan overgeslagen" : auditErrors[place.id] ? "Scan mislukt" : "Scan loopt of is niet voltooid"}</b>{auditErrors[place.id] && <small>{auditErrors[place.id]}</small>}{audit && <><small>{audit.priorities.join(", ") || "Geen directe technische aandachtspunten"}</small><small title={audit.pagesChecked.map((page) => `${page.title}: ${page.url}`).join("\n")}>{audit.pagesChecked.length} pagina('s) gecontroleerd, inclusief binnenpagina&apos;s</small></>}{deep && <details className="lead-deep-audit"><summary>Gerenderde site en screenshots ({deep.requestsAttempted} verzoeken)</summary><div className="lead-deep-content"><small>{deep.findings.length ? deep.findings.join(" ") : "Geen extra tekstsignalen gevonden. Dit is geen visuele designscore."}</small>{deep.warnings.map((warning) => <small key={warning}>{warning}</small>)}<div className="lead-screenshots">{deep.desktopScreenshot && <a href={deep.desktopScreenshot} target="_blank" rel="noreferrer"><img src={deep.desktopScreenshot} alt={`Desktop-opname van ${deep.website}`} /><small>Desktop</small></a>}{deep.mobileScreenshot && <a href={deep.mobileScreenshot} target="_blank" rel="noreferrer"><img src={deep.mobileScreenshot} alt={`Mobiele opname van ${deep.website}`} /><small>Mobiel</small></a>}</div><small>Screenshots verlopen bij Firecrawl na 24 uur. Controleer visuele kwaliteit zelf voordat je contact opneemt.</small></div></details>}{deepErrors[place.id] && <small>Verdieping mislukt: {deepErrors[place.id]}</small>}</> : <b className="status-opportunity">Geen website vermeld · score voorlopig</b>}</span><span>{place.formattedAddress}</span><span><b className={qualification.size === "likely-large" ? "status-hold" : ""}>{qualification.size === "small-medium" ? "MKB-indicatie" : qualification.size === "likely-large" ? "Waarschijnlijk groter bedrijf" : "Grootte onbekend"}</b><small title={qualification.scoreReason}>{qualification.sizeReason}</small><small>Contact pas na handmatige controle van rechtsvorm en toestemming.</small>{previewReady && qualification.size !== "likely-large" && <button type="button" className="audit-button" onClick={() => openPreviewDraft(place)}>Concept voorbereiden</button>}</span></article>;
      })}</div></>}
    {previewReady && draftPlace && <section id="preview-draft" className="lead-preview-panel">
      <p className="section-tag">Private conceptgenerator</p>
      <h3>Controleer de gegevens voor het concept.</h3>
      <p>De automatische score helpt bij kiezen. Neem bedrijfsgegevens van de eigen website of bevestig ze met het bedrijf; Google Places-data is geen blijvende bron voor de preview. Dit formulier verstuurt geen leadbericht.</p>
      {draftPlace.websiteUri && <a href={draftPlace.websiteUri} target="_blank" rel="noreferrer">Open oorspronkelijke website</a>}
      <form onSubmit={(event) => { event.preventDefault(); void createPreview(); }}>
        <label className="lead-preview-template">Ontwerprichting<select value={draft.template} onChange={(event) => { previewActionKey.current = null; setDraft((current) => ({ ...current, template: event.target.value as PreviewDraft["template"] })); }}><option value="service-editorial">Lokale dienstverlener · redactioneel</option><option value="garden-atelier">Tuin en landschap · Hof & Hei-richting</option><option value="harbor-light">Hospitality en evenementen · Havenlicht</option></select></label>
        <div className="lead-preview-fields">
          {([['name', 'Geverifieerde bedrijfsnaam'], ['city', 'Plaats'], ['service', 'Dienst / branche'], ['tagline', 'Voorlopige kop'], ['email', 'Openbaar e-mailadres'], ['phone', 'Openbaar telefoonnummer']] as Array<[Exclude<keyof PreviewDraft, "template">, string]>).map(([key, label]) => <label key={key}>{label}<input value={draft[key]} onChange={(event) => { previewActionKey.current = null; setDraft((current) => ({ ...current, [key]: event.target.value })); }} required={key === "name" || key === "service"} /></label>)}
        </div>
        <label className="lead-preview-description">Korte, feitelijk gecontroleerde omschrijving<textarea value={draft.description} onChange={(event) => { previewActionKey.current = null; setDraft((current) => ({ ...current, description: event.target.value })); }} maxLength={600} rows={3} /></label>
        <label className="lead-preview-confirm"><input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} required /> Ik heb naam, dienst en contactgegevens op de oorspronkelijke bron gecontroleerd.</label>
        <button className="button-primary" type="submit" disabled={previewBusy || !verified || (!draft.email && !draft.phone)}>{previewBusy ? "Concept wordt gemaakt..." : "Maak private preview"}</button>
      </form>
      {previewError && <p className="form-error">{previewError}</p>}
      {previewUrl && <p className="lead-preview-result"><a href={previewUrl} target="_blank" rel="noreferrer">Open het concept in een nieuw tabblad</a><small>Niet openbaar geadverteerd. Controleer desktop en mobiel voordat je deze link deelt.</small></p>}
    </section>}
    <p className="form-note">De beoordeling loopt automatisch over maximaal vier pagina&apos;s. Bedrijfsgrootte is alleen een indicatie, geen vastgesteld personeelsaantal. Deze lijst geeft geen beltoestemming; outreach gebeurt uitsluitend handmatig.</p>
  </>;
}
