import Link from "next/link";
import { Footer, SiteFrame, Topbar } from "@/components/site-shell";

export default function CheckoutSuccessPage() {
  return <SiteFrame><Topbar /><section className="section-block"><p className="section-tag">Betaling ontvangen</p><h1 className="section-title">Je PixelPiraterij-route is gestart.</h1><p className="section-body">Stripe stuurt de betaalbevestiging. Wij nemen via het opgegeven e-mailadres contact op voor intake, inhoud en planning.</p><Link href="/contact" className="btn-primary">Naar contact</Link></section><Footer /></SiteFrame>;
}
