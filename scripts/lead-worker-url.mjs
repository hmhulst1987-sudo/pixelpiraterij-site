export function validateSiteUrl(rawUrl, privateHost) {
  const url = new URL(rawUrl);
  if (url.username || url.password || url.pathname !== "/" || url.search || url.hash) {
    throw new Error("LEADS_SITE_URL must be an origin without credentials or a path.");
  }
  const privateHttp = privateHost
    && /^[a-z0-9][a-z0-9-]{0,62}$/.test(privateHost)
    && url.hostname === privateHost;
  if (url.protocol !== "https:" && !(url.protocol === "http:" && (url.hostname === "localhost" || privateHttp))) {
    throw new Error("LEADS_SITE_URL must use HTTPS or an explicitly named private Coolify host.");
  }
  return url;
}
