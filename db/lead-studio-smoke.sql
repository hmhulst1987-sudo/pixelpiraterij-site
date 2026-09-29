BEGIN;

DO $$
DECLARE
  campaign_id bigint;
  smoke_run_id bigint;
  smoke_candidate_id bigint;
  places_used integer;
  firecrawl_used integer;
  smoke_usage_id bigint;
BEGIN
  IF (SELECT mode FROM lead_control WHERE id = 1) <> 'paused' THEN
    RAISE EXCEPTION 'A fresh lead control database must start paused';
  END IF;

  INSERT INTO lead_campaigns (label, latitude, longitude, radius_m)
  VALUES ('Smoke test', 51.5719, 4.7683, 20000)
  RETURNING id INTO campaign_id;

  INSERT INTO lead_runs (campaign_id, scheduled_for)
  VALUES (campaign_id, now())
  RETURNING id INTO smoke_run_id;

  INSERT INTO lead_usage (period, kind, units, run_id)
  VALUES (to_char(now() AT TIME ZONE 'Europe/Amsterdam', 'YYYY-MM'), 'places', 2, smoke_run_id),
    (to_char(now() AT TIME ZONE 'Europe/Amsterdam', 'YYYY-MM'), 'firecrawl', 3, smoke_run_id);

  SELECT COALESCE(SUM(units) FILTER (WHERE kind = 'places'), 0),
    COALESCE(SUM(units) FILTER (WHERE kind = 'firecrawl'), 0)
  INTO places_used, firecrawl_used
  FROM lead_usage WHERE lead_usage.run_id = smoke_run_id;

  IF places_used <> 2 OR firecrawl_used <> 3 THEN
    RAISE EXCEPTION 'Usage was not associated with its search run';
  END IF;

  INSERT INTO lead_usage (period, kind, units)
  VALUES (to_char(now() AT TIME ZONE 'Europe/Amsterdam', 'YYYY-MM'), 'previews', 1)
  RETURNING id INTO smoke_usage_id;
  INSERT INTO lead_preview_requests (request_key, draft_digest, usage_id)
  VALUES ('00000000-0000-4000-8000-000000000001', repeat('a', 64), smoke_usage_id);
  UPDATE lead_preview_requests SET preview_path = '/preview/test-smoke/', completed_at = now()
  WHERE request_key = '00000000-0000-4000-8000-000000000001';
  IF (SELECT preview_path FROM lead_preview_requests WHERE usage_id = smoke_usage_id) <> '/preview/test-smoke/' THEN
    RAISE EXCEPTION 'Manual preview ledger did not preserve its result';
  END IF;

  INSERT INTO lead_candidates (place_id, source_site_url, site_title, technical_score,
    opportunity_score, size_class, audit, last_run_id)
  VALUES ('smoke-place-id', 'https://example.com', 'Example', 40, 60, 'small-medium', '{}'::jsonb, smoke_run_id)
  RETURNING id INTO smoke_candidate_id;

  IF EXISTS (SELECT 1 FROM lead_call_reviews WHERE candidate_id = smoke_candidate_id) THEN
    RAISE EXCEPTION 'Lead unexpectedly had preapproved call evidence';
  END IF;
  INSERT INTO lead_call_reviews (candidate_id, phone, legal_form, phone_source_url, consent_evidence)
  VALUES (smoke_candidate_id, '+31612345678', 'natural_person', 'https://example.com/contact', 'Test-only documented opt-in from the business owner');
  INSERT INTO lead_phone_suppression (phone, reason) VALUES ('+31612345678', 'Test objection');
  IF NOT EXISTS (SELECT 1 FROM lead_call_reviews c JOIN lead_phone_suppression s ON s.phone = c.phone
    WHERE c.candidate_id = smoke_candidate_id) THEN
    RAISE EXCEPTION 'Telephone suppression did not match the reviewed number';
  END IF;

  INSERT INTO lead_deep_jobs (run_id, candidate_id) VALUES (smoke_run_id, smoke_candidate_id)
  ON CONFLICT (run_id, candidate_id) DO NOTHING;
  INSERT INTO lead_deep_jobs (run_id, candidate_id) VALUES (smoke_run_id, smoke_candidate_id)
  ON CONFLICT (run_id, candidate_id) DO NOTHING;
  IF (SELECT COUNT(*) FROM lead_deep_jobs WHERE run_id = smoke_run_id) <> 1 THEN
    RAISE EXCEPTION 'Deep scan queue allowed a duplicate job';
  END IF;

  INSERT INTO lead_outreach (candidate_id, subject, body, source_url)
  VALUES (smoke_candidate_id, 'Vraag over uw website', 'Dit is een onverzonden concept.', 'https://example.com');
  IF EXISTS (SELECT 1 FROM lead_outreach WHERE candidate_id = smoke_candidate_id
      AND (recipient_email IS NOT NULL OR status <> 'draft' OR legal_basis <> 'none' OR approved_at IS NOT NULL OR revision <> 0)) THEN
    RAISE EXCEPTION 'Automatically created outreach was sendable';
  END IF;

  UPDATE lead_outreach SET revision = revision + 1 WHERE candidate_id = smoke_candidate_id AND revision = 0;
  IF (SELECT revision FROM lead_outreach WHERE candidate_id = smoke_candidate_id) <> 1 THEN
    RAISE EXCEPTION 'Outreach optimistic revision did not advance';
  END IF;

  UPDATE lead_runs SET status = 'failed', finished_at = now()
  WHERE id = smoke_run_id AND status = 'running';
  IF (SELECT status FROM lead_runs WHERE id = smoke_run_id) <> 'failed' THEN
    RAISE EXCEPTION 'Interrupted run could not be marked failed';
  END IF;

  RAISE NOTICE 'Lead schema smoke test passed';
END $$;

ROLLBACK;
