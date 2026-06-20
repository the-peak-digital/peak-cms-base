import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero24 — promo hero with a full-width trust/feature bar on top, then a split
 * layout: a serif promo headline, offer line, button and rating on the left, and
 * a large image on the right.
 */
export const schema = defineBlock({
	type: "peak.hero24",
	label: "Hero (Promo Split)",
	category: "Sections",
	description: "Top trust bar + serif promo headline left, image right",
	fields: {
		features: {
			type: "list",
			label: "Trust bar features",
			itemLabel: "label",
			fields: { label: { type: "text", label: "Label" } },
		},
		titleTop: { type: "text", label: "Title (top)", default: "Summer" },
		titleEmphasis: { type: "text", label: "Title (emphasis)", default: "Sale" },
		offer: { type: "text", label: "Offer line", default: "20% OFF ALL KITCHENS" },
		buttonText: { type: "text", label: "Button text", default: "Request Appointment" },
		buttonUrl: { type: "text", label: "Button URL", default: "/appointment" },
		ratingText: { type: "text", label: "Rating text", default: "Rated EXCELLENT on Trustindex" },
		rating: { type: "number", label: "Stars (1-5)", default: 5 },
		image: { type: "image", label: "Image" },
		imageAlt: { type: "text", label: "Image alt" },
		bg: { type: "text", label: "Background color", default: "#f6ece0" },
		accent: { type: "text", label: "Button color", default: "#1e2a5a" },
	},
});

export type Hero24Props = InferProps<typeof schema>;
