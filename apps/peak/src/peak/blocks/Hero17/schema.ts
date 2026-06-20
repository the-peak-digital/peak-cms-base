import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero17 — dark split hero with a scripted intro: the right-hand image wipes in,
 * the headline types itself out, then the remaining elements (badge, body,
 * button, testimonial card) zoom in.
 */
export const schema = defineBlock({
	type: "peak.hero17",
	label: "Hero (Type Reveal)",
	category: "Sections",
	description: "Image wipes in, headline types out, elements zoom in",
	fields: {
		badge: { type: "text", label: "Badge", default: "Available for work" },
		title: { type: "multiline", label: "Title", default: "Your trusted partner for quality home improvement" },
		body: { type: "multiline", label: "Body", default: "Refit delivers expert home improvements, creating beautiful and functional spaces with quality craftsmanship." },
		buttonText: { type: "text", label: "Button text", default: "Work with us" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		image: { type: "image", label: "Image" },
		imageAlt: { type: "text", label: "Image alt" },
		rating: { type: "number", label: "Stars (1-5)", default: 5 },
		quote: { type: "multiline", label: "Testimonial quote", default: "Refit has been a game changer for my home. Their ability to blend function with exquisite design is unparalleled." },
	},
});

export type Hero17Props = InferProps<typeof schema>;
