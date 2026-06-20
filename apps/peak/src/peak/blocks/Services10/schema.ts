import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services10 — "Services (Stacking List)". A dark full-bleed section with a
 * sticky header and a list of service rows that sticky-stack: as you scroll,
 * each passed row collapses to a thin strip at the top while the current row is
 * expanded (image + title + blurb + hashtag tags + big number). Pure CSS sticky
 * stacking — no JS.
 */
export const schema = defineBlock({
	type: "peak.services10",
	label: "Services (Stacking List)",
	category: "Sections",
	description: "Dark sticky-stacking service rows that collapse to strips on scroll",
	fields: {
		title: { type: "text", label: "Title", default: "Our Services" },
		taglineLead: { type: "text", label: "Tagline (lead)", default: "Building experiences that" },
		taglineAccent: { type: "text", label: "Tagline (accent)", default: "connect people and brands." },
		items: {
			type: "list",
			label: "Service rows",
			itemLabel: "service",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				description: { type: "multiline", label: "Description", default: "Short description of this service." },
				tags: { type: "multiline", label: "Tags (comma or new-line separated)", default: "Brand audit, Customer journey, Brand strategy" },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt" },
			},
		},
		accent: { type: "text", label: "Accent color", default: "#c2f53c" },
		bg: { type: "text", label: "Background color", default: "#163026" },
	},
});

export type Services10Props = InferProps<typeof schema>;
