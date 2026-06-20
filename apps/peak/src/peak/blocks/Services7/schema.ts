import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services7 — "Services (Numbered Image Cards)". A centered heading over a 3-up
 * grid of soft cards. Each card stacks an auto number, a bold title, a short
 * blurb and a large rounded image at the bottom.
 */
export const schema = defineBlock({
	type: "peak.services7",
	label: "Services (Numbered Image Cards)",
	category: "Sections",
	description: "Centered heading + numbered cards with title, blurb and bottom image",
	fields: {
		title: { type: "text", label: "Title", default: "What I Can Do for You" },
		cards: {
			type: "list",
			label: "Cards",
			itemLabel: "card",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Short description of this service." },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt (for SEO)" },
			},
		},
		cardColor: { type: "text", label: "Card color", default: "#fbf9f6" },
	},
});

export type Services7Props = InferProps<typeof schema>;
