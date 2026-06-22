import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero29 — centered hero on a light band: eyebrow, big title, subtitle with a
 * highlighted phone number, a social-proof row (overlapping avatars + star rating
 * + reviews count), and a 3-image gallery on a rounded card below.
 */
export const schema = defineBlock({
	type: "peak.hero29",
	label: "Hero (Reviews + Gallery)",
	category: "Sections",
	description: "Centered hero with eyebrow, title, phone, avatar/stars social proof, and a 3-image gallery",
	fields: {
		eyebrow: { type: "text", label: "Eyebrow", default: "Best Price Guaranteed!" },
		title: { type: "multiline", label: "Title", default: "Sell Gold Jewelry with Cash for Gold Nova." },
		subtitle: {
			type: "multiline",
			label: "Subtitle (phone appended after)",
			default:
				"A trusted expert who turns your unwanted jewelry and precious metals into instant cash with ease and honesty. If you're ready to turn your gold into cash, give us a call now at",
		},
		phone: { type: "text", label: "Phone (highlighted)", default: "(571) 332-1249" },
		avatars: { type: "imageList", label: "Reviewer avatars" },
		stars: { type: "number", label: "Stars (0–5)", default: 5 },
		reviewsText: { type: "text", label: "Reviews text", default: "459 Google Reviews" },
		images: { type: "imageList", label: "Gallery images (3)" },
		accent: { type: "text", label: "Phone accent color", default: "#e8794a" },
	},
});

export type Hero29Props = InferProps<typeof schema>;
