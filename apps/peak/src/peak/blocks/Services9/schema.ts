import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services9 — "Services (Scroll Gallery)". A pinned section whose card row moves
 * horizontally as the page scrolls vertically. Each card stacks an auto number,
 * a label and a full-bleed image. JS drives the scroll-linked translate;
 * reduced-motion / no-JS falls back to a normal horizontal-scroll row.
 */
export const schema = defineBlock({
	type: "peak.services9",
	label: "Services (Scroll Gallery)",
	category: "Sections",
	description: "Pinned section; card row scrolls horizontally as you scroll the page",
	fields: {
		title: { type: "text", label: "Title", default: "What we help with" },
		cards: {
			type: "list",
			label: "Cards",
			itemLabel: "card",
			fields: {
				label: { type: "text", label: "Label", default: "Service" },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt (for SEO)" },
			},
		},
	},
});

export type Services9Props = InferProps<typeof schema>;
