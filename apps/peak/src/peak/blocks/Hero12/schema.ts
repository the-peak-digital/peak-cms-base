import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero12 — full-bleed image hero with content anchored at the BOTTOM: a large
 * headline bottom-left, a pill CTA with a circular arrow, and a bottom-right tagline.
 */
export const schema = defineBlock({
	type: "peak.hero12",
	label: "Hero (Bottom)",
	category: "Sections",
	description: "Full image with bottom-anchored headline, pill CTA, and corner tagline",
	fields: {
		title: { type: "multiline", label: "Title", default: "Powering future with clean sunlight" },
		buttonText: { type: "text", label: "Button text", default: "Start the change with us" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		tagline: { type: "multiline", label: "Corner tagline", default: "Shaping the future of renewable energy" },
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		accent: { type: "text", label: "Accent color", default: "#f4e000" },
	},
});

export type Hero12Props = InferProps<typeof schema>;
