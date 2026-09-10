"use client";

import { useEffect, useRef, useState } from "react";

type Coordinates = { lat: number; lng: number };
type Place = { id: string; displayName?: { text: string }; formattedAddress?: string; websiteUri?: string; primaryType?: string; location?: { latitude: number; longitude: number } };
type Score = { score: number; priorities: string[] };
type Filter = "all" | "no-site" | "opportunity" | "unscanned";
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

export function LeadsStudio({ mapKey }: { mapKey: string }) {
  const mapElement = useRef<HTMLDivElement>(null);
  const map = useRef<MapLike | null>(null);
  const pin = useRef<MarkerLike | null>(null);
  const circle = useRef<CircleLike | null>(null);
  const resultMarkers = useRef<MarkerLike[]>([]);
  const [center, setCenter] = useState(DEFAULT_CENTER);
  const [radius, setRadius] = useState(20_000);
  const [places, setPlaces] = useState<Place[]>([]);
  const [scores, setScores] = useState<Record<string, Score>>({});
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const [scanProgress, setScanProgress] = useState({ done: 0, total: 0 });
  const [filter, setFilter] = useState<Filter>("all");
  const [usage, setUsage] = useState(0);

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
      const response = await fetch("/api/leads/audit", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ website: place.websiteUri }) });
      const json = await response.json();
      if (response.ok) setScores((current) => ({ ...current, [place.id]: json.audit }));
    } finally {
      setScanProgress((current) => ({ ...current, done: current.done + 1 }));
    }
  }

  async function auditAll(found: Place[]) {
    const websites = found.filter((place) => place.websiteUri);
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
    setBusy(true); setMessage(""); setScores({}); setPlaces([]); setScanProgress({ done: 0, total: 0 });
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

  const ranked = [...places].filter((place) => {
    if (filter === "no-site") return !place.websiteUri;
    if (filter === "opportunity") return !place.websiteUri || (scores[place.id]?.score ?? 101) < 60;
    if (filter === "unscanned") return Boolean(place.websiteUri) && !scores[place.id];
    return true;
  }).sort((a, b) => {
    if (!a.websiteUri && b.websiteUri) return -1;
    if (a.websiteUri && !b.websiteUri) return 1;
    return (scores[a.id]?.score ?? 101) - (scores[b.id]?.score ?? 101);
  });
  const opportunities = places.filter((place) => !place.websiteUri || (scores[place.id]?.score ?? 101) < 60).length;

  return <>
    <div className="lead-map-layout">
      <div className="lead-map-panel">
        {mapKey ? <div ref={mapElement} className="lead-map" aria-label="Google Maps zoekgebied" /> : <div className="lead-map lead-map-missing">Stel `GOOGLE_MAPS_BROWSER_KEY` in om de kaart te laden.</div>}
        <div className="lead-map-caption"><span>Klik op de kaart om het middelpunt te verplaatsen.</span><b>{radius / 1000} km zoekcirkel</b></div>
      </div>
      <div className="lead-controls">
        <form action={findLocation} className="lead-form studio-location-search"><label>Plaats<input name="location" placeholder="bijvoorbeeld Breda" /></label><button className="audit-button" type="submit" disabled={!mapKey}>Zet op kaart</button></form>
        <div className="lead-radius"><span>Zoekstraal</span>{[5, 10, 20, 25].map((km) => <button key={km} className={radius === km * 1000 ? "is-active" : ""} onClick={() => setRadius(km * 1000)}>{km} km</button>)}</div>
        <button className="button-primary" onClick={discoverNearby} disabled={busy || !mapKey}>{busy ? scanProgress.total ? `Scant ${scanProgress.done}/${scanProgress.total} websites` : "Zoekt bedrijven..." : "Vind en beoordeel bedrijven"}</button>
        <div className="lead-usage"><div><small>Places-verzoeken deze maand via deze tool</small><strong>{usage}<span> / 1.000 gratis</span></strong></div><progress max="1000" value={Math.min(usage, 1000)} /><small>Toolteller in deze browser. Google Cloud Monitoring blijft leidend voor het volledige project.</small></div>
        {message && <p className="form-error">{message}</p>}
      </div>
    </div>
    {places.length > 0 && <><div className="lead-summary"><div><small>Gevonden</small><strong>{places.length}</strong></div><div><small>Verkoopkansen</small><strong>{opportunities}</strong></div><div><small>Zonder website</small><strong>{places.filter((place) => !place.websiteUri).length}</strong></div><div><small>Gescoord</small><strong>{Object.keys(scores).length}</strong></div></div>
      <div className="lead-filters">{([['all', 'Alles'], ['opportunity', 'Beste kansen'], ['no-site', 'Geen website'], ['unscanned', 'Niet gescand']] as Array<[Filter, string]>).map(([value, label]) => <button key={value} className={filter === value ? "is-active" : ""} onClick={() => setFilter(value)}>{label}</button>)}</div>
      <div className="lead-table"><div className="lead-table-head"><span>Bedrijf</span><span>Website en scan</span><span>Adres</span><span>Belroute</span></div>{ranked.map((place) => <article key={place.id}><span><b>{place.displayName?.text}</b><small>{place.primaryType?.replaceAll("_", " ")}</small></span><span>{place.websiteUri ? <><a href={place.websiteUri} target="_blank" rel="noreferrer">Website openen</a><b className={scores[place.id]?.score < 60 ? "status-opportunity" : ""}>{scores[place.id] ? `Techniekscore ${scores[place.id].score}/100` : "Scan niet voltooid"}</b>{scores[place.id] && <small>{scores[place.id].priorities.join(", ") || "Geen directe technische aandachtspunten"}</small>}</> : <b className="status-opportunity">Geen website vermeld</b>}</span><span>{place.formattedAddress}</span><span><b className="status-hold">Eerst rechtsvorm controleren</b><small>Eenmanszaak/VOF alleen bellen met aantoonbare opt-in.</small></span></article>)}</div></>}
    <p className="form-note">De lijst toont verkoopkansen, geen beltoestemming. Bewaar duurzaam alleen het Place ID en je eigen audits/notities; controleer rechtsvorm en bestaande klantrelatie vóór telefonisch contact.</p>
  </>;
}
