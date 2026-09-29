import { Footer, PageHero, SiteFrame, Topbar } from "@/components/site-shell";
import { OutreachDesk } from "./outreach-desk";

export const dynamic = "force-dynamic";

export default function OutreachPage() {
  return <SiteFrame><Topbar /><PageHero kicker="Private sales studio" title={<>Eerst controleren.<br />Dan pas contact.</>} body="Concepten zijn nooit automatisch verzonden. Leg per ontvanger de contactgrond vast, keur de exacte tekst goed en verstuur afzonderlijk." primaryCta={{ href: "#outreach", label: "Bekijk concepten" }} secondaryCta={{ href: "/studio/leads", label: "Terug naar leads" }} /><section id="outreach" className="section-block"><OutreachDesk /></section><Footer /></SiteFrame>;
}
