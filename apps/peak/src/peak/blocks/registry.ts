/**
 * Block registry — auto-wiring.
 *
 * Discovers every block under blocks/<Name>/ at build time using Vite's
 * import.meta.glob, then emits the two things the rest of the system needs:
 *
 *   - portableTextBlocks : the admin editor schema (consumed by cms/plugin.ts)
 *   - blockComponents    : the type -> Astro component render map
 *                          (consumed by renderer/PeakRenderer.astro)
 *
 * Adding a block = creating its folder. No edits here, ever. A block folder
 * must contain:
 *   - schema.ts          exporting `schema` (a defineBlock(...) result)
 *   - <Name>.astro       default-exporting the renderer component
 */

import type { PeakBlock } from "./defineBlock";

// Eagerly import all block schemas and components. Keyed by module path,
// e.g. "./Hero/schema.ts" and "./Hero/Hero.astro".
const schemaModules = import.meta.glob<{ schema: PeakBlock }>("./*/schema.ts", {
	eager: true,
});
const componentModules = import.meta.glob<{ default: unknown }>("./*/[A-Z]*.astro", {
	eager: true,
});

/** "./Hero/schema.ts" -> "Hero" */
function folderOf(path: string): string {
	return path.split("/")[1] ?? "";
}

const componentByFolder: Record<string, unknown> = {};
for (const [path, mod] of Object.entries(componentModules)) {
	componentByFolder[folderOf(path)] = mod.default;
}

export const blocks: PeakBlock[] = [];
export const blockComponents: Record<string, unknown> = {};

for (const [path, mod] of Object.entries(schemaModules)) {
	const schema = mod.schema;
	if (!schema) continue;
	blocks.push(schema);
	const component = componentByFolder[folderOf(path)];
	if (component) blockComponents[schema.type] = component;
}

/** Admin editor schema for cms/plugin.ts. */
export const portableTextBlocks = blocks.map((b) => b.toPortableTextBlock());
