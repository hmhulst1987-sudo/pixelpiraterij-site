"use client";

import { useId, useState } from "react";

type DomainResult = {
  domain: string;
  extension: string;
  status: "free" | "taken" | "unknown";
  netCents: number | null;
  grossCents: number | null;
  provisional: boolean;
};

type Copy = {
  label: string;
  placeholder: string;
  submit: string;
  submitting: string;
  free: string;
  taken: string;
  unknown: string;
  perYear: string;
  exVat: string;
  select: string;
  selected: string;
  order: string;
  ordering: string;
  empty: string;
  hint: string;
};

const dutch: Copy = {
  label: "Welke naam wil je?",
  placeholder: "bijvoorbeeld hofenhei",
  submit: "Controleer",
  submitting: "Bezig met controleren...",
  free: "Vrij",
  taken: "Bezet",
  unknown: "Onbekend",
  perYear: "per jaar",
  exVat: "excl. btw",
  select: "Vastzetten",
  selected: "Gekozen",
  order: "Vastleggen",
  ordering: "Bezig...",
  empty: "Typ een naam en ik kijk direct bij de registry welke extensies nog vrij zijn.",
  hint: "Prijzen zijn per jaar, inclusief btw. Verlengen gaat tegen hetzelfde tarief.",
};

const euro = new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR" });

export function DomainSearch({
  copy = dutch,
  onSelect,
  selectedDomain,
}: {
  copy?: Copy;
  onSelect?: (result: DomainResult) => void;
  selectedDomain?: string;
}) {
  const fieldId = useId();
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<DomainResult[] | null>(null);
  const [pending, setPending] = useState(false);
  const [ordering, setOrdering] = useState("");
  const [error, setError] = useState("");

  async function order(domain: string) {
    if (ordering) return;
    setOrdering(domain);
    setError("");

    try {
      const response = await fetch("/api/domains/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ domain }),
      });
      const payload = await response.json();
      if (!response.ok || !payload.url) throw new Error(payload.error || "Bestellen lukte niet.");
      window.location.assign(payload.url);
    } catch (failure) {
      setError(failure instanceof Error ? failure.message : "Bestellen lukte niet.");
      setOrdering("");
    }
  }

  async function search(event: React.FormEvent) {
    event.preventDefault();
    if (!query.trim() || pending) return;

    setPending(true);
    setError("");

    try {
      const response = await fetch("/api/domains/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const payload = await response.json();
      if (!response.ok) throw new Error(payload.error || "De domeincheck lukte niet.");
      setResults(payload.results as DomainResult[]);
    } catch (failure) {
      setResults(null);
      setError(failure instanceof Error ? failure.message : "De domeincheck lukte niet.");
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="domain-search">
      <form className="domain-search-form" onSubmit={search}>
        <label className="section-tag" htmlFor={fieldId}>
          {copy.label}
        </label>
        <div className="domain-search-field">
          <input
            id={fieldId}
            className="domain-search-input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={copy.placeholder}
            autoComplete="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
          />
          <button type="submit" className="btn-primary" disabled={pending || !query.trim()}>
            {pending ? copy.submitting : copy.submit}
          </button>
        </div>
      </form>

      {error ? <p className="domain-search-error">{error}</p> : null}

      {!results && !error ? <p className="domain-search-empty">{copy.empty}</p> : null}

      {results ? (
        <>
          <div className="stack-board stack-board--clean domain-results">
            {results.map((result) => {
              const isFree = result.status === "free";
              const isSelected = selectedDomain === result.domain;

              return (
                <div key={result.domain} className="stack-row domain-row">
                  <div className="domain-row-name">
                    <span className="domain-row-label">{result.domain}</span>
                    <span className={`domain-badge domain-badge--${result.status}`}>
                      {isFree ? copy.free : result.status === "taken" ? copy.taken : copy.unknown}
                    </span>
                  </div>

                  {isFree && result.grossCents !== null ? (
                    <div className="domain-row-price">
                      <span className="domain-price">{euro.format(result.grossCents / 100)}</span>
                      <span className="domain-price-note">
                        {copy.perYear}
                        {result.netCents !== null ? ` · ${euro.format(result.netCents / 100)} ${copy.exVat}` : ""}
                      </span>
                    </div>
                  ) : (
                    <div className="domain-row-price" />
                  )}

                  <div className="domain-row-action">
                    {isFree && onSelect ? (
                      <button
                        type="button"
                        className={isSelected ? "btn-secondary" : "btn-primary"}
                        onClick={() => onSelect(result)}
                      >
                        {isSelected ? copy.selected : copy.select}
                      </button>
                    ) : null}

                    {isFree && !onSelect ? (
                      <button
                        type="button"
                        className="btn-primary"
                        onClick={() => order(result.domain)}
                        disabled={Boolean(ordering)}
                      >
                        {ordering === result.domain ? copy.ordering : copy.order}
                      </button>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
          <p className="domain-search-hint">{copy.hint}</p>
        </>
      ) : null}
    </div>
  );
}

export type { DomainResult, Copy as DomainSearchCopy };
