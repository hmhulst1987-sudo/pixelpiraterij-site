import { Footer, SiteFrame, Topbar } from "@/components/site-shell";
import { LeadLoginForm } from "./lead-login-form";

export const metadata = { title: "Aanmelden | PixelPiraterij Sales Studio", robots: { index: false, follow: false } };

export default function LeadLoginPage() {
  return <SiteFrame><Topbar /><section className="section-block lead-login-section"><div className="lead-layout"><div><p className="eyebrow">Afgeschermd beheer</p><h1 className="lead-heading">De studio blijft privé.</h1><p className="lead-copy">Meld je aan met de aparte Sales Studio-gegevens. Je Coolify-wachtwoord is hiervoor niet bedoeld.</p></div><LeadLoginForm /></div></section><Footer /></SiteFrame>;
}
