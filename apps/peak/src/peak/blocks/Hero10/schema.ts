import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero10 — video hero with a frosted left side panel: logo, serif headline, a
 * vertical list of service links, and a colored bottom band; video on the right.
 */
export const schema = defineBlock({
	type: "peak.hero10",
	label: "Hero (Side Panel)",
	category: "Sections",
	description: "Frosted left panel with logo, headline and link list over a video",
	fields: {
		logo: { type: "image", label: "Logo" },
		logoAlt: { type: "text", label: "Logo alt" },
		title: { type: "multiline", label: "Title", default: "Home Additions and Remodeling Made Easy" },
		links: {
			type: "list",
			label: "Service links",
			itemLabel: "link",
			fields: {
				label: { type: "text", label: "Label" },
				url: { type: "text", label: "URL" },
			},
		},
		bottomText: { type: "multiline", label: "Bottom band text", default: "Creating beautiful spaces across Chicagoland since 1979" },
		videoUrl: { type: "text", label: "Video URL (mp4)" },
		poster: { type: "image", label: "Poster / background image" },
		posterAlt: { type: "text", label: "Poster alt" },
	},
});

export type Hero10Props = InferProps<typeof schema>;
