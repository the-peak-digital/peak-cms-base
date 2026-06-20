import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero — "bento" hero: eyebrow + two-line headline (with italic emphasis), body,
 * CTA, avatar/rating social proof, and a 4-cell media+stat collage on the right.
 */
export const schema = defineBlock({
	type: "peak.hero",
	label: "Hero (Bento)",
	category: "Sections",
	description: "Hero with headline, CTA, social proof, and a 4-cell image/stat collage",
	fields: {
		eyebrow: { type: "text", label: "Eyebrow", default: "TRY IT NOW!" },
		title: { type: "text", label: "Title", default: "Instant Payment with" },
		titleEmphasis: { type: "text", label: "Title (italic emphasis)", default: "Open Banking" },
		body: { type: "multiline", label: "Body" },
		buttonText: { type: "text", label: "Button text", default: "Get demo account" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		avatars: { type: "imageList", label: "Reviewer avatars" },
		rating: { type: "text", label: "Rating", default: "4.8" },
		reviewsText: { type: "text", label: "Reviews text", default: "from 500+ reviews" },
		reviewsUrl: { type: "text", label: "Reviews URL" },
		// Collage: top-left image, stat pill, amount pill, bottom-right image
		image1: { type: "image", label: "Image 1 (top-left)" },
		image1Alt: { type: "text", label: "Image 1 alt" },
		statTitle: { type: "text", label: "Stat title", default: "Successful Transaction" },
		statDate: { type: "text", label: "Stat date", default: "Date: Mar 20, 2024" },
		amount: { type: "text", label: "Amount", default: "$25,000" },
		amountLabel: { type: "text", label: "Amount label", default: "Sent to Jack" },
		amountAvatar: { type: "image", label: "Amount avatar" },
		image2: { type: "image", label: "Image 2 (bottom-right)" },
		image2Alt: { type: "text", label: "Image 2 alt" },
	},
});

export type HeroProps = InferProps<typeof schema>;
