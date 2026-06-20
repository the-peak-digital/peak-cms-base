import { defineBlock, type InferProps } from "../defineBlock";

const ICON_OPTIONS = [
	{ label: "Pie chart", value: "pie" },
	{ label: "Globe", value: "globe" },
	{ label: "People", value: "users" },
	{ label: "Voicemail", value: "voicemail" },
	{ label: "Bar chart", value: "chart" },
	{ label: "Shield", value: "shield" },
	{ label: "Bolt", value: "bolt" },
	{ label: "Star", value: "star" },
];

/**
 * Services2 — "Services (Icon Cards)". Centered header with a highlighted word,
 * a mission line, then a row of white cards. Each card has a tinted circular
 * icon badge floating over its top-left corner, a bold title, blurb and a
 * "Read more" link. A centered accent CTA button sits below the row.
 */
export const schema = defineBlock({
	type: "peak.services2",
	label: "Services (Icon Cards)",
	category: "Sections",
	description: "Centered header + row of white icon cards + center CTA",
	fields: {
		titleLead: { type: "text", label: "Title (lead)", default: "Our" },
		titleHighlight: { type: "text", label: "Title (highlighted)", default: "Services" },
		description: {
			type: "multiline",
			label: "Description",
			default:
				"Our mission is to drive progress and enhance the lives of our customers by delivering superior products and services that exceed expectations.",
		},
		cards: {
			type: "list",
			label: "Service cards",
			itemLabel: "card",
			fields: {
				icon: { type: "select", label: "Icon", options: ICON_OPTIONS, default: "pie" },
				iconColor: { type: "text", label: "Icon color (optional)" },
				title: { type: "text", label: "Title", default: "Title Goes Here" },
				description: { type: "multiline", label: "Description", default: "Tailored to meet individual needs perfectly balanced." },
				linkText: { type: "text", label: "Link text", default: "Read more" },
				linkUrl: { type: "text", label: "Link URL", default: "#" },
			},
		},
		buttonText: { type: "text", label: "Button text", default: "Hire Us Today" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		accent: { type: "text", label: "Accent color", default: "#f5163f" },
		bg: { type: "text", label: "Panel background", default: "#f1f2f4" },
	},
});

export type Services2Props = InferProps<typeof schema>;
