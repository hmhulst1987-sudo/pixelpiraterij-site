import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { isPixelProduct, pixelProducts } from "@/lib/stripe-products";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body: unknown = await request.json().catch(() => null);
  const productId = typeof body === "object" && body !== null && "product" in body ? body.product : null;
  if (!isPixelProduct(productId)) {
    return NextResponse.json({ error: "Onbekend PixelPiraterij-pakket." }, { status: 400 });
  }

  const key = process.env.PIXELPIRATERIJ_STRIPE_SECRET_KEY;
  const product = pixelProducts[productId];
  const recurringPrice = process.env[product.recurringEnv];
  const setupPrice = "setupEnv" in product ? process.env[product.setupEnv] : undefined;
  if (!key || !recurringPrice || ("setupEnv" in product && !setupPrice)) {
    return NextResponse.json({ error: "De betaalomgeving wordt nog geactiveerd." }, { status: 503 });
  }

  const reference = `PIXEL-${randomUUID().replaceAll("-", "").slice(0, 12).toUpperCase()}`;
  const origin = new URL(request.url).origin;
  const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = [{ price: recurringPrice, quantity: 1 }];
  if (setupPrice) lineItems.push({ price: setupPrice, quantity: 1 });
  const session = await new Stripe(key).checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    billing_address_collection: "required",
    tax_id_collection: { enabled: true },
    allow_promotion_codes: true,
    client_reference_id: reference,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/hosting?checkout=cancelled`,
    metadata: { umbrella: "oeuvre_de_vb", brand: "pixelpiraterij", reference, product: productId },
    subscription_data: { metadata: { umbrella: "oeuvre_de_vb", brand: "pixelpiraterij", reference, product: productId } },
  });
  return NextResponse.json({ url: session.url });
}
