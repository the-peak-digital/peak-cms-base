#!/usr/bin/env node
/**
 * Builds showcase CMS pages — one per block family (heroes, services) — each
 * containing every block in that family, numbered and labelled so you can tell
 * which is which.
 *
 * Source of truth is /peak-preview, which globs every blocks/*\/sample.ts and
 * emits each block's { type, node } as a <script class="peak-sample"> blob.
 *
 *   node scripts/peak/make-showcase.mjs
 *   PEAK_BASE=https://… PEAK_COOKIE="astro-session=…" node scripts/peak/make-showcase.mjs
 *   PEAK_BASE=https://… PEAK_PAT=ec_pat_… node scripts/peak/make-showcase.mjs
 *
 * Produces /showcase-hero and /showcase-services.
 */
const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const PAT = process.env.PEAK_PAT;
const COOKIE = process.env.PEAK_COOKIE;
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

const friendly = (t) => t.replace(/^peak\./, "").replace(/^./, (c) => c.toUpperCase()); // peak.hero12 -> Hero12
const familyOf = (t) => t.replace(/^peak\./, "").replace(/[0-9]+$/, ""); // peak.hero12 -> hero
const numOf = (t) => { const m = t.match(/(\d+)$/); return m ? parseInt(m[1], 10) : 0; };

// 2. Group by family, sorted by number
const families = {};
for (const s of samples) (families[familyOf(s.type)] ??= []).push(s);
for (const fam in families) families[fam].sort((a, b) => numOf(a.type) - numOf(b.type));

// 3. Auth
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

const label = (text) => ({
	_key: key(),
	_type: "block",
	style: "h2",
	markDefs: [],
	children: [{ _key: key(), _type: "span", text, marks: [] }],
});

async function publish(slug, title, blocks) {
	const content = blocks.flatMap((s, i) => [
		label(`▸ ${i + 1}. ${friendly(s.type)}  ·  ${s.type}`),
		{ _key: key(), _type: s.type, ...s.node },
	]);
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

// 4. One page per family
for (const fam of Object.keys(families)) {
	const Fam = fam.replace(/^./, (c) => c.toUpperCase());
	await publish(`showcase-${fam}`, `${Fam} blocks — Showcase`, families[fam]);
}
