import { defineBlock, type InferProps } from "../defineBlock";

const ICON_OPTIONS = [
	{ label: "Megaphone", value: "megaphone" },
	{ label: "Buildings", value: "buildings" },
	{ label: "IoT network", value: "iot" },
	{ label: "Headset / support", value: "headset" },
	{ label: "Cloud", value: "cloud" },
	{ label: "Web / monitor", value: "web" },
	{ label: "Code", value: "code" },
	{ label: "Mobile", value: "mobile" },
	{ label: "Server", value: "server" },
	{ label: "Gear", value: "gear" },
];

/**
 * Services3 — "Services (Promo Grid)". A dark image promo panel on the left
 * (title, blurb, accent CTA) beside a 3-up grid of pastel category cards. Each
 * card shows a line icon, a title and a set of white tag chips. Tags are entered
 * as a comma/newline list per card (Block Kit can't nest a repeater in a
 * repeater) and split at render.
 */
export const schema = defineBlock({
	type: "peak.services3",
	label: "Services (Promo Grid)",
	category: "Sections",
	description: "Dark image promo panel + pastel category cards with tag chips",
	fields: {
		image: { type: "image", label: "Panel image" },
		imageAlt: { type: "text", label: "Panel image alt" },
		title: { type: "text", label: "Panel title", default: "Our Services" },
		description: {
			type: "multiline",
			label: "Panel text",
			default:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
		},
		buttonText: { type: "text", label: "Button text", default: "Explore All Our Services" },
		buttonUrl: { type: "text", label: "Button URL", default: "/services" },
		accent: { type: "text", label: "Accent color", default: "#f7941e" },
		cards: {
			type: "list",
			label: "Category cards",
			itemLabel: "card",
			fields: {
				icon: { type: "select", label: "Icon", options: ICON_OPTIONS, default: "megaphone" },
				title: { type: "text", label: "Title", default: "Category" },
				tags: { type: "multiline", label: "Tags (comma or new-line separated)", default: "Tag one, Tag two" },
				bg: { type: "text", label: "Card tint (optional)" },
			},
		},
	},
});

export type Services3Props = InferProps<typeof schema>;
