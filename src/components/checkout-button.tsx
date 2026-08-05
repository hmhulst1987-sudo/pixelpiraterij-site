"use client";

import { useState } from "react";
import type { PixelProduct } from "@/lib/stripe-products";

export function CheckoutButton({ product, children }: { product: PixelProduct; children: string }) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  async function checkout() {
    setPending(true);
    setError("");
    try {
      const response = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ product }) });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || "Checkout kon niet openen.");
      window.location.assign(payload.url);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Checkout kon niet openen.");
      setPending(false);
    }
  }
  return <div><button type="button" className="btn-primary" onClick={checkout} disabled={pending}>{pending ? "Checkout openen..." : children}</button>{error ? <p className="mt-3 text-sm text-[var(--color-signal)]">{error}</p> : null}</div>;
}
