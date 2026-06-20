import node from "@astrojs/node";
import react from "@astrojs/react";
import { defineConfig } from "astro/config";
import emdash, { local, s3 } from "emdash/astro";
import { postgres, sqlite } from "emdash/db";

// Load ./.env into process.env for local dev (Node 24 built-in). On Railway / CF
// the vars are already in process.env, so the missing-file case is a no-op.
try {
	process.loadEnvFile();
} catch {
	// no .env file — fine, rely on the real process.env
}
const get = (k) => process.env[k];

// Database: Postgres (Railway) when DATABASE_URL is set, else local SQLite.
const database = get("DATABASE_URL")
	? postgres({ connectionString: get("DATABASE_URL") })
	: sqlite({ url: "file:./data.db" });

// Storage: Cloudflare R2 (S3 API) when an R2 bucket is configured, else local
// uploads. R2 endpoint looks like https://<accountid>.r2.cloudflarestorage.com
// and region must be "auto".
const storage = get("S3_BUCKET")
	? s3({
			endpoint: get("S3_ENDPOINT"),
			bucket: get("S3_BUCKET"),
			accessKeyId: get("S3_ACCESS_KEY_ID"),
			secretAccessKey: get("S3_SECRET_ACCESS_KEY"),
			region: get("S3_REGION") || "auto",
			// Public base URL for serving media (r2.dev or a custom domain).
			publicUrl: get("S3_PUBLIC_URL"),
		})
	: local({ directory: "./uploads", baseUrl: "/_emdash/api/media/file" });

export default defineConfig({
	output: "server",
	adapter: node({ mode: "standalone" }),
	integrations: [
		react(),
		emdash({
			database,
			storage,
			plugins: [
				{
					id: "peak-blocks",
					version: "0.1.0",
					entrypoint: new URL("./src/peak/cms/plugin.ts", import.meta.url).href,
				},
			],
		}),
	],
	devToolbar: { enabled: false },
});
