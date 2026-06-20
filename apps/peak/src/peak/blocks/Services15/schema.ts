import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services15 — "Services (Sticky Works)". A full-bleed two-column section: a dark
 * sticky intro panel on the left (badge, statement, CTA) that stays pinned while
 * a single column of large project image cards (each with a label tag) scrolls
 * on the right. Pure CSS sticky sidebar — no JS.
 */
export const schema = defineBlock({
	type: "peak.services15",
	label: "Services (Sticky Works)",
	category: "Sections",
	description: "Sticky dark left panel + scrolling column of project image cards",
	fields: {
		badge: { type: "text", label: "Badge", default: "05/ Works" },
		text: {
			type: "multiline",
			label: "Statement",
			default: "A curated selection of brand and digital work built with clarity, intention, and discipline.",
		},
		buttonText: { type: "text", label: "Button text", default: "View All Works" },
		buttonUrl: { type: "text", label: "Button URL", default: "/works" },
		works: {
			type: "list",
			label: "Projects",
			itemLabel: "project",
			fields: {
				label: { type: "text", label: "Label", default: "Project" },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt (for SEO)" },
				url: { type: "text", label: "Link URL" },
			},
		},
		bg: { type: "text", label: "Left panel color", default: "#141414" },
	},
});

export type Services15Props = InferProps<typeof schema>;
