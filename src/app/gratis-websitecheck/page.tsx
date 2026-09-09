import type { Metadata } from "next";
import { Footer, PageHero, SiteFrame, Topbar } from "@/components/site-shell";
import { WebsiteCheckForm } from "./website-check-form";

export const metadata: Metadata = { title: "Gratis websitecheck | PixelPiraterij", description: "Ontvang een snelle technische nulmeting van je bedrijfswebsite en zie waar vertrouwen, mobiel gebruik en conversie kunnen verbeteren." };
export default function WebsiteCheckPage() {
  return <SiteFrame><Topbar /><PageHero kicker="Gratis websitecheck" title={<>Is je website nog<br />klaar voor wat je<br />bedrijf nu is?</>} body="Geen generiek rapport, maar een compacte technische nulmeting van bereikbaarheid, mobiel fundament, vindbaarheid en conversiesignalen." primaryCta={{ href: "#scan", label: "Controleer mijn website" }} secondaryCta={{ href: "/cases", label: "Bekijk bewezen werk" }} />
    <section id="scan" className="section-block lead-layout"><div><p className="section-tag">01 / Vrijblijvende nulmeting</p><h2 className="lead-heading">Binnen een minuut zie je waar de eerste winst ligt.</h2><p className="lead-copy">De automatische controle vormt het vertrekpunt. Daarna kunnen we je, alleen met jouw toestemming, persoonlijk uitleggen welke verbeteringen zinvol zijn en wat je beter kunt laten staan.</p><div className="lead-assurances"><span>Geen automatische verkoop</span><span>Geen doorverkoop van gegevens</span><span>Toestemming altijd intrekbaar</span></div></div><WebsiteCheckForm /></section><Footer /></SiteFrame>;
}
