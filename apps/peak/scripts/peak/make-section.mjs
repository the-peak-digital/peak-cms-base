#!/usr/bin/env node
/**
 * Peak section + demo-page generator. The "always do these two things" step
 * after creating a block. One command per block:
 *
 *   node scripts/peak/make-section.mjs Services1
 *   node scripts/peak/make-section.mjs Services1 Services2        # batch
 *   node scripts/peak/make-section.mjs Services1 --demo services-demo
 *   node scripts/peak/make-section.mjs --all                      # every block w/ a sample
 *
 * For each block it:
 *   1. screenshots the block from /peak-preview (JS disabled so Astro-dev's
 *      HMR client can't blank the server-rendered scoped styles),
 *   2. uploads the shot and (re)creates the EmDash Section `block-<name>`
 *      with a preview thumbnail + the block's sample content,
 *   3. upserts a `<prefix>-demo` page (e.g. services-demo) containing the
 *      block(s) and publishes it.
 *
 * Source of truth for sample data = blocks/<Name>/sample.ts (read off the
 * rendered preview page, so the section, the demo page and the live render
 * never drift). Requires `pnpm dev` to be running. Needs DATABASE creds only
 * via the app's own .env (loaded for nothing here — all I/O is over HTTP).
 */
import { chromium } from "@playwright/test";
import { utimesSync } from "node:fs";

const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const args = process.argv.slice(2);
let demoSlug = null;
const di = args.indexOf("--demo");
if (di !== -1) {
	demoSlug = args[di + 1];
	args.splice(di, 2);
}
const wantAll = args.includes("--all");
const names = args.filter((a) => !a.startsWith("--"));

const log = (...a) => console.log("[make-section]", ...a);
const key = () => Math.random().toString(36).slice(2, 10);
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

// Astro DEV serves a block's scoped <style> from TWO Vite environments (SSR +
// client). When a block's .astro was first compiled as the generator stub and
// later filled in, the CLIENT transform can stay stale, so the HMR client
// overwrites the good SSR styles with the old stub → the block renders UNSTYLED
// in a real browser (and the published demo page). Bumping the file's mtime
// forces a fresh transform in both envs. (Production builds are unaffected — no
// HMR — but the dev demo page is what we screenshot/verify.)
function touchBlock(Name) {
	try {
		const now = new Date();
		utimesSync(`src/peak/blocks/${Name}/${Name}.astro`, now, now);
	} catch {
		/* --all path or unknown name: nothing to touch */
	}
}
for (const n of names) touchBlock(n);
if (names.length) await sleep(1500); // let the dev server re-transform

// ── auth ──────────────────────────────────────────────────────────────────
// PEAK_PAT (ec_pat_*) → Bearer auth, for production where dev-bypass is off.
// Otherwise the local dev-bypass session.
let Hjson, Hauth;
if (process.env.PEAK_PAT) {
	const bearer = `Bearer ${process.env.PEAK_PAT}`;
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Authorization: bearer };
	Hauth = { "X-EmDash-Request": "1", Authorization: bearer };
} else {
	const auth = await fetch(`${BASE}/_emdash/api/setup/dev-bypass?token=1`);
	const cookie = (auth.headers.get("set-cookie") || "").split(";")[0];
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Cookie: cookie };
	Hauth = { "X-EmDash-Request": "1", Cookie: cookie };
}

// ── render + read samples off the preview page ──────────────────────────────
const browser = await chromium.launch();
const ctx = await browser.newContext({
	viewport: { width: 1500, height: 1100 },
	deviceScaleFactor: 1,
	javaScriptEnabled: false, // keep Astro-dev's inline scoped styles intact
});
const page = await ctx.newPage();
log("opening /peak-preview …");
await page.goto(`${BASE}/peak-preview`, { waitUntil: "networkidle" });
await page.waitForTimeout(2000); // let remote sample images decode

// All blocks present on the preview page, keyed by schema type.
const present = await page.$$eval("[data-block]", (els) =>
	els.map((el) => {
		const json = el.querySelector("script.peak-sample");
		const parsed = json ? JSON.parse(json.textContent) : null;
		return { type: el.getAttribute("data-block"), node: parsed?.node ?? null };
	}),
);
const typeForName = (n) => "peak." + n.charAt(0).toLowerCase() + n.slice(1);
const targets = wantAll
	? present
	: present.filter((b) => names.map(typeForName).includes(b.type));

