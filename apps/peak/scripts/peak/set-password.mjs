#!/usr/bin/env node
/**
 * Sets a Peak username/password login password for an existing user.
 * Hashes with PBKDF2-HMAC-SHA256 (same params as src/lib/peak-password.ts) and
 * upserts it into the `options` table (key `peak:pw:<email>`) in D1.
 *
 *   node scripts/peak/set-password.mjs <email> <password>            # live (--remote)
 *   node scripts/peak/set-password.mjs <email> <password> --local    # local D1
 *
 * The email must match an existing user row. Prints the SQL if you'd rather run
 * it yourself.
 */
import { pbkdf2Sync, randomBytes } from "node:crypto";
import { execFileSync } from "node:child_process";

const [email, password, flag] = process.argv.slice(2);
if (!email || !password) {
	console.error("Usage: node scripts/peak/set-password.mjs <email> <password> [--local]");
	process.exit(1);
}
const remote = flag !== "--local";

const salt = randomBytes(16).toString("hex");
const hash = pbkdf2Sync(password, Buffer.from(salt, "hex"), 100_000, 32, "sha256").toString("hex");
const value = JSON.stringify({ salt, hash, v: 1 });
const name = `peak:pw:${email.toLowerCase()}`;
const esc = (s) => s.replace(/'/g, "''");
const sql = `DELETE FROM options WHERE name='${esc(name)}'; INSERT INTO options (name, value) VALUES ('${esc(name)}', '${esc(value)}');`;

console.log(`Setting password for ${email} (${remote ? "remote/live" : "local"} D1)…`);
try {
	execFileSync(
		"npx",
		["--no-install", "wrangler", "d1", "execute", "peak-cms-db", remote ? "--remote" : "--local", "--command", sql],
		{ stdio: "inherit" },
	);
	console.log(`\n✓ Password set. Sign in at /login with ${email}`);
} catch {
	console.log("\nCouldn't run wrangler automatically. Run this SQL yourself:");
	console.log(`\nnpx wrangler d1 execute peak-cms-db ${remote ? "--remote" : "--local"} --command "${sql.replace(/"/g, '\\"')}"`);
}
