import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services13 — "Services (Stacking Panels)". A dark section header over full-
 * screen image panels that sticky-stack: as you scroll, each panel rises up and
 * covers the previous one. Each panel has a number, big title, description and
 * feature chips over a full-bleed image. Pure CSS sticky stacking — no JS.
 */
export const schema = defineBlock({
	type: "peak.services13",
	label: "Services (Stacking Panels)",
	category: "Sections",
	description: "Dark header + full-screen image panels that stack up on scroll",
	fields: {
		badge: { type: "text", label: "Badge", default: "Our Service" },
		title: { type: "text", label: "Title", default: "Logistics Solutions Designed for Every Scale" },
		items: {
			type: "list",
			label: "Service panels",
			itemLabel: "panel",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Short description of this service." },
				features: { type: "multiline", label: "Feature chips (comma or new-line separated)", default: "Feature one, Feature two, Feature three" },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt" },
			},
		},
		bg: { type: "text", label: "Background color", default: "#0e0e0e" },
	},
});

export type Services13Props = InferProps<typeof schema>;
