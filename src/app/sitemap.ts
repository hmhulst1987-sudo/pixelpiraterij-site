import type { MetadataRoute } from "next";

const baseUrl = "https://pixelpiraterij.nl";
const routes = ["", "/studio", "/cases", "/hosting", "/templates", "/templates/builder", "/domeinen", "/about", "/contact", "/legal"];
const locales = ["", "/en", "/fr", "/es", "/de"];

export default function sitemap(): MetadataRoute.Sitemap {
  const localizedRoutes = locales.flatMap((locale) =>
    routes
      .filter((route) => route !== "/legal" || locale === "")
      .map((route) => ({
        url: `${baseUrl}${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
        priority: route === "" ? 1 : route === "/contact" ? 0.9 : 0.7,
      })),
  );
  return [
    ...localizedRoutes,
    { url: `${baseUrl}/gratis-websitecheck`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
  ];
}
