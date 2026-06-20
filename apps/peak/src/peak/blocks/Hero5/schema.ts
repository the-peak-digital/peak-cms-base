import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero5 — split hero: serif headline + dual CTAs + a bordered stat callout on
 * the left; a framed image with an overlay button on the right.
 */
export const schema = defineBlock({
	type: "peak.hero5",
	label: "Hero (Stat Box)",
	category: "Sections",
	description: "Serif headline with a stat callout box and a framed image + overlay button",
	fields: {
		title: { type: "multiline", label: "Title", default: "Take your Business to the next level" },
		body: { type: "multiline", label: "Body" },
		primaryText: { type: "text", label: "Primary button", default: "Let's Discuss Your Project" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/contact" },
		secondaryText: { type: "text", label: "Secondary link", default: "See My Previous Work" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/portfolio" },
		statValue: { type: "text", label: "Stat value", default: "150+" },
		statText: { type: "multiline", label: "Stat text", default: "Satisfied clients all over the world." },
		image: { type: "image", label: "Image" },
		imageAlt: { type: "text", label: "Image alt" },
		overlayText: { type: "text", label: "Overlay button text", default: "Let's Book Your Day" },
		overlayUrl: { type: "text", label: "Overlay button URL", default: "/book" },
	},
});

export type Hero5Props = InferProps<typeof schema>;
