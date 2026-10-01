import { Footer, PageHero, SiteFrame, Topbar } from "@/components/site-shell";
import { LeadsStudio } from "./leads-studio";

export const dynamic = "force-dynamic";

export default function LeadsPage() { return <SiteFrame><Topbar /><PageHero kicker="Private sales studio" title={<>Zet je route uit.<br />Bewijs de kans.<br />Bel correct.</>} body="Kies een plaats of prikpunt, bepaal je straal en laat de studio lokale bedrijven automatisch vinden, technisch beoordelen en rangschikken." primaryCta={{ href: "#discovery", label: "Start selectie" }} secondaryCta={{ href: "/gratis-websitecheck", label: "Bekijk publieke scan" }} /><nav className="lead-studio-nav" aria-label="Leadstudio"><a className="lead-site-check-link" href="/studio/leads/shortlist">Open mijn shortlist</a><a className="lead-site-check-link" href="/studio/leads/outreach">Voorbereide berichten</a></nav><section id="discovery" className="section-block"><LeadsStudio mapKey={process.env.GOOGLE_MAPS_BROWSER_KEY || ""} previewReady={Boolean(process.env.PREVIEW_SERVICE_URL && process.env.PREVIEW_SERVICE_TOKEN)} firecrawlReady={Boolean(process.env.FIRECRAWL_API_KEY)} /></section><Footer /></SiteFrame>; }
