# Private lead studio pilot

The private `/studio/leads` route automatically discovers and scores local businesses. It prefers nearby businesses over popular national chains, checks the homepage plus up to three relevant internal pages, and separates technical site quality from sales opportunity. Known chain names and explicit large-company language are deprioritized. Company size remains a heuristic, not a verified employee count.

The current score is technical/content-based. It does not yet judge screenshot aesthetics or Core Web Vitals. A missing viewport is not a complete mobile test, and a one-page site is not automatically considered bad. Scan failures are shown per lead so one unavailable site does not stop the list.

## Cost boundary

Each Nearby Search action makes up to five Google Places requests. The requested `websiteUri` field currently puts these requests in the [Nearby Search Enterprise SKU](https://developers.google.com/maps/documentation/places/web-service/data-fields). The counter in the interface only records actions in that browser and is **not** a billing limit. Check Google Cloud Billing and configure project/API budgets or quotas before bulk searching. Do not persist raw Places results as the prospect database; [Place IDs are exempt from caching restrictions](https://developers.google.com/maps/documentation/places/web-service/place-id), unlike most Places content.

## Concept previews

Preview creation is hidden unless `PREVIEW_SERVICE_URL`, `PREVIEW_SERVICE_TOKEN`, and `PREVIEW_PUBLIC_BASE_URL` are configured. The first URL is a private network endpoint, the token is a secret, and the public base must be an HTTPS host serving only concept previews. The operator must verify and confirm name, service and public contact information before creating a preview. This action never sends mail or contact forms and never changes a customer domain.

The generator lives in the separate `websitegenerator-audit` PixelPiraterij adaptation branch. Its current approved concept template is `service-editorial`, which keeps its own visual identity. The original electrician template is not used for other industries. The preview service limits concurrent generation, expires concepts after 14 days, and requires persistent storage for the duration of a pilot. Protect its create API with the bearer token and private networking; do not expose the old localhost dashboard publicly.

## Verification

Run `node --experimental-strip-types --test src/lib/lead-qualification.test.ts`, `npx tsc --noEmit`, and `npm run build`. In the generator's native WSL2 checkout, run `python3 -m unittest discover -s tests -v` and `python3 tools/quick_site.py prepare --template service-editorial`. A full browser check should load a generated `/preview/<id>/` on desktop and a real 390px viewport and verify there is no horizontal overflow.
