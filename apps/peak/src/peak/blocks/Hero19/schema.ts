import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero19 — full-bleed media hero with a looping background video under a light
 * frosted overlay. Content is anchored to the bottom: a rating pill + headline
 * on the left, body copy + button on the right.
 */
export const schema = defineBlock({
	type: "peak.hero19",
	label: "Hero (Frosted Video)",
	category: "Sections",
	description: "Frosted background video with bottom-anchored headline and CTA",
	fields: {
		videoUrl: { type: "text", label: "Background video URL (mp4)" },
		poster: { type: "image", label: "Poster / fallback image" },
		posterAlt: { type: "text", label: "Poster alt" },
		rating: { type: "text", label: "Rating", default: "4.7" },
		ratingText: { type: "text", label: "Rating text", default: "Rated by Satisfied Clients" },
		avatars: { type: "imageList", label: "Rating avatars" },
		title: { type: "multiline", label: "Title", default: "Deserve to Feel Better. Your Peace Begins Here." },
		body: { type: "multiline", label: "Body", default: "Compassionate, personalized mental health support to help you confidently navigate life's everyday challenges." },
		buttonText: { type: "text", label: "Button text", default: "Explore Services" },
		buttonUrl: { type: "text", label: "Button URL", default: "/services" },
	},
});

export type Hero19Props = InferProps<typeof schema>;
