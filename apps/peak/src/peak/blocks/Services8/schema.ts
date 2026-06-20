import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services8 — "Services (Tabbed Panels)". A centered header over a tab bar; each
 * tab swaps a two-column panel: title + blurb + price/timeline rows + feature
 * chips on the left, a large image on the right. JS-enhanced tabs; no-JS shows
 * the first tab.
 */
export const schema = defineBlock({
	type: "peak.services8",
	label: "Services (Tabbed Panels)",
	category: "Sections",
	description: "Centered header + tab bar that swaps a 2-column service panel",
	fields: {
		badge: { type: "text", label: "Badge", default: "Services" },
		title: { type: "text", label: "Title", default: "What we do" },
		subtitle: {
			type: "multiline",
			label: "Subtitle",
			default: "Tell us what you need, and we'll find the right expertise to make it happen flawlessly.",
		},
		priceLabel: { type: "text", label: "Price label", default: "Price" },
		timelineLabel: { type: "text", label: "Timeline label", default: "Timeline" },
		tabs: {
			type: "list",
			label: "Tabs",
			itemLabel: "tab",
			fields: {
				label: { type: "text", label: "Tab label", default: "Tab" },
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Describe this service." },
				price: { type: "text", label: "Price value", default: "from 5 000$" },
				timeline: { type: "text", label: "Timeline value", default: "2 month avg." },
				features: { type: "multiline", label: "Features (comma or new-line separated)", default: "Feature one, Feature two" },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#1c1b19" },
	},
});

export type Services8Props = InferProps<typeof schema>;
