import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero25 — full-bleed hero with a looping VIDEO background, a light overlay, and
 * centered content: headline, subtitle, star rating, and two CTA buttons.
 * Falls back to the poster image when no video URL is set (or while it loads).
 */
export const schema = defineBlock({
	type: "peak.hero25",
	label: "Hero (Video)",
	category: "Sections",
	description: "Full-width video-background hero with centered headline, star rating, and two CTAs",
	fields: {
		title: {
			type: "multiline",
			label: "Title",
			default: "Affordable & Trusted Cleaning Services in Northern VA, DC & MD",
		},
		subtitle: {
			type: "text",
			label: "Subtitle",
			default: "20+ Years in Business with Well-Paid & Professional Maids",
		},
		stars: { type: "number", label: "Star rating (0–5)", default: 5 },
		reviewsText: { type: "text", label: "Reviews text", default: "2000+ Reviews" },
		button1Text: { type: "text", label: "Primary button text", default: "Get a Price" },
		button1Url: { type: "text", label: "Primary button URL", default: "/quote" },
		button2Text: { type: "text", label: "Secondary button text", default: "Book Your Cleaning" },
		button2Url: { type: "text", label: "Secondary button URL", default: "/book" },
		videoUrl: { type: "text", label: "Background video URL (mp4)", default: "" },
		poster: { type: "image", label: "Poster / fallback image" },
		posterAlt: { type: "text", label: "Poster alt" },
		accent: { type: "text", label: "Primary button color", default: "#f43f5e" },
	},
});

export type Hero25Props = InferProps<typeof schema>;
