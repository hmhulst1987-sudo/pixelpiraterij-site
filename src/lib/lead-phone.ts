export function normalizeDutchPhone(input: string) {
  const compact = input.trim().replace(/[\s().-]/g, "");
  const international = compact.startsWith("00") ? `+${compact.slice(2)}` : compact;
  const canonical = international.startsWith("0") ? `+31${international.slice(1)}` : international;
  return /^\+[1-9][0-9]{7,14}$/.test(canonical) && !canonical.startsWith("+310") ? canonical : null;
}
