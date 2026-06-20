import { defineBlock, type InferProps } from "../defineBlock";

const ICON_OPTIONS = [
	{ label: "Planning / set-square", value: "planning" },
	{ label: "Box", value: "box" },
	{ label: "Binoculars", value: "binoculars" },
	{ label: "Bolt", value: "bolt" },
	{ label: "Bulb", value: "bulb" },
	{ label: "Home", value: "home" },
	{ label: "Shield", value: "shield" },
	{ label: "Gear", value: "gear" },
];

/**
 * Services16 — "Services (Checkerboard Grid)". A header over a 3-column grid that
 * alternates tinted text cards (icon badge, title, blurb) with image cards. On
 * scroll into view the cards load from the middle outward (delay scales with
 * distance from center). JS-enhanced; no-JS/reduced-motion shows the final grid.
 */
export const schema = defineBlock({
	type: "peak.services16",
	label: "Services (Checkerboard Grid)",
	category: "Sections",
	description: "Header + alternating text/image grid that loads from the middle out",
	fields: {
		badge: { type: "text", label: "Badge", default: "Our Services" },
		title: { type: "text", label: "Title", default: "Electrical Solutions" },
		tagline: {
			type: "multiline",
			label: "Tagline",
			default: "From emergency repairs to full installations, we provide electrical services that keep your property safe, powered, and ready for daily use.",
		},
		cards: {
			type: "list",
			label: "Cards (alternate Text / Image)",
			itemLabel: "card",
			fields: {
				kind: { type: "select", label: "Card type", options: [{ label: "Text card", value: "text" }, { label: "Image card", value: "image" }], default: "text" },
				icon: { type: "select", label: "Icon (text cards)", options: ICON_OPTIONS, default: "planning" },
				title: { type: "text", label: "Title (text cards)", default: "Service" },
				description: { type: "multiline", label: "Description (text cards)", default: "Short description of this service." },
				image: { type: "image", label: "Image (image cards)" },
				alt: { type: "text", label: "Image alt" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#4f46e5" },
		cardColor: { type: "text", label: "Text card color", default: "#eef0fb" },
	},
});

export type Services16Props = InferProps<typeof schema>;
