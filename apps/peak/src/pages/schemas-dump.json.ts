import type { APIRoute } from "astro";

// Dev-only: dumps every block's defineBlock field definitions so the sample
// generator (scripts/peak/gen-samples.mjs) can synthesize a sample.ts per block.
const schemas = import.meta.glob("../peak/blocks/*/schema.ts", { eager: true }) as Record<
	string,
	{ schema?: { type: string; config: { fields: Record<string, unknown> } } }
>;

export const GET: APIRoute = () => {
	const out: Array<{ name: string; type: string; fields: Record<string, unknown> }> = [];
	for (const [path, mod] of Object.entries(schemas)) {
		const name = path.split("/").slice(-2)[0]; // ".../<Name>/schema.ts" -> <Name>
		const s = mod.schema;
		if (s) out.push({ name, type: s.type, fields: s.config.fields });
	}
	return new Response(JSON.stringify(out), { headers: { "Content-Type": "application/json" } });
};
