/**
 * Peak blocks plugin — registers every Peak block with the Emdash admin so
 * editors can insert and edit them in the Portable Text editor.
 *
 * This is a trusted, in-repo plugin declared in astro.config.mjs. Its block
 * list comes straight from the auto-wiring registry, so adding a block folder
 * is all it takes — this file never changes.
 */

import { definePlugin, getSections } from "emdash";
import type { PluginDefinition } from "emdash";
import { portableTextBlocks } from "../blocks/registry";

const definition: PluginDefinition = {
	id: "peak-blocks",
	version: "0.1.0",
	admin: {
		portableTextBlocks,
	},
	// Powers the Global Section block's section dropdown. The admin POSTs to
	// /_emdash/api/plugins/peak-blocks/sections and reads data.items.
	routes: {
		sections: {
			handler: async () => {
				const result = await getSections({ limit: 100 });
				return { items: result.items.map((s) => ({ id: s.slug, name: s.title })) };
			},
		},
	},
};

// Emdash's plugin loader calls createPlugin() from the entrypoint (native
// plugin format). Export it (and default) wrapping the definition.
export function createPlugin() {
	return definePlugin(definition);
}

export default createPlugin;
