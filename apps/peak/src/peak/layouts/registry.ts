/**
 * Layout variant registry — auto-wires header and footer variants the same way
 * blocks/registry.ts wires blocks. Drop a new file in headers/ or footers/ and
 * it becomes selectable; delete it and it's gone. No edits here.
 *
 * Variant key = lowercased file name, e.g. headers/Centered.astro -> "centered".
 */

const headerModules = import.meta.glob<{ default: unknown }>("./headers/*.astro", { eager: true });
const footerModules = import.meta.glob<{ default: unknown }>("./footers/*.astro", { eager: true });

/** "./headers/Centered.astro" -> "centered" */
function variantKey(path: string): string {
	return (path.split("/").pop() ?? "").replace(/\.astro$/, "").toLowerCase();
}

function build(mods: Record<string, { default: unknown }>): Record<string, unknown> {
	const out: Record<string, unknown> = {};
	for (const [path, mod] of Object.entries(mods)) out[variantKey(path)] = mod.default;
	return out;
}

export const headers = build(headerModules);
export const footers = build(footerModules);

/** Variant names for building the per-page selector field options. */
export const headerNames = Object.keys(headers).sort();
export const footerNames = Object.keys(footers).sort();
