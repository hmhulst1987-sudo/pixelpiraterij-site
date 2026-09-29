export function contentFindings(homeMarkdown: string, contactMarkdown = "") {
  const home = homeMarkdown.replace(/\s+/g, " ").trim();
  const contact = contactMarkdown.replace(/\s+/g, " ").trim();
  const findings: string[] = [];
  if (home.length < 180) findings.push("De gerenderde homepage bevat weinig uitlegbare tekst; controleer de inhoud handmatig.");
  if (!/\b(?:offerte|afspraak|reserveren|reserveer|contact|bel ons|vraag aan|boek|bestel|get in touch|request a quote)\b/i.test(home)) {
    findings.push("In de gerenderde homepage-tekst is geen duidelijke contact- of aanvraagactie gevonden.");
  }
  if (contactMarkdown && !/(?:mailto:|tel:|@|\bcontactformulier\b|\bformulier\b)/i.test(contact)) {
    findings.push("De contactpagina noemt in de opgehaalde tekst geen direct contactkanaal; controleer het formulier zelf.");
  }
  return findings;
}

export function selectDeepAuditCandidates<T extends { audit: { qualification: { size: string; opportunityScore: number } } }>(items: T[], limit = 10): T[] {
  return items.filter(({ audit }) => audit.qualification.size !== "likely-large" && audit.qualification.opportunityScore >= 40)
    .sort((a, b) => b.audit.qualification.opportunityScore - a.audit.qualification.opportunityScore)
    .slice(0, Math.min(10, Math.max(0, limit)));
}
