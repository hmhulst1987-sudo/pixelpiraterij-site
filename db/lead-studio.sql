CREATE TABLE IF NOT EXISTS lead_control (
  id integer PRIMARY KEY CHECK (id = 1),
  mode text NOT NULL DEFAULT 'paused' CHECK (mode IN ('paused', 'running')),
  search_runs_limit integer NOT NULL DEFAULT 20 CHECK (search_runs_limit BETWEEN 0 AND 100000),
  places_limit integer NOT NULL DEFAULT 100 CHECK (places_limit BETWEEN 0 AND 100000),
  firecrawl_limit integer NOT NULL DEFAULT 300 CHECK (firecrawl_limit BETWEEN 0 AND 100000),
  geocode_limit integer NOT NULL DEFAULT 25 CHECK (geocode_limit BETWEEN 0 AND 100000),
  previews_limit integer NOT NULL DEFAULT 10 CHECK (previews_limit BETWEEN 0 AND 100000),
  ai_limit integer NOT NULL DEFAULT 0 CHECK (ai_limit BETWEEN 0 AND 100000),
  updated_at timestamptz NOT NULL DEFAULT now()
);

INSERT INTO lead_control (id) VALUES (1) ON CONFLICT (id) DO NOTHING;

CREATE TABLE IF NOT EXISTS lead_usage (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  period char(7) NOT NULL CHECK (period ~ '^[0-9]{4}-[0-9]{2}$'),
  kind text NOT NULL CHECK (kind IN ('search_runs', 'places', 'firecrawl', 'geocode', 'previews', 'ai')),
  units integer NOT NULL CHECK (units > 0),
  outcome text NOT NULL DEFAULT 'reserved' CHECK (outcome IN ('reserved', 'succeeded', 'failed')),
  external_status integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz
);

CREATE INDEX IF NOT EXISTS lead_usage_period_kind_idx ON lead_usage (period, kind);

CREATE TABLE IF NOT EXISTS lead_worker_health (
  id integer PRIMARY KEY CHECK (id = 1),
  last_seen_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS lead_campaigns (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  label text NOT NULL CHECK (char_length(label) BETWEEN 1 AND 120),
  latitude double precision NOT NULL CHECK (latitude BETWEEN -90 AND 90),
  longitude double precision NOT NULL CHECK (longitude BETWEEN -180 AND 180),
  radius_m integer NOT NULL CHECK (radius_m BETWEEN 500 AND 50000),
  interval_minutes integer NOT NULL DEFAULT 1440 CHECK (interval_minutes BETWEEN 60 AND 43200),
  max_candidates integer NOT NULL DEFAULT 20 CHECK (max_candidates BETWEEN 1 AND 100),
  enabled boolean NOT NULL DEFAULT true,
  next_run_at timestamptz NOT NULL DEFAULT now(),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS lead_campaigns_due_idx ON lead_campaigns (next_run_at) WHERE enabled;

CREATE TABLE IF NOT EXISTS lead_runs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  campaign_id bigint NOT NULL REFERENCES lead_campaigns(id),
  scheduled_for timestamptz NOT NULL,
  status text NOT NULL DEFAULT 'running' CHECK (status IN ('running', 'completed', 'paused', 'limit', 'failed')),
  places_found integer NOT NULL DEFAULT 0,
  websites_scanned integer NOT NULL DEFAULT 0,
  deep_scanned integer NOT NULL DEFAULT 0,
  error text,
  started_at timestamptz NOT NULL DEFAULT now(),
  finished_at timestamptz,
  UNIQUE (campaign_id, scheduled_for)
);

ALTER TABLE lead_usage ADD COLUMN IF NOT EXISTS run_id bigint REFERENCES lead_runs(id);
CREATE INDEX IF NOT EXISTS lead_usage_run_kind_idx ON lead_usage (run_id, kind) WHERE run_id IS NOT NULL;

CREATE TABLE IF NOT EXISTS lead_candidates (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  place_id text NOT NULL UNIQUE,
  source_site_url text NOT NULL,
  site_title text NOT NULL,
  technical_score integer NOT NULL CHECK (technical_score BETWEEN 0 AND 100),
  opportunity_score integer NOT NULL CHECK (opportunity_score BETWEEN 0 AND 100),
  size_class text NOT NULL CHECK (size_class IN ('small-medium', 'unknown', 'likely-large')),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'dismissed', 'shortlisted')),
  audit jsonb NOT NULL,
  deep_audit jsonb,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at timestamptz NOT NULL DEFAULT now(),
  last_run_id bigint REFERENCES lead_runs(id)
);

CREATE INDEX IF NOT EXISTS lead_candidates_score_idx ON lead_candidates (opportunity_score DESC, last_seen_at DESC);

CREATE TABLE IF NOT EXISTS lead_deep_jobs (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  run_id bigint NOT NULL REFERENCES lead_runs(id),
  candidate_id bigint NOT NULL REFERENCES lead_candidates(id),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'running', 'completed', 'failed', 'interrupted')),
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  ready_after timestamptz NOT NULL DEFAULT now(),
  started_at timestamptz,
  finished_at timestamptz,
  UNIQUE (run_id, candidate_id)
);

ALTER TABLE lead_deep_jobs ADD COLUMN IF NOT EXISTS ready_after timestamptz NOT NULL DEFAULT now();
CREATE INDEX IF NOT EXISTS lead_deep_jobs_pending_idx ON lead_deep_jobs (ready_after, id) WHERE status = 'pending';

CREATE TABLE IF NOT EXISTS lead_outreach (
  id bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  candidate_id bigint NOT NULL UNIQUE REFERENCES lead_candidates(id),
  recipient_email text,
  subject text NOT NULL,
  body text NOT NULL,
  source_url text NOT NULL,
  legal_basis text NOT NULL DEFAULT 'none' CHECK (legal_basis IN ('none', 'consent', 'existing_customer')),
  legal_evidence text,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft', 'approved', 'sending', 'sent', 'failed_unknown', 'cancelled')),
  revision integer NOT NULL DEFAULT 0,
  approval_version integer NOT NULL DEFAULT 0,
  approved_at timestamptz,
  attempted_at timestamptz,
  sent_at timestamptz,
  provider_message_id text,
  last_error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE lead_outreach ADD COLUMN IF NOT EXISTS revision integer NOT NULL DEFAULT 0;

CREATE INDEX IF NOT EXISTS lead_outreach_status_idx ON lead_outreach (status, created_at DESC);

CREATE TABLE IF NOT EXISTS lead_contact_suppression (
  email text PRIMARY KEY CHECK (email = lower(email)),
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
