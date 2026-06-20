import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero22 — full-image hero with left marketing copy + a right-side review widget:
 * a video testimonial card and a Google-style review card (reviewer, stars,
 * quote, thumbnail) with carousel arrows.
 */
export const schema = defineBlock({
	type: "peak.hero22",
	label: "Hero (Review Spotlight)",
	category: "Sections",
	description: "Full-image hero with a video + Google review widget",
	fields: {
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Background alt" },
		eyebrow: { type: "text", label: "Eyebrow", default: "Top Countertop Supplier in VA, MD, and DC" },
		title: { type: "multiline", label: "Title", default: "Engineered and Natural Stones Start with Free VR 3D Design" },
		subtitle: { type: "text", label: "Subtitle", default: "Price starts @ as low as $34.99 per sq. ft!" },
		primaryText: { type: "text", label: "Primary button", default: "Request Quick Quote" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/quote" },
		secondaryText: { type: "text", label: "Secondary link", default: "View Our Stone Collection" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/collection" },
		videoImage: { type: "image", label: "Video poster" },
		videoUrl: { type: "text", label: "Video URL" },
		reviewerName: { type: "text", label: "Reviewer name", default: "April Shaw" },
		reviewerDate: { type: "text", label: "Reviewer date", default: "3 May 2026" },
		reviewerAvatar: { type: "image", label: "Reviewer avatar" },
		rating: { type: "number", label: "Stars (1-5)", default: 5 },
		reviewText: { type: "multiline", label: "Review text", default: "We had a great experience with this company from start to finish. The kitchen countertop turned out beautiful and..." },
		reviewImage: { type: "image", label: "Review thumbnail" },
		reviewUrl: { type: "text", label: "Read more URL", default: "/reviews" },
	},
});

export type Hero22Props = InferProps<typeof schema>;
