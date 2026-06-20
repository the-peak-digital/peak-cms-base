import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Services12 — "Services (Hover List)". Centered header over a two-column body:
 * a vertical list of services (title + number) on the left, and a large image +
 * description on the right. Hovering/focusing a list item highlights it and
 * crossfades the image + description. JS-enhanced; no-JS shows the first item.
 */
export const schema = defineBlock({
	type: "peak.services12",
	label: "Services (Hover List)",
	category: "Sections",
	description: "Left service list; hovering swaps the right image + description",
	fields: {
		title: { type: "text", label: "Title", default: "Crafting Spaces with Purpose" },
		subtitle: {
			type: "multiline",
			label: "Subtitle",
			default: "We design refined environments where architecture, comfort, and functionality come together to create a truly elevated living experience.",
		},
		descriptionLabel: { type: "text", label: "Description label", default: "Description" },
		services: {
			type: "list",
			label: "Services",
			itemLabel: "service",
			fields: {
				title: { type: "text", label: "Title", default: "Service" },
				image: { type: "image", label: "Image" },
				alt: { type: "text", label: "Image alt" },
				description: { type: "multiline", label: "Description (blank line = new paragraph)", default: "Describe this service." },
			},
		},
	},
});

export type Services12Props = InferProps<typeof schema>;
