import cloudflare from "@astrojs/cloudflare";
import react from "@astrojs/react";
import { d1, r2 } from "@emdash-cms/cloudflare";
import { defineConfig } from "astro/config";
import emdash from "emdash/astro";

// Peak runs entirely on Cloudflare: Workers (SSR) + D1 (database) + R2 (media).
// Bindings (DB, MEDIA) are declared in wrangler.jsonc; `astro dev` reads them and
// serves against LOCAL emulated D1/R2, and `wrangler deploy` runs against the
// real ones. Migrations + seed apply automatically on first request.
// The D1 Sessions API (read replication) only works on real Cloudflare. The local
// miniflare emulator hangs on the session-bookmark path for authenticated requests,
// so enable it for builds/deploys only — not `astro dev`.
const isDev = process.argv.includes("dev");

export default defineConfig({
	output: "server",
	adapter: cloudflare(),
	image: {
		layout: "constrained",
		responsiveStyles: true,
	},
	vite: {
		// The admin SPA pulls in a huge dependency tree (TipTap, ECharts, Kumo,
		// Lingui, dnd-kit). By default Vite discovers and bundles these LAZILY the
		// first time you open /_emdash/admin — which stalls every request for a
		// minute and then force-reloads (looks like a "freeze"). Pre-declaring them
		// here makes Vite bundle them once at dev-server STARTUP instead, so the
		// admin never freezes mid-session.
		optimizeDeps: {
			include: [
				"@cloudflare/kumo",
				"@cloudflare/kumo/primitives",
				"@cloudflare/kumo/components/chart",
				"@lingui/core",
				"@lingui/react",
				"@tanstack/react-query",
				"@tanstack/react-router",
				"clsx",
				"tailwind-merge",
				"@phosphor-icons/react",
				"@dnd-kit/core",
				"@dnd-kit/sortable",
				"@dnd-kit/utilities",
				"@floating-ui/react",
				"react-hotkeys-hook",
				"dompurify",
				"marked",
				"@atcute/identity-resolver",
				"@tiptap/core",
				"@tiptap/react",
				"@tiptap/react/menus",
				"@tiptap/starter-kit",
				"@tiptap/suggestion",
				"@tiptap/pm/state",
				"@tiptap/extension-character-count",
				"@tiptap/extension-focus",
				"@tiptap/extension-placeholder",
				"@tiptap/extension-table",
				"@tiptap/extension-table-cell",
				"@tiptap/extension-table-header",
				"@tiptap/extension-table-row",
				"@tiptap/extension-text-align",
				"@tiptap/extension-typography",
				"@tiptap/extension-link",
				"@tiptap/extension-code-block",
				"@tiptap/extension-drag-handle-react",
			],
		},
	},
	integrations: [
		react(),
		emdash({
			// session: "auto" routes reads to the nearest D1 replica (prod only —
			// see isDev note above; it hangs authenticated requests under miniflare).
			database: d1({ binding: "DB", ...(isDev ? {} : { session: "auto" }) }),
			storage: r2({ binding: "MEDIA" }),
			// Expose the built-in MCP server at /_emdash/api/mcp so AI tools
			// (Claude, etc.) can manage this site's content. Auth via OAuth or a
			// Personal Access Token created in the admin panel.
			mcp: true,
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
