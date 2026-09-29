#!/usr/bin/env sh
set -eu

PG_CONTAINER=i7usspukqu86ajoat51cd7wi
TEST_ROLE=lead_worker_smoke
TEST_DB=lead_studio_test
CONTEXT=/tmp/pixel-lead-worker-build
PASSWORD="$(openssl rand -hex 24)"

cleanup() {
  sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d "$TEST_DB" -c "DROP OWNED BY $TEST_ROLE;" >/dev/null 2>&1 || true
  sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d postgres -c "DROP ROLE IF EXISTS $TEST_ROLE;" >/dev/null 2>&1 || true
}
trap cleanup EXIT

sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d "$TEST_DB" -c "TRUNCATE lead_outreach, lead_deep_jobs, lead_candidates, lead_usage, lead_runs, lead_campaigns, lead_worker_health RESTART IDENTITY CASCADE; UPDATE lead_control SET mode = 'paused' WHERE id = 1;" >/dev/null

if [ "$(sudo -n docker exec "$PG_CONTAINER" psql -U postgres -Atqc "SELECT 1 FROM pg_roles WHERE rolname = '$TEST_ROLE'")" = 1 ]; then
  sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -c "ALTER ROLE $TEST_ROLE WITH LOGIN PASSWORD '$PASSWORD';" >/dev/null
else
  sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -c "CREATE ROLE $TEST_ROLE WITH LOGIN PASSWORD '$PASSWORD';" >/dev/null
fi

sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d postgres -c "GRANT CONNECT ON DATABASE $TEST_DB TO $TEST_ROLE;" >/dev/null
sudo -n docker exec "$PG_CONTAINER" psql -v ON_ERROR_STOP=1 -U postgres -d "$TEST_DB" -c "GRANT USAGE ON SCHEMA public TO $TEST_ROLE; GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO $TEST_ROLE; GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO $TEST_ROLE;" >/dev/null

sudo -n docker build -q -f "$CONTEXT/Dockerfile.lead-worker" -t pixel-lead-worker-smoke:local "$CONTEXT" >/dev/null
sudo -n docker run --rm --network coolify \
  -e "LEADS_DATABASE_URL=postgresql://$TEST_ROLE:$PASSWORD@$PG_CONTAINER:5432/$TEST_DB" \
  -v "$CONTEXT/scripts/lead-worker-smoke.mjs:/app/scripts/lead-worker-smoke.mjs:ro" \
  pixel-lead-worker-smoke:local node scripts/lead-worker-smoke.mjs
