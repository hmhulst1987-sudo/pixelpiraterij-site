# Leadstudio agent API

The agent API is a narrow machine-to-machine interface for lead review. It does not expose outreach, email sending, preview generation, arbitrary SQL, or a general website scanner.

## Deployment

1. Apply `npm run leads:migrate` to the existing lead database before deploying the site and worker. The migration adds one-shot campaign and idempotency columns; it does not change existing campaigns.
2. Deploy the site and worker from the same commit. A site-only deployment can queue a one-shot campaign that an older worker treats as recurring.
3. Set a new random `LEADS_AGENT_TOKEN` of at least 32 characters on the site. Keep it separate from `LEADS_WORKER_TOKEN`, Coolify credentials, and the Cloudflare Access service token.
4. In Cloudflare Access, create a service token with access only to the leadstudio application. Keep the existing human policy. The API still requires `LEADS_AGENT_TOKEN` after Access authorizes the request.
5. Set `LEADS_AGENT_URL`, `LEADS_AGENT_TOKEN`, `CF_ACCESS_CLIENT_ID`, and `CF_ACCESS_CLIENT_SECRET` in the operator's local environment. Never commit their values.
6. Verify `npm run leads:agent -- status` and `npm run leads:agent -- runs` before scheduling anything. A read-only check must not consume a Places or Firecrawl request.

On the configured Windows operator machine, the DPAPI-encrypted values in the ignored `.local/lead-agent-credentials.json` can be used with `pwsh -File scripts/lead-agent.ps1 status`. This wrapper restores the process environment after each command. The encrypted file is tied to this Windows user and must not be committed or copied as a portable credential.

## Commands

`npm run leads:agent -- status` shows pause state, worker heartbeat, monthly usage and remaining limits.

`npm run leads:agent -- estimate --label "Eindhoven" --lat 51.4416 --lon 5.4697 --radius 20000 --max 20` checks the proposed maximum usage without starting a search.

`npm run leads:agent -- queue --label "Eindhoven" --lat 51.4416 --lon 5.4697 --radius 20000 --max 20 --key UUID --confirm` queues one search. This can trigger paid APIs. The CLI prints the idempotency key; reuse that same key if the response is lost. A different payload with the same key is rejected.

`npm run leads:agent -- runs` lists recent one-shot runs. `npm run leads:agent -- candidates --run ID` lists candidates from one run; `--shortlisted` and `--limit N` are available. `npm run leads:agent -- shortlist ID --confirm` is the only candidate edit. `pause` stops future work; `resume --confirm` restarts it.

Maximum per one-shot request: 30 km radius, 20 website audits, 5 planned Places calls, 5 deep jobs, and up to 15 Firecrawl calls. Monthly limits remain authoritative. No search, shortlist, or resume is executed without its explicit confirmation flag and corresponding request header. Email delivery is outside this API and remains a separate manual workflow.
