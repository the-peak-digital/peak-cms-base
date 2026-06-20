import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero21 — cinematic intro hero. A white curtain split into three vertical
 * panels shows a centered logo + slogan; the left panel reveals bottom→top, the
 * right panels top→bottom, the logo and slogan separate, divider lines draw in,
 * and the full interior hero loads underneath.
 */
export const schema = defineBlock({
	type: "peak.hero21",
	label: "Hero (Curtain Reveal)",
	category: "Sections",
	description: "3-panel white curtain intro that reveals a full-image hero",
	fields: {
		logo: { type: "text", label: "Logo text", default: "HOUSEMOOD" },
		slogan: { type: "text", label: "Intro slogan", default: "We Craft Interiors" },
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Background alt" },
		address: { type: "multiline", label: "Address", default: "France, Paris\nStr. Believein Yourself 29\nApp. 390" },
		email: { type: "text", label: "Email", default: "hi@housemood.com" },
		phone: { type: "text", label: "Phone", default: "(099) 791-00-75" },
		ctaText: { type: "text", label: "CTA text", default: "Say “Hello”" },
		ctaUrl: { type: "text", label: "CTA URL", default: "/contact" },
		awardYear: { type: "text", label: "Award year", default: "2021" },
		awardText: { type: "text", label: "Award text", default: "Interior Design Awards" },
		eyebrow: { type: "text", label: "Eyebrow", default: "We Craft Interiors" },
		eyebrowSub: { type: "text", label: "Eyebrow sub", default: "Since 2014" },
		links: {
			type: "list",
			label: "Side links",
			itemLabel: "label",
			fields: { label: { type: "text", label: "Label" } },
		},
		title: { type: "multiline", label: "Title", default: "Your House is the Place of" },
		titleAccent: { type: "text", label: "Title accent word", default: "Mood" },
	},
});

export type Hero21Props = InferProps<typeof schema>;
