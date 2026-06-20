import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero2 — split hero: cream text panel (headline with inline avatars + italic
 * emphasis, body, price CTA, partners row) beside a full-bleed image with a
 * floating "question" card.
 */
export const schema = defineBlock({
	type: "peak.hero2",
	label: "Hero (Split)",
	category: "Sections",
	description: "Split hero with inline-avatar headline, price CTA, and image card",
	fields: {
		titlePart1: { type: "text", label: "Title line 1", default: "Where every act of kindness" },
		avatar1: { type: "image", label: "Inline avatar 1" },
		titlePart2: { type: "text", label: "Title line 2", default: "brings guid by" },
		avatar2: { type: "image", label: "Inline avatar 2" },
		emphasis: { type: "text", label: "Italic emphasis word", default: "councillor" },
		body: { type: "multiline", label: "Body" },
		buttonText: { type: "text", label: "Button text", default: "Only $9.99/m" },
		buttonUrl: { type: "text", label: "Button URL", default: "/pricing" },
		secondaryText: { type: "text", label: "Secondary link text", default: "All therapists" },
		secondaryUrl: { type: "text", label: "Secondary link URL", default: "/therapists" },
		image: { type: "image", label: "Main image" },
		imageAlt: { type: "text", label: "Main image alt" },
		partnersText: { type: "multiline", label: "Partners blurb" },
		partners: { type: "imageList", label: "Partner logos" },
		partnersLinkText: { type: "text", label: "Partners link text", default: "View all partners" },
		partnersLinkUrl: { type: "text", label: "Partners link URL", default: "/partners" },
		cardTitle: { type: "text", label: "Card title", default: "Question Aa." },
		cardText: {
			type: "multiline",
			label: "Card text",
			default: "Are you uncomfortable discussing anything from past events now with me?",
		},
		cardImages: { type: "imageList", label: "Card thumbnails" },
		cardCount: { type: "text", label: "Card count", default: "1/4" },
	},
});

export type Hero2Props = InferProps<typeof schema>;
