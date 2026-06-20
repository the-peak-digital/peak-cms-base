#!/usr/bin/env node
/**
 * Peak block generator.
 *
 *   node scripts/peak/new-block.mjs Hero "Local SEO"
 *   node scripts/peak/new-block.mjs ServicesGrid "Sections"
 *
 * Scaffolds src/peak/blocks/<Name>/{schema.ts, <Name>.astro, defaults.ts}.
 * The registry auto-discovers it — no other file needs editing. Fill in the
 * fields in schema.ts and the markup in <Name>.astro, and you have a block.
 */

import { mkdir, writeFile, access } from "node:fs/promises";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const blocksDir = join(__dirname, "..", "..", "src", "peak", "blocks");

const rawName = process.argv[2];
const category = process.argv[3] ?? "Sections";
if (!rawName) {
	console.error("Usage: node scripts/peak/new-block.mjs <PascalName> [category]");
	process.exit(1);
}

// Normalize to PascalCase folder/component name and a peak.<camel> type.
const Name = rawName.replace(/(^\w|[-_\s]\w)/g, (m) => m.replace(/[-_\s]/, "").toUpperCase());
const typeKey = "peak." + Name.charAt(0).toLowerCase() + Name.slice(1);
const label = Name.replace(/([a-z])([A-Z])/g, "$1 $2");

const dir = join(blocksDir, Name);

const schemaTs = `import { defineBlock, type InferProps } from "../defineBlock";

export const schema = defineBlock({
	type: "${typeKey}",
	label: "${label}",
	category: "${category}",
	description: "TODO: describe ${label}",
	fields: {
		title: { type: "text", label: "Title" },
		// Add fields here. Each becomes both an editor input and a typed prop.
		// Types: "text" | "multiline" | "number" | "toggle" | "select".
	},
});

export type ${Name}Props = InferProps<typeof schema>;
`;

const astro = `---
import type { ${Name}Props } from "./schema";
import PeakSection from "../PeakSection.astro";

const node = (Astro.props.node ?? {}) as ${Name}Props;
const { title } = node;
---

<!-- PeakSection applies the block's Width + Text size. For a full-width colored
     band, set width to "Full background" in the admin and pass background="...". -->
<PeakSection node={node}>
	<div class="peak-${Name.toLowerCase()}">
		{title && <h2 class="peak-${Name.toLowerCase()}__title">{title}</h2>}
		<!-- TODO: render ${label} -->
	</div>
</PeakSection>

<style>
	.peak-${Name.toLowerCase()} {
		padding-block: var(--peak-space-2xl, 4rem);
	}
	/* Multiply text sizes by --peak-font-scale so the block's "Text size"
	   field makes text bigger/smaller. */
	.peak-${Name.toLowerCase()}__title {
		font-size: calc(2rem * var(--peak-font-scale, 1));
	}
</style>
`;

const defaultsTs = `import { schema } from "./schema";

export const defaults = schema.defaults();
`;

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

if (await exists(dir)) {
	console.error(`Block already exists: src/peak/blocks/${Name}/`);
	process.exit(1);
}

await mkdir(dir, { recursive: true });
await writeFile(join(dir, "schema.ts"), schemaTs);
await writeFile(join(dir, `${Name}.astro`), astro);
await writeFile(join(dir, "defaults.ts"), defaultsTs);

console.log(`Created src/peak/blocks/${Name}/ (type "${typeKey}")`);
console.log("  - schema.ts    fill in fields");
console.log(`  - ${Name}.astro  fill in markup`);
console.log("  - defaults.ts  (derived; no edits needed)");
console.log("Registry auto-discovers it. Nothing else to wire.");
