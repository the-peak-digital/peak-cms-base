import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero28 — full-bleed image hero with a left content column (eyebrow, big title,
 * highlighted offer line, two CTAs), a row of feature blurbs along the bottom,
 * and a vertical social-icon rail on the right.
 */
export const schema = defineBlock({
	type: "peak.hero28",
	label: "Hero (Feature Rail)",
	category: "Sections",
	description: "Full-image hero with eyebrow, title, offer line, two CTAs, feature blurbs and a social rail",
	fields: {
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		eyebrow: { type: "text", label: "Eyebrow", default: "PREMIUM SELECTION OF COUNTERTOPS" },
		title: {
			type: "multiline",
			label: "Title",
			default: "Virginia Beach's Premier Countertop Destination",
		},
		offer: {
			type: "text",
			label: "Offer line",
			default: "Exclusive Virginia Offer: Up to 40% OFF Countertops & Installation",
		},
		button1Text: { type: "text", label: "Primary button text", default: "Schedule Appointment" },
		button1Url: { type: "text", label: "Primary button URL", default: "/book" },
		button2Text: { type: "text", label: "Secondary button text", default: "View Our Stone Collection" },
		button2Url: { type: "text", label: "Secondary button URL", default: "/collection" },
		features: {
			type: "list",
			label: "Feature blurbs",
			itemLabel: "feature",
			fields: {
				icon: { type: "text", label: "Icon (emoji)" },
				title: { type: "text", label: "Title" },
				text: { type: "multiline", label: "Text" },
			},
		},
		socials: {
			type: "list",
			label: "Social links",
			itemLabel: "social",
			fields: {
				icon: { type: "text", label: "Icon (emoji / letter)" },
				url: { type: "text", label: "URL" },
			},
		},
	},
});

export type Hero28Props = InferProps<typeof schema>;
