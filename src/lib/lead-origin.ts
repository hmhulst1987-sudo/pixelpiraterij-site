export function isSameLeadOrigin(origin: string | null, host: string | null, protocol: string | null) {
  if (!origin || !host || !protocol) return false;
  try {
    const url = new URL(origin);
    return url.protocol === `${protocol.replace(/:$/, "")}:` && url.host === host;
  } catch { return false; }
}
