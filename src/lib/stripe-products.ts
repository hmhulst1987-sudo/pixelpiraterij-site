export const pixelProducts = {
  "harbor-starter": { recurringEnv: "PIXELPIRATERIJ_STRIPE_PRICE_HARBOR_MONTH" },
  "route-studio": { recurringEnv: "PIXELPIRATERIJ_STRIPE_PRICE_STUDIO_MONTH" },
  "template-route-start": {
    recurringEnv: "PIXELPIRATERIJ_STRIPE_PRICE_TEMPLATE_MONTH",
    setupEnv: "PIXELPIRATERIJ_STRIPE_PRICE_TEMPLATE_SETUP",
  },
} as const;

export type PixelProduct = keyof typeof pixelProducts;

export function isPixelProduct(value: unknown): value is PixelProduct {
  return typeof value === "string" && value in pixelProducts;
}
