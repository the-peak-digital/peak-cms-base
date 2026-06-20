import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services11 — "Services (Accordion Row)". A header over a row of cards that
 * behave as a horizontal accordion: one card is open (wide — image, number,
 * title, blurb), the rest are collapsed (narrow — number top, title bottom).
 * Hovering/focusing a card opens it (slow width transition) while the previously
 * open one closes. JS-enhanced; no-JS shows the first card open.
 */
export const schema = defineBlock({
	type: "peak.services11",
	label: "Services (Accordion Row)",
	category: "Sections",
	description: "Header + horizontal accordion cards; hover opens one, closes the other",
	fields: {
		badge: { type: "text", label: "Badge", default: "What we do" },
		title: { type: "text", label: "Title", default: "Our services" },
		tagline: {
			type: "multiline",
			label: "Tagline",
			default: "We deliver strategic digital services designed to improve performance, usability, and long-term growth.",
		},
		cards: {
			type: "list",
			label: "Service cards",
			itemLabel: "card",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Short description of this service." },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt" },
			},
		},
	},
});

export type Services11Props = InferProps<typeof schema>;
