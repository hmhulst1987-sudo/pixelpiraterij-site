import { NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const key = process.env.PIXELPIRATERIJ_STRIPE_SECRET_KEY;
  const secret = process.env.PIXELPIRATERIJ_STRIPE_WEBHOOK_SECRET;
  const signature = request.headers.get("stripe-signature");
  if (!key || !secret) return NextResponse.json({ error: "Webhook niet geconfigureerd." }, { status: 503 });
  if (!signature) return NextResponse.json({ error: "Stripe-handtekening ontbreekt." }, { status: 400 });
  try {
    const event = new Stripe(key).webhooks.constructEvent(await request.text(), signature, secret);
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      console.info("PixelPiraterij checkout voltooid", session.metadata?.reference, session.metadata?.product);
    }
    return NextResponse.json({ received: true });
  } catch {
    return NextResponse.json({ error: "Ongeldige Stripe-handtekening." }, { status: 400 });
  }
}
