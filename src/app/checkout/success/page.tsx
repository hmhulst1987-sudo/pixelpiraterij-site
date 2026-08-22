import Link from "next/link";
import Stripe from "stripe";
import { Footer, SiteFrame, Topbar } from "@/components/site-shell";

export const dynamic = "force-dynamic";

async function domainFromSession(sessionId: string): Promise<string | null> {
  const key = process.env.PIXELPIRATERIJ_STRIPE_SECRET_KEY;
  if (!key || !sessionId.startsWith("cs_")) return null;

  try {
    const session = await new Stripe(key).checkout.sessions.retrieve(sessionId);
    return session.metadata?.kind === "domain" ? (session.metadata.domain ?? null) : null;
  } catch {
    return null;
  }
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const params = await searchParams;
  const domain = params.session_id ? await domainFromSession(params.session_id) : null;

  return (
    <SiteFrame>
      <Topbar />
      <section className="section-block">
        <p className="section-tag">Betaling ontvangen</p>

        {domain ? (
          <>
            <h1 className="section-title">{domain} wordt nu op jouw naam gezet.</h1>
            <p className="section-body">
              De registratie loopt automatisch en duurt meestal een paar minuten. Je krijgt een mail zodra hij
              rond is. Mocht het onverhoopt niet lukken, dan storten we je betaling meteen terug en hoor je dat
              ook per mail.
            </p>
            <div className="hero-actions">
              <Link href="/contact" className="btn-primary">
                Stuur een bericht
              </Link>
              <Link href="/templates" className="btn-secondary">
                Bekijk de template-route
              </Link>
            </div>
          </>
        ) : (
          <>
            <h1 className="section-title">Je PixelPiraterij-route is gestart.</h1>
            <p className="section-body">
              Stripe stuurt de betaalbevestiging. Wij nemen via het opgegeven e-mailadres contact op voor intake,
              inhoud en planning.
            </p>
            <Link href="/contact" className="btn-primary">
              Naar contact
            </Link>
          </>
        )}
      </section>
      <Footer />
    </SiteFrame>
  );
}
