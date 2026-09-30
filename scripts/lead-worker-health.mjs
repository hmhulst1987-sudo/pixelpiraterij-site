import pg from "pg";

if (!process.env.LEADS_DATABASE_URL) {
  process.stderr.write("Lead database is not configured.\n");
  process.exit(1);
}

const pool = new pg.Pool({ connectionString: process.env.LEADS_DATABASE_URL, max: 1, connectionTimeoutMillis: 5000 });
try {
  const result = await pool.query("SELECT last_seen_at > now() - interval '2 minutes' AS healthy FROM lead_worker_health WHERE id = 1");
  if (result.rows[0]?.healthy !== true) {
    process.stderr.write("Lead worker heartbeat is stale.\n");
    process.exitCode = 1;
  }
} catch {
  process.stderr.write("Lead worker heartbeat check failed.\n");
  process.exitCode = 1;
} finally {
  await pool.end();
}
