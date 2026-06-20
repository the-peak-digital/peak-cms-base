import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services1 — "Services (Card Row)". A cream editorial panel: pill badge + large
 * serif headline on the left, supporting copy + a pill CTA on the right, then a
 * full row of tall image cards. Each card has a frosted arrow button top-right
 * and its label over a bottom gradient. Built to scale from 3–6 cards.
 */
export const schema = defineBlock({
	type: "peak.services1",
	label: "Services (Card Row)",
	category: "Sections",
	description: "Serif headline + supporting copy, then a row of tall image cards",
	fields: {
		badge: { type: "text", label: "Badge label", default: "Our services" },
		title: { type: "text", label: "Title", default: "What we can do for you" },
		description: {
			type: "multiline",
			label: "Description",
			default: "From design to installation, we provide quality fence solutions tailored to your needs.",
		},
		buttonText: { type: "text", label: "Button text", default: "See our services" },
		buttonUrl: { type: "text", label: "Button URL", default: "/services" },
		cards: {
			type: "list",
			label: "Service cards",
			itemLabel: "card",
			fields: {
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt (for SEO)" },
				label: { type: "text", label: "Label" },
				url: { type: "text", label: "Link URL" },
			},
		},
		bg: { type: "text", label: "Panel background", default: "#ece3d6" },
		accent: { type: "text", label: "Button color", default: "#1c1b19" },
	},
});

export type Services1Props = InferProps<typeof schema>;