if (targets.length === 0) {
	console.error(
		`No matching blocks on the preview page. Asked for: ${names.join(", ") || "(none)"}.\n` +
			`Present: ${present.map((b) => b.type).join(", ") || "(none — does each block have a sample.ts?)"}`,
	);
	await browser.close();
	process.exit(1);
}

const done = [];
for (const blk of targets) {
	const name = blk.type.replace(/^peak\./, "");
	const Name = name.charAt(0).toUpperCase() + name.slice(1);
	const slug = `block-${name}`;
	log(`▶ ${blk.type}`);

	// 1. screenshot just the block (first child of the wrapper, skips padding)
	const shot = await page.locator(`[data-block="${blk.type}"] > :first-child`).screenshot();
	log(`  shot ${shot.length} bytes`);

	// 2. upload thumbnail. Two storage paths:
	//    - S3/R2 with presigned URLs -> upload-url + PUT + confirm
	//    - R2/local "direct upload" (presigned returns 501) -> multipart POST /media
	let mediaId;
	const up = await fetch(`${BASE}/_emdash/api/media/upload-url`, {
		method: "POST",
		headers: Hjson,
		body: JSON.stringify({ filename: `${slug}.png`, contentType: "image/png", size: shot.length }),
	});
	if (up.ok) {
		const d = (await up.json()).data ?? {};
		await fetch(d.uploadUrl, { method: "PUT", headers: d.headers || { "Content-Type": "image/png" }, body: shot });
		await fetch(`${BASE}/_emdash/api/media/${d.mediaId}/confirm`, {
			method: "POST",
			headers: Hjson,
			body: JSON.stringify({ size: shot.length }),
		});
		mediaId = d.mediaId;
	} else {
		const fd = new FormData();
		fd.append("file", new Blob([shot], { type: "image/png" }), `${slug}.png`);
		const dj = await (await fetch(`${BASE}/_emdash/api/media`, { method: "POST", headers: Hauth, body: fd })).json();
		mediaId = dj.data?.item?.id ?? dj.item?.id ?? dj.id;
	}
	if (!mediaId) {
		log(`  ✗ upload failed for ${blk.type}; skipping`);
		continue;
	}
	log(`  uploaded mediaId=${mediaId}`);

	// 3. (re)create the section
	const contentNode = { _type: blk.type, _key: key(), ...(blk.node ?? {}) };
	await fetch(`${BASE}/_emdash/api/sections/${slug}`, { method: "DELETE", headers: Hauth }).catch(() => {});
	const sres = await fetch(`${BASE}/_emdash/api/sections`, {
		method: "POST",
		headers: Hjson,
		body: JSON.stringify({
			slug,
			title: Name,
			description: `${Name} block`,
			content: [contentNode],
			previewMediaId: mediaId,
			source: "user",
		}),
	});
	log(`  section ${sres.status === 201 ? "✓ created" : "✗ " + sres.status} (${slug})`);
	done.push({ name, type: blk.type, node: contentNode });
}

await browser.close();

// ── upsert demo page(s) — one per block family (prefix) ─────────────────────
// e.g. all hero* -> /hero-demo, all services* -> /services-demo. (--demo only
// applies when a single family is processed.)
const groups = {};
for (const d of done) {
	const prefix = d.name.replace(/\d+$/, "").toLowerCase();
	(groups[prefix] ??= []).push(d);
}
const slugFor = (prefix) => (demoSlug && Object.keys(groups).length === 1 ? demoSlug : `demo-${prefix}`);

const pageList = await (await fetch(`${BASE}/_emdash/api/content/pages`, { headers: Hauth })).json();
const existingPages = pageList.data?.items ?? pageList.items ?? [];
const demoPages = []; // slugs we touched, for verification

