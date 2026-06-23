#!/usr/bin/env node
/**
 * Generic landing-page publisher — the "machine". Reads a page definition from
 * scripts/peak/landings/<name>.mjs ({ slug, title, blocks }) and publishes it as
 * a real CMS page. Add a new landing = add one file under landings/.
 *
 *   node scripts/peak/make-landing.mjs kitchen
 *   node scripts/peak/make-landing.mjs bathroom
 *   node scripts/peak/make-landing.mjs all            # every landing
 *   PEAK_BASE=https://… PEAK_COOKIE="astro-session=…" node scripts/peak/make-landing.mjs all
 */
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const COOKIE = process.env.PEAK_COOKIE;
const PAT = process.env.PEAK_PAT;
const arg = process.argv[2] || "kitchen";
const key = () => Math.random().toString(36).slice(2, 10);
const log = (...a) => console.log("[make-landing]", ...a);
const here = dirname(fileURLToPath(import.meta.url));

// Resolve which landing(s) to publish.
let names;
if (arg === "all") {
	names = (await readdir(join(here, "landings"))).filter((f) => f.endsWith(".mjs")).map((f) => f.replace(/\.mjs$/, ""));
} else {
	names = [arg];
}

// Auth (PAT > cookie > dev-bypass).
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

async function publish({ slug, title, blocks }) {
	const content = blocks.map((b) => ({ _key: key(), _type: b.type, ...b.node }));
	const list = await (await fetch(`${BASE}/_emdash/api/content/pages`, { headers: Hauth })).json();
	const existing = (list.data?.items ?? list.items ?? []).find((p) => p.slug === slug);
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
	} else {
		const cres = await fetch(`${BASE}/_emdash/api/content/pages`, {
			method: "POST",
			headers: Hjson,
			body: JSON.stringify({ slug, data: { title, content } }),
		});
		const cj = await cres.json();
		id = cj.data?.item?.id ?? cj.item?.id ?? cj.data?.id ?? cj.id;
		if (!id) {
			console.error(`✗ create ${slug} failed: ${cres.status} ${JSON.stringify(cj).slice(0, 200)}`);
			return;
		}
	}
	await fetch(`${BASE}/_emdash/api/content/pages/${id}/publish`, { method: "POST", headers: Hjson, body: "{}" });
	log(`✓ ${blocks.length} blocks → ${BASE}/${slug}`);
}

for (const name of names) {
	const mod = await import(`./landings/${name}.mjs`);
	const landing = mod.landing ?? mod.default;
	if (!landing?.slug) {
		console.error(`✗ landings/${name}.mjs has no { slug, title, blocks } export`);
		continue;
	}
	await publish(landing);
}
