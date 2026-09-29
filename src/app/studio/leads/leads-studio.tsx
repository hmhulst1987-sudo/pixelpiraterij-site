"use client";

import { useEffect, useRef, useState } from "react";
import { qualifyLead, type LeadQualification } from "@/lib/lead-qualification";

type Coordinates = { lat: number; lng: number };
type Place = { id: string; displayName?: { text: string }; formattedAddress?: string; websiteUri?: string; primaryType?: string; location?: { latitude: number; longitude: number } };
type Score = { score: number; priorities: string[]; qualification: LeadQualification; pagesChecked: { url: string; title: string; status: number }[] };
type Filter = "all" | "no-site" | "opportunity" | "unscanned" | "large";
type PreviewDraft = { name: string; city: string; service: string; tagline: string; description: string; email: string; phone: string };
type MapLike = { setCenter(position: Coordinates): void; setZoom(zoom: number): void; fitBounds(bounds: unknown): void; addListener(event: string, callback: (event: { latLng?: { lat(): number; lng(): number } }) => void): void };
type MarkerLike = { setMap(map: MapLike | null): void };
type CircleLike = { setMap(map: MapLike | null): void };

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
const COUNTER_KEY = "pixelpiraterij-places-usage";
const currentMonth = () => new Date().toISOString().slice(0, 7);

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