for (const [prefix, members] of Object.entries(groups)) {
	const pageSlug = slugFor(prefix);
	const pageTitle = `${prefix.charAt(0).toUpperCase() + prefix.slice(1)} Demo`;
	const newNodes = members
		.slice()
		.sort((a, b) => a.name.localeCompare(b.name, undefined, { numeric: true }))
		.map((d) => ({ ...d.node, _key: key() }));
	const existing = existingPages.find((p) => p.slug === pageSlug);
	if (existing) {
		const full = await (
			await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, { headers: Hauth })
		).json();
		const item = full.data?.item ?? full.item;
		const rev = full.data?._rev ?? full._rev ?? item._rev;
		const prev = (item.data?.content ?? []).filter((b) => !members.some((d) => d.type === b._type));
		const content = [...newNodes, ...prev];
		await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, {
			method: "PUT",
			headers: Hjson,
			body: JSON.stringify({ data: { ...item.data, content }, _rev: rev }),
		});
		await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}/publish`, { method: "POST", headers: Hjson, body: "{}" });
		log(`demo page ✓ updated + published /${pageSlug} (${content.length} blocks)`);
	} else {
		const cres = await fetch(`${BASE}/_emdash/api/content/pages`, {
			method: "POST",
			headers: Hjson,
			body: JSON.stringify({ slug: pageSlug, data: { title: pageTitle, content: newNodes } }),
		});
		const cj = await cres.json();
		const id = cj.data?.item?.id ?? cj.item?.id ?? cj.data?.id ?? cj.id;
		if (!id) {
			console.error(`✗ create page failed: ${cres.status} ${JSON.stringify(cj).slice(0, 300)}`);
			process.exit(1);
		}
		await fetch(`${BASE}/_emdash/api/content/pages/${id}/publish`, { method: "POST", headers: Hjson, body: "{}" });
		log(`demo page ✓ created + published /${pageSlug} (${newNodes.length} blocks)`);
	}
	demoPages.push(pageSlug);
}

// ── verify the published page keeps each block's styles WITH JS ON ──────────
// This is the check that was missing when Services1/2 shipped unstyled: the
// JS-disabled thumbnail looked fine while a real browser dropped the CSS.
async function firstClass(Name) {
	// Grab the first scoped class token from the block's compiled style module.
	const css = await (
		await fetch(`${BASE}/src/peak/blocks/${Name}/${Name}.astro?astro&type=style&index=0&lang.css`, {
			headers: { Accept: "text/css" },
		})
	).text();
	const m = css.match(/\.([a-zA-Z0-9_-]+)\[data-astro-cid/);
	return m?.[1] ?? null;
}
// The verify step probes dev-only Vite style URLs, so it only runs locally.
const isLocal = BASE.includes("localhost") || BASE.includes("127.0.0.1");
const vbrowser = isLocal ? await chromium.launch() : null;
const vpage = vbrowser ? await (await vbrowser.newContext({ viewport: { width: 1440, height: 1000 } })).newPage() : null;
let allOk = true;
for (const pageSlug of isLocal ? demoPages : []) {
	await vpage.goto(`${BASE}/${pageSlug}`, { waitUntil: "networkidle" });
	await vpage.waitForTimeout(1500);
	const prefix = pageSlug.replace(/^demo-/, "");
	const members = done.filter((d) => d.name.replace(/\d+$/, "").toLowerCase() === prefix);
	for (const d of members) {
		const Name = d.name.charAt(0).toUpperCase() + d.name.slice(1);
		const cls = await firstClass(Name);
		const styled = cls
			? await vpage.evaluate(
					(c) => [...document.querySelectorAll("style")].some((s) => s.textContent.includes(`.${c}`)),
					cls,
				)
			: false;
		log(`  verify ${d.type}: ${styled ? "✓" : "✗ UNSTYLED"}`);
		if (!styled) allOk = false;
	}
}
if (vbrowser) await vbrowser.close();

log(`done: ${demoPages.map((s) => `${BASE}/${s}`).join("  ")}`);
if (!allOk) {
	console.error(
		"[make-section] ✗ A block is UNSTYLED in a real browser. Edit its .astro (any change) to bust the\n" +
			"               stale Vite transform and re-run, or restart `pnpm dev`. Do NOT trust the thumbnail.",
	);
	process.exit(1);
}
