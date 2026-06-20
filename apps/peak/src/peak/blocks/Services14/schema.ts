import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services14 — "Services (Stacking Showcase)". A header over light panels that
 * sticky-stack: as you scroll, each panel rises and covers the previous one.
 * Each panel has a red number, title, blurb and feature chips on the left, and a
 * large image with a row of small thumbnails on the right. Pure CSS sticky
 * stacking — no JS.
 */
export const schema = defineBlock({
	type: "peak.services14",
	label: "Services (Stacking Showcase)",
	category: "Sections",
	description: "Header + light panels with image + thumbnails that stack up on scroll",
	fields: {
		badge: { type: "text", label: "Badge", default: "Services" },
		titleLead: { type: "text", label: "Title", default: "We craft visual stories with passion" },
		tagline: {
			type: "multiline",
			label: "Tagline",
			default: "From the first click to the final edit, we pour relentless passion into every single visual story we create, beautifully and authentically",
		},
		items: {
			type: "list",
			label: "Service panels",
			itemLabel: "panel",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Short description of this service." },
				features: { type: "multiline", label: "Feature chips (comma or new-line separated)", default: "Feature one, Feature two, Feature three, Feature four" },
				image: { type: "image", label: "Main image" },
				alt: { type: "text", label: "Main image alt" },
				thumb1: { type: "image", label: "Thumbnail 1" },
				thumb2: { type: "image", label: "Thumbnail 2" },
				thumb3: { type: "image", label: "Thumbnail 3" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#ff4127" },
		panelColor: { type: "text", label: "Panel color", default: "#f3f2f0" },
	},
});

export type Services14Props = InferProps<typeof schema>;
