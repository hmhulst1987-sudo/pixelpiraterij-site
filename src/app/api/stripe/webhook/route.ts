import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createCustomer, isInAccount, registerDomain, splitAddressLine, type Registrant } from "@/lib/openprovider";
import { notifyOperator, sendMail } from "@/lib/notify";

export const runtime = "nodejs";

function nameserverList(): string[] {
  return (process.env.DOMAIN_NAMESERVERS ?? "")
    .split(",")
    .map((host) => host.trim())
    .filter(Boolean);
}

function splitFullName(full: string): { firstName: string; lastName: string } {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

function toRegistrant(details: Stripe.Checkout.Session.CustomerDetails): Registrant | null {
  const address = details.address;
  if (!details.email || !address?.line1 || !address.postal_code || !address.city || !address.country) return null;

  const { firstName, lastName } = splitFullName(details.name ?? "");
  if (!firstName || !lastName) return null;

  const parsed = splitAddressLine(address.line1);

  return {
    firstName,
    lastName,
    companyName: "",
    email: details.email,
    phone: details.phone ?? "",
    street: parsed.street || address.line1,
    houseNumber: parsed.houseNumber,
    houseNumberSuffix: [parsed.suffix, address.line2 ?? ""].filter(Boolean).join(" ").trim(),
    postalCode: address.postal_code,
    city: address.city,
    state: address.state ?? "",
    country: address.country,
  };
}

/** Finds something refundable on the invoice that paid this session. */
async function findRefundTarget(
  stripe: Stripe,
  session: Stripe.Checkout.Session,
): Promise<{ payment_intent?: string; charge?: string } | null> {
  if (typeof session.payment_intent === "string") return { payment_intent: session.payment_intent };

  const invoiceId = typeof session.invoice === "string" ? session.invoice : session.invoice?.id;
  if (!invoiceId) return null;

  const invoice = await stripe.invoices.retrieve(invoiceId, { expand: ["payments"] });

  for (const entry of invoice.payments?.data ?? []) {
    const payment = entry.payment;
    if (typeof payment?.payment_intent === "string") return { payment_intent: payment.payment_intent };
    if (payment?.payment_intent && "id" in payment.payment_intent) return { payment_intent: payment.payment_intent.id };
    if (typeof payment?.charge === "string") return { charge: payment.charge };
    if (payment?.charge && "id" in payment.charge) return { charge: payment.charge.id };
  }

  return null;
}

async function unwind(stripe: Stripe, session: Stripe.Checkout.Session, domain: string, reason: string) {
  const reference = session.metadata?.reference ?? session.id;
  const lines: string[] = [`Registratie van ${domain} is mislukt.`, `Reden: ${reason}`, `Referentie: ${reference}`];

  const subscriptionId = typeof session.subscription === "string" ? session.subscription : session.subscription?.id;
  if (subscriptionId) {
    try {
      await stripe.subscriptions.cancel(subscriptionId);
      lines.push("Het jaarabonnement is geannuleerd.");
    } catch (failure) {
      lines.push(`LET OP: abonnement ${subscriptionId} annuleren mislukte — doe dit handmatig.`);
      console.error("subscription cancel failed", failure instanceof Error ? failure.message : failure);
    }
  }

  try {
    const target = await findRefundTarget(stripe, session);
    if (target) {
      await stripe.refunds.create({ ...target, reason: "requested_by_customer" });
      lines.push("De betaling is automatisch teruggestort.");
    } else {
      lines.push("LET OP: geen betaling gevonden om terug te storten — controleer dit handmatig in Stripe.");
    }
  } catch (failure) {
    lines.push("LET OP: automatisch terugstorten mislukte — doe dit handmatig in Stripe.");
    console.error("refund failed", failure instanceof Error ? failure.message : failure);
  }

  await notifyOperator(`Domeinregistratie mislukt: ${domain}`, lines.join("\n"));

  if (session.customer_details?.email) {
    await sendMail({
      to: session.customer_details.email,
      subject: `${domain} kon niet worden geregistreerd`,
      text:
        `Het is niet gelukt om ${domain} voor je vast te leggen.\n\n` +
        `Je betaling is teruggestort en er loopt geen abonnement. ` +
        `Dit gebeurt bijvoorbeeld als de naam net voor je neus is weggekaapt.\n\n` +
        `Wil je een andere naam proberen, kijk dan op https://pixelpiraterij.nl/domeinen\n\n` +
        `Referentie: ${reference}\n\nPixelPiraterij`,
    });
  }
}

async function handleDomainOrder(stripe: Stripe, session: Stripe.Checkout.Session) {
  const domain = session.metadata?.domain ?? "";
  const labels = domain.split(".");
  const extension = labels.at(-1) ?? "";
  const name = labels.slice(0, -1).join(".");
  const reference = session.metadata?.reference ?? session.id;

  if (!name || !extension) {
    await notifyOperator("Domeinbestelling zonder domeinnaam", `Sessie ${session.id} had geen bruikbare domeinnaam.`);
    return;
  }

  // A retried webhook must not register the same name twice.
  try {
    if (await isInAccount(name, extension)) {
      console.info(`${domain} staat al in het account, registratie overgeslagen`);
      return;
    }
  } catch (failure) {
    console.error("ownership check failed", failure instanceof Error ? failure.message : failure);
  }

  const registrant = session.customer_details ? toRegistrant(session.customer_details) : null;
  if (!registrant) {
    await unwind(stripe, session, domain, "De klantgegevens uit Stripe waren niet compleet genoeg voor de registry.");
    return;
  }

  try {
    const handle = await createCustomer(registrant);
    await registerDomain({ name, extension, handle, years: 1, nameservers: nameserverList() });

    await notifyOperator(
      `Domein geregistreerd: ${domain}`,
      [
        `${domain} is geregistreerd op naam van ${registrant.firstName} ${registrant.lastName}.`,
        `Handle: ${handle}`,
        `E-mail: ${registrant.email}`,
        `Referentie: ${reference}`,
        nameserverList().length ? `Nameservers: ${nameserverList().join(", ")}` : "Nameservers: standaard Openprovider",
      ].join("\n"),
    );

    await sendMail({
      to: registrant.email,
      subject: `${domain} staat op jouw naam`,
      text:
        `${domain} is geregistreerd en staat op jouw gegevens.\n\n` +
        `Het domein wordt elk jaar automatisch verlengd zolang je abonnement loopt. ` +
        `Wil je het ergens anders onderbrengen, dan krijg je de verhuiscode zonder gedoe.\n\n` +
        `Referentie: ${reference}\n\nPixelPiraterij`,
    });
  } catch (failure) {
    const reason = failure instanceof Error ? failure.message : String(failure);
    console.error("domain registration failed", reason);
    await unwind(stripe, session, domain, reason);
  }
}

export async function POST(request: Request) {
  const key = process.env.PIXELPIRATERIJ_STRIPE_SECRET_KEY;
  const secret = process.env.PIXELPIRATERIJ_STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");

  if (!key || !secret) return NextResponse.json({ error: "Webhook niet geconfigureerd." }, { status: 503 });
  if (!signature) return NextResponse.json({ error: "Stripe-handtekening ontbreekt." }, { status: 400 });

  const stripe = new Stripe(key);
  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(await request.text(), signature, secret);
  } catch {
    return NextResponse.json({ error: "Ongeldige Stripe-handtekening." }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    if (session.metadata?.kind === "domain") {
      // Failures are handled inside; the webhook itself must still answer 200,
      // otherwise Stripe retries and we risk a second registration.
      await handleDomainOrder(stripe, session).catch((failure) => {
        console.error("domain order handling crashed", failure instanceof Error ? failure.message : failure);
      });
    } else {
      console.info("PixelPiraterij checkout voltooid", session.metadata?.reference, session.metadata?.product);
    }
  }

  return NextResponse.json({ received: true });
}
