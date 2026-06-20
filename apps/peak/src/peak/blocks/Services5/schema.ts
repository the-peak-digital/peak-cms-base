import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services5 — "Services (Numbered Panels)". A condensed headline + intro, then a
 * 2-up grid of light panels. Each panel has a big auto number, a tagline, and a
 * dark inner card with a title, a pill badge, a blurb and an accent CTA.
 */
export const schema = defineBlock({
	type: "peak.services5",
	label: "Services (Numbered Panels)",
	category: "Sections",
	description: "Numbered light panels with dark inner cards, badges + accent CTA",
	fields: {
		title: { type: "text", label: "Title", default: "World-Class Facilities" },
		intro: {
			type: "multiline",
			label: "Intro text",
			default:
				"ArcClub offers pro courts, modern locker rooms, and spacious recovery zones specifically designed to help you play your very best.",
		},
		buttonText: { type: "text", label: "Button text", default: "Read More" },
		cards: {
			type: "list",
			label: "Facility cards",
			itemLabel: "card",
			fields: {
				tagline: { type: "text", label: "Tagline (top-right)", default: "Play Like the Pros" },
				title: { type: "text", label: "Title", default: "Facility Name" },
				badge: { type: "text", label: "Badge", default: "Pro Level" },
				description: { type: "multiline", label: "Description", default: "Short description of this facility." },
				url: { type: "text", label: "Link URL", default: "#" },
			},
		},
		accent: { type: "text", label: "Button color", default: "#bdf739" },
		cardColor: { type: "text", label: "Inner card color", default: "#1f4030" },
		panelColor: { type: "text", label: "Panel color", default: "#eeeeec" },
	},
});

export type Services5Props = InferProps<typeof schema>;
