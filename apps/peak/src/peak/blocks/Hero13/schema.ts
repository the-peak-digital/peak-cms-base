import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero13 — full-image hero with a signature entrance: a small centered square
 * expands to full-bleed, then the headline, buttons, social proof, and a
 * floating case-study card fade in.
 */
export const schema = defineBlock({
	type: "peak.hero13",
	label: "Hero (Image Expand)",
	category: "Sections",
	description: "Image expands from a center square on load, then content fades in",
	fields: {
		title: { type: "multiline", label: "Title", default: "Your growth partner for companies ready to scale." },
		body: { type: "multiline", label: "Body", default: "Kora helps leadership teams gain clarity and build systems that scale." },
		primaryText: { type: "text", label: "Primary button", default: "Our Services" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/services" },
		secondaryText: { type: "text", label: "Secondary link", default: "Pricing" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/pricing" },
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		avatars: { type: "imageList", label: "Trusted-by avatars" },
		trustText: { type: "text", label: "Trust text", default: "Trusted by 50+ companies" },
		logos: { type: "imageList", label: "Company logos" },
		cardLabel: { type: "text", label: "Card label", default: "New Case Study" },
		cardText: { type: "multiline", label: "Card text", default: "How Sitemark broke through an $18M plateau and grew 47% in six months." },
		cardImage: { type: "image", label: "Card image" },
		cardStat: { type: "text", label: "Card stat", default: "47%" },
		cardStatLabel: { type: "text", label: "Card stat label", default: "Revenue growth in 6 months" },
		cardUrl: { type: "text", label: "Card URL", default: "/case-studies" },
		accent: { type: "text", label: "Button color", default: "#5fc99a" },
	},
});

export type Hero13Props = InferProps<typeof schema>;
