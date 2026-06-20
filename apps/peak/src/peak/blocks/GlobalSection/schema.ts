import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Global Section — embeds a reusable Section LIVE (like Elementor's Global
 * Widget). Pick a section from the dropdown; the page shows that section's
 * CURRENT content. Edit the section once → every page using this block updates
 * on the next rebuild. (Unlike "Insert Section", which copies a snapshot.)
 */
export const schema = defineBlock({
	type: "peak.globalSection",
	label: "Global Section",
	category: "Global",
	icon: "link",
	description: "Embed a reusable Section live — edit once, updates everywhere",
	fields: {
		// Dynamic dropdown of sections (options loaded from the plugin route).
		section: { type: "select", label: "Section", optionsRoute: "sections" },
	},
});

export type GlobalSectionProps = InferProps<typeof schema>;
