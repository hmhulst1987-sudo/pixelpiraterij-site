import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { checkAvailability, isOpenproviderConfigured } from "@/lib/openprovider";
import { getExtensionPrice, offeredExtensions } from "@/lib/domain-pricing";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function parseDomain(input: string): { name: string; extension: string } | null {
  const normalized = input.trim().toLowerCase().replace(/[^a-z0-9.-]/g, "");
  const labels = normalized.split(".").filter(Boolean);
  if (labels.length < 2) return null;

  const extension = labels.at(-1) ?? "";
  const name = labels.slice(0, -1).join(".");

  if (!(offeredExtensions as readonly string[]).includes(extension)) return null;
  if (name.length < 2 || name.length > 63 || name.startsWith("-") || name.endsWith("-")) return null;

  return { name, extension };
}

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const raw = typeof body === "object" && body !== null && "domain" in body ? String(body.domain ?? "") : "";
  const parsed = parseDomain(raw);

  if (!parsed) {
    return NextResponse.json({ error: "Deze domeinnaam kan ik niet bestellen." }, { status: 400 });
  }

  const key = process.env.PIXELPIRATERIJ_STRIPE_SECRET_KEY;
  if (!key || !isOpenproviderConfigured()) {
    return NextResponse.json({ error: "Bestellen wordt nog geactiveerd." }, { status: 503 });
  }

  const domain = `${parsed.name}.${parsed.extension}`;

  // Re-check server-side: the browser result may be minutes old.
  let available: boolean;
  try {
    const [result] = await checkAvailability([parsed]);
    available = result?.status === "free";
  } catch {
    return NextResponse.json({ error: "De beschikbaarheid is even niet te controleren." }, { status: 502 });
  }

  if (!available) {
    return NextResponse.json({ error: `${domain} is inmiddels bezet.` }, { status: 409 });
  }

  const price = await getExtensionPrice(parsed.extension);
  if (!price || price.provisional) {
    return NextResponse.json({ error: "De prijs is even niet op te halen." }, { status: 502 });
  }

  const reference = `PPDOM-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
  const origin = new URL(request.url).origin;
  const metadata = { kind: "domain", domain, reference, brand: "pixelpiraterij" };

  try {
    const session = await new Stripe(key).checkout.sessions.create({
      mode: "subscription",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "eur",
            unit_amount: price.grossCents,
            tax_behavior: "inclusive",
            recurring: { interval: "year" },
            product_data: {
              name: domain,
              description: `Registratie en verlenging van ${domain}, per jaar.`,
            },
          },
        },
      ],
      billing_address_collection: "required",
      phone_number_collection: { enabled: true },
      tax_id_collection: { enabled: true },
      client_reference_id: reference,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/domeinen?bestelling=geannuleerd`,
      metadata,
      subscription_data: { metadata },
    });

    return NextResponse.json({ url: session.url });
  } catch (failure) {
    console.error("domain checkout failed", failure instanceof Error ? failure.message : failure);
    return NextResponse.json({ error: "De bestelling kon niet worden geopend." }, { status: 502 });
  }
}
