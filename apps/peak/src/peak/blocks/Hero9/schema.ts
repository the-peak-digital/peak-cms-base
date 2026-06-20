import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero9 — video-background hero with a hover reveal: a white panel sweeps in
 * left→right over the left side and the text inverts from light to dark.
 */
export const schema = defineBlock({
	type: "peak.hero9",
	label: "Hero (Video)",
	category: "Sections",
	description: "Video background with a left-to-right white hover reveal",
	fields: {
		videoUrl: { type: "text", label: "Video URL (mp4)" },
		poster: { type: "image", label: "Poster / fallback image" },
		posterAlt: { type: "text", label: "Poster alt" },
		title: { type: "multiline", label: "Title", default: "Experienced Home Remodeling in San Diego" },
		subtitle: { type: "multiline", label: "Subtitle", default: "From concept to completion, we bring your vision to life with precision, creativity, and a commitment you can count on." },
		primaryText: { type: "text", label: "Primary button", default: "Book a Complimentary Consultation" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/contact" },
		secondaryText: { type: "text", label: "Secondary link", default: "Learn more about what we do" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/about" },
		footerText: { type: "text", label: "Footer text", default: "Trust Shapes Every Space." },
	},
});

export type Hero9Props = InferProps<typeof schema>;
