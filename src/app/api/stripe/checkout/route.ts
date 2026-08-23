import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import Stripe from "stripe";
import { isPixelProduct, pixelProducts } from "@/lib/stripe-products";
import { getAvailableModules, getRouteFamily } from "@/lib/template-route-builder";

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
  const rawConfiguration =
    typeof body === "object" && body !== null && "configuration" in body && typeof body.configuration === "object" && body.configuration !== null
      ? body.configuration
      : null;
  const requestedFamily = rawConfiguration && "familySlug" in rawConfiguration && typeof rawConfiguration.familySlug === "string"
    ? rawConfiguration.familySlug
    : null;
  const family = requestedFamily ? getRouteFamily(requestedFamily) : null;
  const selectedModuleSlugs =
    rawConfiguration && "selectedModules" in rawConfiguration && Array.isArray(rawConfiguration.selectedModules)
      ? rawConfiguration.selectedModules.filter((value): value is string => typeof value === "string")
      : [];
  const selectedModules = family
    ? getAvailableModules(family.slug).filter((module) => selectedModuleSlugs.includes(module.slug))
    : [];

  if (productId === "template-route-start") {
    for (const module of selectedModules) {
      lineItems.push({
        quantity: 1,
        price_data: {
          currency: "eur",
          unit_amount: module.price * 100,
          recurring: { interval: "month" },
          product_data: { name: `PixelPiraterij module: ${module.copy.nl.label}` },
        },
      });
    }
  }
  if (setupPrice) lineItems.push({ price: setupPrice, quantity: 1 });
  const session = await new Stripe(key).checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    billing_address_collection: "required",
    tax_id_collection: { enabled: true },
    allow_promotion_codes: true,
    client_reference_id: reference,
    success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/${productId === "template-route-start" ? "templates" : "hosting"}?checkout=cancelled`,
    metadata: {
      umbrella: "oeuvre_de_vb",
      brand: "pixelpiraterij",
      reference,
      product: productId,
      concept: family?.slug ?? "standard",
      modules: selectedModules.map((module) => module.slug).join(",") || "none",
    },
    subscription_data: {
      metadata: {
        umbrella: "oeuvre_de_vb",
        brand: "pixelpiraterij",
        reference,
        product: productId,
        concept: family?.slug ?? "standard",
        modules: selectedModules.map((module) => module.slug).join(",") || "none",
      },
    },
  });
  return NextResponse.json({ url: session.url });
}