export function LeadsStudio({ mapKey, previewReady }: { mapKey: string; previewReady: boolean }) {
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
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanProgress, setScanProgress] = useState({ done: 0, total: 0 });
  const [filter, setFilter] = useState<Filter>("opportunity");
  const [usage, setUsage] = useState(0);
  const [draftPlace, setDraftPlace] = useState<Place | null>(null);
  const [draft, setDraft] = useState<PreviewDraft>({ name: "", city: "", service: "", tagline: "", description: "", email: "", phone: "" });
  const [verified, setVerified] = useState(false);
  const [previewBusy, setPreviewBusy] = useState(false);
  const [previewUrl, setPreviewUrl] = useState("");
  const [previewError, setPreviewError] = useState("");

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(COUNTER_KEY) || "null") as { month?: string; count?: number } | null;
    setUsage(saved?.month === currentMonth() ? saved.count || 0 : 0);
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

  function addUsage(count: number) {
    setUsage((previous) => {
      const next = previous + count;
      localStorage.setItem(COUNTER_KEY, JSON.stringify({ month: currentMonth(), count: next }));
      return next;
    });
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
    if (!place.websiteUri) return;
    try {
      const response = await fetch("/api/leads/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ website: place.websiteUri, businessName: place.displayName?.text }) });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Scan niet gelukt.");
      setScores((current) => ({ ...current, [place.id]: json.audit }));
    } catch (error) {
      setAuditErrors((current) => ({ ...current, [place.id]: error instanceof Error ? error.message : "Scan niet gelukt." }));
    } finally {
      setScanProgress((current) => ({ ...current, done: current.done + 1 }));
    }
  }

  async function auditAll(found: Place[]) {
    const websites = found.filter((place) => place.websiteUri && qualifyLead(null, "", place.displayName?.text).size !== "likely-large");
    setScanProgress({ done: 0, total: websites.length });
    let cursor = 0;
    async function worker() {
      while (cursor < websites.length) {
        const place = websites[cursor++];
        await auditPlace(place);
      }
    }
    await Promise.all(Array.from({ length: Math.min(3, websites.length) }, worker));
  }

  async function discoverNearby() {
    setBusy(true); setMessage(""); setScores({}); setAuditErrors({}); setPlaces([]); setScanProgress({ done: 0, total: 0 });
    try {
      const response = await fetch("/api/leads/nearby", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ latitude: center.lat, longitude: center.lng, radius }) });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error || "Zoeken mislukt.");
      const found = (json.places || []) as Place[];
      setPlaces(found);
      addUsage(Number(json.requestCount) || 0);
      if (json.failures) setMessage(`${json.failures} van de 5 zoekgroepen gaf geen resultaat; de overige resultaten zijn wel verwerkt.`);
      await auditAll(found);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Zoeken mislukt.");
    } finally { setBusy(false); }
  }

  function qualificationFor(place: Place) {
    return scores[place.id]?.qualification ?? qualifyLead(null, "", place.displayName?.text);
  }

  function openPreviewDraft(place: Place) {
    setDraftPlace(place);
    setDraft({ name: place.displayName?.text || "", city: "", service: "", tagline: "", description: "", email: "", phone: "" });
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
      const response = await fetch("/api/leads/preview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...draft, verified }),
      });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "De preview kon niet worden gemaakt.");
      setPreviewUrl(result.url);
    } catch (error) {
      setPreviewError(error instanceof Error ? error.message : "De preview kon niet worden gemaakt.");
    } finally {
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

  return <>
    <div className="lead-map-layout">
      <div className="lead-map-panel">
        {mapKey ? <div ref={mapElement} className="lead-map" aria-label="Google Maps zoekgebied" /> : <div className="lead-map lead-map-missing">Stel `GOOGLE_MAPS_BROWSER_KEY` in om de kaart te laden.</div>}
        <div className="lead-map-caption"><span>Klik op de kaart om het middelpunt te verplaatsen.</span><b>{radius / 1000} km zoekcirkel</b></div>
      </div>
      <div className="lead-controls">
        <form action={findLocation} className="lead-form studio-location-search"><label>Plaats<input name="location" placeholder="bijvoorbeeld Breda" /></label><button className="audit-button" type="submit" disabled={!mapKey}>Zet op kaart</button></form>
        <div className="lead-radius"><span>Zoekstraal</span>{[5, 10, 20, 25].map((km) => <button key={km} className={radius === km * 1000 ? "is-active" : ""} onClick={() => setRadius(km * 1000)}>{km} km</button>)}</div>
        <button className="button-primary" onClick={discoverNearby} disabled={busy || !mapKey}>{busy ? scanProgress.total ? `Scant ${scanProgress.done}/${scanProgress.total} websites` : "Zoekt bedrijven..." : "Vind en beoordeel lokale bedrijven"}</button>
        <div className="lead-usage"><div><small>Places Enterprise-verzoeken via deze browser deze maand</small><strong>{usage}<span> / 1.000 gratis verzoeken</span></strong></div><progress max="1000" value={Math.min(usage, 1000)} /><small>Elke zoekactie doet tot vijf verzoeken. Dit is geen harde kostengrens; Google Cloud Billing is leidend.</small></div>
        {message && <p className="form-error">{message}</p>}
      </div>
    </div>
    {places.length > 0 && <><div className="lead-summary"><div><small>Gevonden</small><strong>{places.length}</strong></div><div><small>Verkoopkansen</small><strong>{opportunities}</strong></div><div><small>Zonder website</small><strong>{places.filter((place) => !place.websiteUri).length}</strong></div><div><small>Gescoord</small><strong>{Object.keys(scores).length}</strong></div></div>
      <div className="lead-filters">{([['opportunity', 'Beste kansen'], ['all', 'Alles'], ['no-site', 'Geen website'], ['unscanned', 'Niet gescand'], ['large', 'Waarschijnlijk groot']] as Array<[Filter, string]>).map(([value, label]) => <button key={value} className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div>
      <div className="lead-table"><div className="lead-table-head"><span>Bedrijf</span><span>Website en scan</span><span>Adres</span><span>Belroute</span></div>{ranked.map((place) => {
        const audit = scores[place.id];
        const qualification = qualificationFor(place);
        return <article key={place.id}><span><b>{place.displayName?.text}</b><small>{place.primaryType?.replaceAll("_", " ")}</small></span><span>{place.websiteUri ? <><a href={place.websiteUri} target="_blank" rel="noreferrer">Website openen</a><b className={qualification.opportunityScore >= 40 ? "status-opportunity" : ""}>{audit ? `Kans ${qualification.opportunityScore}/100 · techniek ${audit.score}/100` : qualification.size === "likely-large" ? "Ketenindicatie: scan overgeslagen" : auditErrors[place.id] ? "Scan mislukt" : "Scan loopt of is niet voltooid"}</b>{auditErrors[place.id] && <small>{auditErrors[place.id]}</small>}{audit && <><small>{audit.priorities.join(", ") || "Geen directe technische aandachtspunten"}</small><small title={audit.pagesChecked.map((page) => `${page.title}: ${page.url}`).join("\n")}>{audit.pagesChecked.length} pagina('s) gecontroleerd, inclusief binnenpagina&apos;s</small></>}</> : <b className="status-opportunity">Geen website vermeld · score voorlopig</b>}</span><span>{place.formattedAddress}</span><span><b className={qualification.size === "likely-large" ? "status-hold" : ""}>{qualification.size === "small-medium" ? "MKB-indicatie" : qualification.size === "likely-large" ? "Waarschijnlijk groter bedrijf" : "Grootte onbekend"}</b><small title={qualification.scoreReason}>{qualification.sizeReason}</small><small>Contact pas na handmatige controle van rechtsvorm en toestemming.</small>{previewReady && qualification.size !== "likely-large" && <button type="button" className="audit-button" onClick={() => openPreviewDraft(place)}>Concept voorbereiden</button>}</span></article>;
      })}</div></>}
    {previewReady && draftPlace && <section id="preview-draft" className="lead-preview-panel">
      <p className="section-tag">Private conceptgenerator</p>
      <h3>Controleer de gegevens voor het concept.</h3>
      <p>De automatische score helpt bij kiezen. Neem bedrijfsgegevens van de eigen website of bevestig ze met het bedrijf; Google Places-data is geen blijvende bron voor de preview. Dit formulier verstuurt geen leadbericht.</p>
      {draftPlace.websiteUri && <a href={draftPlace.websiteUri} target="_blank" rel="noreferrer">Open oorspronkelijke website</a>}
      <form onSubmit={(event) => { event.preventDefault(); void createPreview(); }}>
        <div className="lead-preview-fields">
          {([['name', 'Geverifieerde bedrijfsnaam'], ['city', 'Plaats'], ['service', 'Dienst / branche'], ['tagline', 'Voorlopige kop'], ['email', 'Openbaar e-mailadres'], ['phone', 'Openbaar telefoonnummer']] as Array<[keyof PreviewDraft, string]>).map(([key, label]) => <label key={key}>{label}<input value={draft[key]} onChange={(event) => setDraft((current) => ({ ...current, [key]: event.target.value }))} required={key === "name" || key === "service"} /></label>)}
        </div>
        <label className="lead-preview-description">Korte, feitelijk gecontroleerde omschrijving<textarea value={draft.description} onChange={(event) => setDraft((current) => ({ ...current, description: event.target.value }))} maxLength={600} rows={3} /></label>
        <label className="lead-preview-confirm"><input type="checkbox" checked={verified} onChange={(event) => setVerified(event.target.checked)} required /> Ik heb naam, dienst en contactgegevens op de oorspronkelijke bron gecontroleerd.</label>
        <button className="button-primary" type="submit" disabled={previewBusy || !verified || (!draft.email && !draft.phone)}>{previewBusy ? "Concept wordt gemaakt..." : "Maak private preview"}</button>
      </form>
      {previewError && <p className="form-error">{previewError}</p>}
      {previewUrl && <p className="lead-preview-result"><a href={previewUrl} target="_blank" rel="noreferrer">Open het concept in een nieuw tabblad</a><small>Niet openbaar geadverteerd. Controleer desktop en mobiel voordat je deze link deelt.</small></p>}
    </section>}
    <p className="form-note">De beoordeling loopt automatisch over maximaal vier pagina&apos;s. Bedrijfsgrootte is alleen een indicatie, geen vastgesteld personeelsaantal. Deze lijst geeft geen beltoestemming; outreach gebeurt uitsluitend handmatig.</p>
  </>;
}
