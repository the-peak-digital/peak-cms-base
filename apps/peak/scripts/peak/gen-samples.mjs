#!/usr/bin/env node
/**
 * Generates a sample.ts for every block that lacks one, by reading the block's
 * real field definitions from /schemas-dump.json and synthesizing sensible
 * per-field values. This brings older blocks (the heroes) into the preview /
 * make-section / catalog machine so the whole library is visible.
 *
 *   node scripts/peak/gen-samples.mjs            # only blocks missing sample.ts
 *   node scripts/peak/gen-samples.mjs --force    # overwrite all
 *
 * Requires `pnpm dev` running. Values are reasonable placeholders — defaults
 * from the schema when present, picsum images, a couple of list items.
 */
import { readFile, writeFile, access } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const force = process.argv.includes("--force");
const blocksDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "src", "peak", "blocks");
const img = (seed, w = 800, h = 700) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
const exists = async (p) => access(p).then(() => true).catch(() => false);

// Synthesize a value for one field definition.
function valueFor(name, f, seedKey, depth = 0) {
	if (f.default !== undefined) return f.default;
	const label = f.label || name;
	switch (f.type) {
		case "text":
			if (/url|href|link/i.test(name)) return "#";
			if (/alt/i.test(name)) return label;
			return label;
		case "multiline":
			return `${label} — a short line of descriptive copy that shows how this block reads with real content.`;
		case "number":
			return /rating|star/i.test(name) ? 5 : 4;
		case "toggle":
			return false;
		case "select":
			return f.options?.[0]?.value ?? "";
		case "image":
			return img(`${seedKey}-${name}`);
		case "imageList":
			return [1, 2, 3].map((i) => ({ url: img(`${seedKey}-${name}-${i}`, 120, 120), alt: `${label} ${i}` }));
		case "list": {
			if (depth > 0) return [];
			const sub = f.fields ?? {};
			return [1, 2, 3].map((i) => {
				const item = {};
				for (const [k, sf] of Object.entries(sub)) item[k] = valueFor(k, sf, `${seedKey}-${name}-${i}`, depth + 1);
				return item;
			});
		}
		default:
			return label;
	}
}

const blocks = await (await fetch(`${BASE}/schemas-dump.json`)).json();
let made = 0;
for (const { name, type, fields } of blocks) {
	const file = join(blocksDir, name, "sample.ts");
	if (!force && (await exists(file))) continue;
	const node = {};
	for (const [k, f] of Object.entries(fields)) node[k] = valueFor(k, f, name.toLowerCase());
	const body =
		`import type { ${name}Props } from "./schema";\n\n` +
		`/** Auto-generated demo content (gen-samples.mjs). Edit freely. */\n` +
		`export const sample: ${name}Props = ${JSON.stringify(node, null, 2)};\n`;
	await writeFile(file, body);
	console.log(`+ ${name}/sample.ts  (${type})`);
	made++;
}
console.log(`done — ${made} sample.ts written`);
