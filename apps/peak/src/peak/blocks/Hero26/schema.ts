import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero26 — dark slider/carousel hero (a contained card): each slide centers a
 * headline + subtitle with a corner CTA, navigated by prev/next arrows and dots,
 * with autoplay. Optional darkened background image per slide (defaults to black).
 */
export const schema = defineBlock({
	type: "peak.hero26",
	label: "Hero (Slider)",
	category: "Sections",
	description: "Dark carousel hero with centered headline, subtitle, CTA, arrows + dots",
	fields: {
		slides: {
			type: "list",
			label: "Slides",
			itemLabel: "slide",
			fields: {
				title: { type: "multiline", label: "Title" },
				subtitle: { type: "text", label: "Subtitle" },
				buttonText: { type: "text", label: "Button text" },
				buttonUrl: { type: "text", label: "Button URL" },
				image: { type: "image", label: "Background image (optional, darkened)" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#c2703d" },
	},
});

export type Hero26Props = InferProps<typeof schema>;
