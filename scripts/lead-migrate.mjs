import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import pg from "pg";

const url = process.env.LEADS_DATABASE_URL;
if (!url) throw new Error("Set LEADS_DATABASE_URL before running the lead migration.");

const file = fileURLToPath(new URL("../db/lead-studio.sql", import.meta.url));
const client = new pg.Client({ connectionString: url, connectionTimeoutMillis: 10000 });
try {
  await client.connect();
  await client.query(await readFile(file, "utf8"));
  process.stdout.write("Lead studio database is ready. Worker remains paused.\n");
} finally {
  await client.end();
}
