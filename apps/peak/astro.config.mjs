import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

// Peak runs entirely on Cloudflare: Workers (SSR) + D1 (database) + R2 (media).
// Bindings (DB, MEDIA) are declared in wrangler.jsonc; `astro dev` reads them and
// serves against LOCAL emulated D1/R2, and `wrangler deploy` runs against the
// real ones. Migrations + seed apply automatically on first request.
export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	integrations: [
		react(),
		emdash({
			// session: "auto" routes reads to the nearest D1 replica.
			database: d1({ binding: "DB", session: "auto" }),
			storage: r2({ binding: "MEDIA" }),
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
