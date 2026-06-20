import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero11 — split hero: headline, subtitle, primary + phone buttons, and a row of
 * icon info cards on the left; a colored image panel with a portrait on the right.
 */
export const schema = defineBlock({
	type: "peak.hero11",
	label: "Hero (Info Cards)",
	category: "Sections",
	description: "Split hero with phone CTA, icon info cards, and a colored image panel",
	fields: {
		title: { type: "multiline", label: "Title", default: "Transforming Your Smile into a Timeless Masterpiece of Joy" },
		body: { type: "multiline", label: "Body" },
		primaryText: { type: "text", label: "Primary button", default: "Book An Appointment" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/book" },
		phone: { type: "text", label: "Phone number", default: "940-394-3344" },
		infos: {
			type: "list",
			label: "Info cards",
			itemLabel: "info card",
			fields: {
				icon: { type: "text", label: "Icon (emoji)" },
				label: { type: "text", label: "Label" },
				value: { type: "text", label: "Value" },
			},
		},
		image: { type: "image", label: "Portrait image" },
		imageAlt: { type: "text", label: "Image alt" },
		panelColor: { type: "text", label: "Panel color", default: "#f2924d" },
	},
});

export type Hero11Props = InferProps<typeof schema>;
