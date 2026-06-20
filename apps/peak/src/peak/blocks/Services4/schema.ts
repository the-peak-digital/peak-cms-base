import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services4 — "Services (Hover Spotlight)". Dark editorial section: a big
 * condensed "Services" headline, four service items flanking a central image,
 * two per side. Hovering/focusing an item spotlights it (white) and crossfades
 * the central image to that item's image. JS-enhanced but no-JS/reduced-motion
 * safe: the first item + its image render active server-side.
 */
export const schema = defineBlock({
	type: "peak.services4",
	label: "Services (Hover Spotlight)",
	category: "Sections",
	description: "Dark section; hovering a service crossfades the center image",
	fields: {
		title: { type: "text", label: "Title", default: "Services" },
		intro: {
			type: "multiline",
			label: "Intro text",
			default:
				"Design support that feels thoughtful, focused, and built around your goals. Whether you're starting fresh or refining something live — I'll meet you where you are and help move it forward.",
		},
		buttonText: { type: "text", label: "Button text (on active item)", default: "Start Your Project" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		services: {
			type: "list",
			label: "Services",
			itemLabel: "service",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Short description of this service." },
				image: { type: "image", label: "Image" },
				imageAlt: { type: "text", label: "Image alt" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#ff5419" },
		bg: { type: "text", label: "Background color", default: "#141414" },
	},
});

export type Services4Props = InferProps<typeof schema>;
