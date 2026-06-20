import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero4 — full-bleed cover hero: a background image with overlaid headline,
 * body, a button, and a row of stats. Named for its layout (cover/overlay).
 */
export const schema = defineBlock({
	type: "peak.hero4",
	label: "Hero (Cover)",
	category: "Sections",
	description: "Full-image background with overlaid headline, button, and stats",
	fields: {
		title: { type: "multiline", label: "Title", default: "Transform Your Space, Transform Your Life" },
		body: { type: "multiline", label: "Body" },
		buttonText: { type: "text", label: "Button text", default: "Schedule a Consultation" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		stats: {
			type: "list",
			label: "Stats",
			itemLabel: "stat",
			fields: {
				value: { type: "text", label: "Value" },
				label: { type: "text", label: "Label" },
			},
		},
	},
});

export type Hero4Props = InferProps<typeof schema>;
