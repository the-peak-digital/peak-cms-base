import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero6 — centered cover hero: full-bleed background image + dark overlay with
 * centered eyebrow, big headline, subtitle, and two colored buttons.
 */
export const schema = defineBlock({
	type: "peak.hero6",
	label: "Hero (Centered)",
	category: "Sections",
	description: "Centered headline over a full background image with two buttons",
	fields: {
		eyebrow: { type: "text", label: "Eyebrow", default: "WE'RE YOUR TRANSFORMATIVE" },
		title: { type: "multiline", label: "Title", default: "Seattle Digital Marketing Agency" },
		body: { type: "text", label: "Subtitle", default: "Website Design & Digital Marketing Designed to Attract / Built to Convert." },
		primaryText: { type: "text", label: "Button 1 text", default: "How We Help" },
		primaryUrl: { type: "text", label: "Button 1 URL", default: "/services" },
		secondaryText: { type: "text", label: "Button 2 text", default: "See Some Proof" },
		secondaryUrl: { type: "text", label: "Button 2 URL", default: "/work" },
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		uppercase: { type: "toggle", label: "Uppercase headline", default: true },
	},
});

export type Hero6Props = InferProps<typeof schema>;
