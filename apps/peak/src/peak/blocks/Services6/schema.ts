import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services6 — "Services (Sticky Showcase)". A sticky left intro (badge, big
 * heading, blurb, CTA) that stays pinned while a 2-up grid of image cards on the
 * right scrolls past it. Each card is an image + a caption row (label + arrow).
 * Holds up to ~10 cards (5 rows). Sticky is pure CSS — no JS.
 */
export const schema = defineBlock({
	type: "peak.services6",
	label: "Services (Sticky Showcase)",
	category: "Sections",
	description: "Sticky left intro + scrolling right grid of image cards (up to 10)",
	fields: {
		badge: { type: "text", label: "Badge label", default: "Smile Success Stories" },
		title: { type: "text", label: "Title", default: "Where Healthy Smiles Begin" },
		description: {
			type: "multiline",
			label: "Description",
			default:
				"Cosmetic dentistry is gaining popularity as people seek confident, beautiful smiles. Procedures like teeth whitening, veneers, and digital smile design are now more accessible.",
		},
		buttonText: { type: "text", label: "Button text", default: "Explore More Cases" },
		buttonUrl: { type: "text", label: "Button URL", default: "/cases" },
		cards: {
			type: "list",
			label: "Cards (up to 10)",
			itemLabel: "card",
			fields: {
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt (for SEO)" },
				label: { type: "text", label: "Label" },
				url: { type: "text", label: "Link URL" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#16a6da" },
	},
});

export type Services6Props = InferProps<typeof schema>;
