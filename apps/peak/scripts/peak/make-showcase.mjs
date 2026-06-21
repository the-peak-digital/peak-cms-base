#!/usr/bin/env node
/**
 * Builds a single "showcase" CMS page containing one instance of EVERY block.
 *
 * Source of truth is /peak-preview, which globs every blocks/*\/sample.ts and
 * emits each block's { type, node } as a <script class="peak-sample"> blob. We
 * scrape those, turn them into page content, and upsert + publish one page.
 *
 *   node scripts/peak/make-showcase.mjs [slug]
 *   PEAK_BASE=https://peak-cms.you.workers.dev PEAK_PAT=ec_pat_... node scripts/peak/make-showcase.mjs
 *
 * Auth: PEAK_PAT (Bearer) if set — needed on production where dev-bypass is off;
 * otherwise dev-bypass (local).
 */
const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const SLUG = process.argv[2] ?? "showcase";
const TITLE = "Showcase — All Blocks";
const PAT = process.env.PEAK_PAT;
const key = () => Math.random().toString(36).slice(2, 10);
const log = (...a) => console.log("[make-showcase]", ...a);

// 1. Scrape every block sample from /peak-preview
const html = await (await fetch(`${BASE}/peak-preview`)).text();
const samples = [...html.matchAll(/<script[^>]*class="peak-sample"[^>]*>([\s\S]*?)<\/script>/g)].map((m) =>
	JSON.parse(m[1]),
);
if (!samples.length) {
	console.error("✗ no block samples found at /peak-preview — is the dev server running?");
	process.exit(1);
}
const content = samples.map((s) => ({ _key: key(), _type: s.type, ...s.node }));
log(`collected ${content.length} blocks`);

// 2. Auth
const COOKIE = process.env.PEAK_COOKIE; // e.g. "astro-session=..." from a password login
let Hjson, Hauth;
if (PAT) {
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Authorization: `Bearer ${PAT}` };
	Hauth = { "X-EmDash-Request": "1", Authorization: `Bearer ${PAT}` };
} else if (COOKIE) {
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Cookie: COOKIE };
	Hauth = { "X-EmDash-Request": "1", Cookie: COOKIE };
} else {
	const auth = await fetch(`${BASE}/_emdash/api/setup/dev-bypass?token=1`);
	const cookie = (auth.headers.get("set-cookie") || "").split(";")[0];
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Cookie: cookie };
	Hauth = { "X-EmDash-Request": "1", Cookie: cookie };
}

// 3. Upsert by slug
const list = await (await fetch(`${BASE}/_emdash/api/content/pages`, { headers: Hauth })).json();
const existing = (list.data?.items ?? list.items ?? []).find((p) => p.slug === SLUG);

let id;
if (existing) {
	const full = await (await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, { headers: Hauth })).json();
	const item = full.data?.item ?? full.item;
	const rev = full.data?._rev ?? full._rev ?? item._rev;
	await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, {
		method: "PUT",
		headers: Hjson,
		body: JSON.stringify({ data: { ...item.data, title: TITLE, content }, _rev: rev }),
	});
	id = existing.id;
	log(`updated page /${SLUG}`);
} else {
	const cres = await fetch(`${BASE}/_emdash/api/content/pages`, {
		method: "POST",
		headers: Hjson,
		body: JSON.stringify({ slug: SLUG, data: { title: TITLE, content } }),
	});
	const cj = await cres.json();
	id = cj.data?.item?.id ?? cj.item?.id ?? cj.data?.id ?? cj.id;
	if (!id) {
		console.error(`✗ create failed: ${cres.status} ${JSON.stringify(cj).slice(0, 300)}`);
		process.exit(1);
	}
	log(`created page /${SLUG}`);
}

// 4. Publish
await fetch(`${BASE}/_emdash/api/content/pages/${id}/publish`, { method: "POST", headers: Hjson, body: "{}" });
log(`✓ published ${content.length} blocks → ${BASE}/${SLUG}`);
