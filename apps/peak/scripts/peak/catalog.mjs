#!/usr/bin/env node
/**
 * Builds a block catalog for AI tools. Combines each block's schema metadata
 * (type / label / description / category) with its filled sample (read off the
 * /peak-preview page) into one markdown doc. Paste the output into a Claude
 * Project (or any MCP client's instructions) so the assistant knows which Peak
 * blocks exist and the exact JSON shape to put in a page's `content` array when
 * it calls the EmDash MCP `content_create` tool.
 *
 *   node scripts/peak/catalog.mjs > block-catalog.md
 */
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const blocksDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..", "src", "peak", "blocks");

// 1. samples (type -> filled node) from the preview page
const html = await (await fetch(`${BASE}/peak-preview`)).text();
const samples = {};
for (const m of html.matchAll(/<script[^>]*class="peak-sample"[^>]*>(.*?)<\/script>/gs)) {
	try {
		const { type, node } = JSON.parse(m[1]);
		samples[type] = node;
	} catch {}
}

// 2. schema metadata from each blocks/<Name>/schema.ts
const grab = (src, key) => src.match(new RegExp(`${key}:\\s*"((?:[^"\\\\]|\\\\.)*)"`))?.[1];
const meta = {};
for (const name of await readdir(blocksDir)) {
	try {
		const src = await readFile(join(blocksDir, name, "schema.ts"), "utf8");
		const type = grab(src, "type");
		if (type) meta[type] = { label: grab(src, "label"), description: grab(src, "description"), category: grab(src, "category") };
	} catch {}
}

// 3. emit markdown
const lines = [];
lines.push("# Peak block catalog");
lines.push("");
lines.push(
	"These are the page-building blocks available on this site. To build a page, choose the blocks that best fit the brief and put them in the page's `content` array (in order) when calling the EmDash MCP `content_create` tool on the `pages` collection. Each block below shows its `_type` and a complete example object — copy the shape, replace the text/images with content for the brief, and give every block a unique `_key`.",
);
lines.push("");
const order = Object.keys(samples).sort();
for (const type of order) {
	const m = meta[type] ?? {};
	lines.push(`## ${m.label ?? type}  \`${type}\``);
	if (m.description) lines.push(`_${m.description}_ ${m.category ? `(category: ${m.category})` : ""}`);
	lines.push("");
	lines.push("```json");
	lines.push(JSON.stringify({ _type: type, _key: "REPLACE", ...samples[type] }, null, 2));
	lines.push("```");
	lines.push("");
}
lines.push(`_${order.length} blocks._`);
console.log(lines.join("\n"));
