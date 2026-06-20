#!/usr/bin/env node
/**
 * Peak page generator. Takes a page spec (chosen blocks + content) and
 * creates + publishes it as a CMS page. This is the publish half of the
 * "Claude picks blocks → builds a page" flow and the seed of the city-page
 * generator.
 *
 *   node scripts/peak/make-page.mjs scripts/peak/pages/austin-fence.json
 *   PEAK_BASE=https://peak-cms.you.workers.dev node scripts/peak/make-page.mjs <spec.json>
 *
 * Spec JSON shape:
 *   { "slug": "home", "title": "Home", "content": [ { "_type": "peak.hero24", ... }, ... ] }
 * Each content entry is a block node; this adds a stable _key and upserts the
 * page (create if new, else replace its content), then publishes it.
 */
import { readFile } from "node:fs/promises";

const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const specPath = process.argv[2];
if (!specPath) {
	console.error("Usage: node scripts/peak/make-page.mjs <spec.json>");
	process.exit(1);
}
const key = () => Math.random().toString(36).slice(2, 10);
const log = (...a) => console.log("[make-page]", ...a);

const spec = JSON.parse(await readFile(specPath, "utf8"));
if (!spec.slug || !Array.isArray(spec.content)) {
	console.error("Spec needs { slug, title?, content: [...] }");
	process.exit(1);
}
const content = spec.content.map((b) => ({ _key: key(), ...b }));
const title = spec.title ?? spec.slug;

// auth
const auth = await fetch(`${BASE}/_emdash/api/setup/dev-bypass?token=1`);
const cookie = (auth.headers.get("set-cookie") || "").split(";")[0];
const Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Cookie: cookie };
const Hauth = { "X-EmDash-Request": "1", Cookie: cookie };

// upsert the page by slug
const list = await (await fetch(`${BASE}/_emdash/api/content/pages`, { headers: Hauth })).json();
const existing = (list.data?.items ?? list.items ?? []).find((p) => p.slug === spec.slug);

let id;
if (existing) {
	const full = await (await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, { headers: Hauth })).json();
	const item = full.data?.item ?? full.item;
	const rev = full.data?._rev ?? full._rev ?? item._rev;
	await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, {
		method: "PUT",
		headers: Hjson,
		body: JSON.stringify({ data: { ...item.data, title, content }, _rev: rev }),
	});
	id = existing.id;
	log(`updated page /${spec.slug}`);
} else {
	const cres = await fetch(`${BASE}/_emdash/api/content/pages`, {
		method: "POST",
		headers: Hjson,
		body: JSON.stringify({ slug: spec.slug, data: { title, content } }),
	});
	const cj = await cres.json();
	id = cj.data?.item?.id ?? cj.item?.id ?? cj.data?.id ?? cj.id;
	if (!id) {
		console.error(`✗ create failed: ${cres.status} ${JSON.stringify(cj).slice(0, 300)}`);
		process.exit(1);
	}
	log(`created page /${spec.slug}`);
}

await fetch(`${BASE}/_emdash/api/content/pages/${id}/publish`, { method: "POST", headers: Hjson, body: "{}" });
log(`✓ published ${content.length} blocks → ${BASE}/${spec.slug}`);
log(`  blocks: ${content.map((b) => b._type).join(", ")}`);
