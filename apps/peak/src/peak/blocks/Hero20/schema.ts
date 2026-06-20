import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero20 — editorial two-column hero: badge, serif headline, body, two buttons
 * and a star rating on the left; a pair of portrait image cards with a social
 * proof row (avatar stack + client count) on the right.
 */
export const schema = defineBlock({
	type: "peak.hero20",
	label: "Hero (Editorial Split)",
	category: "Sections",
	description: "Serif headline + dual buttons left, twin image cards right",
	fields: {
		badge: { type: "text", label: "Badge", default: "AWARD-WINNING FIRM" },
		title: { type: "multiline", label: "Title", default: "Business growth with expert consultancy" },
		body: { type: "multiline", label: "Body", default: "Achieve sustainable growth through expert insights, tailored solutions, and trusted support." },
		primaryText: { type: "text", label: "Primary button", default: "Get Started" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/contact" },
		secondaryText: { type: "text", label: "Secondary button", default: "Our Services" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/services" },
		rating: { type: "number", label: "Stars (1-5)", default: 5 },
		ratingText: { type: "text", label: "Rating text", default: "Rated by loving Clients" },
		image1: { type: "image", label: "Image 1" },
		image1Alt: { type: "text", label: "Image 1 alt" },
		image2: { type: "image", label: "Image 2" },
		image2Alt: { type: "text", label: "Image 2 alt" },
		clientsAvatars: { type: "imageList", label: "Client avatars" },
		clientsText: { type: "text", label: "Clients text", default: "Join 1,000 + other awesome clients" },
		accent: { type: "text", label: "Accent color", default: "#1f3d2b" },
	},
});

export type Hero20Props = InferProps<typeof schema>;
