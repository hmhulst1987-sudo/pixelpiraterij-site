export function withPreviewBaseHref(html: string, id: string) {
  return html.replace(/<head\b[^>]*>/i, (head) => `${head}<base href="/studio/leads/previews/${id}/">`);
}
