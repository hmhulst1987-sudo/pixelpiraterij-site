import { Footer, PageHero, SiteFrame, Topbar } from "@/components/site-shell";
import { ShortlistBoard } from "./shortlist-board";

export const dynamic = "force-dynamic";

export default function ShortlistPage() {
  return <SiteFrame><Topbar /><PageHero kicker="Private sales studio" title={<>Jouw shortlist.<br />Alleen de keuzes die jij maakte.</>} body="Bekijk de bewaarde kandidaten en hun bronwebsites op één plek. Een kansscore is een aanwijzing, geen automatisch oordeel of toestemming voor contact." primaryCta={{ href: "#shortlist", label: "Bekijk shortlist" }} secondaryCta={{ href: "/studio/leads", label: "Terug naar zoekrondes" }} /><nav className="lead-studio-nav" aria-label="Leadstudio"><a className="lead-site-check-link" href="/studio/leads">Zoekrondes</a><a className="lead-site-check-link" href="/studio/leads/outreach">Voorbereide berichten</a></nav><section id="shortlist" className="section-block"><ShortlistBoard /></section><Footer /></SiteFrame>;
}
