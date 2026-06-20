import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero14 — full-image hero with an avatar trust badge on top, a big headline, a
 * bottom CTA + phone, and a full-width trust bar of icon items.
 */
export const schema = defineBlock({
	type: "peak.hero14",
	label: "Hero (Trust Bar)",
	category: "Sections",
	description: "Full image with trust badge, headline, phone CTA, and a bottom trust bar",
	fields: {
		badgeText: { type: "text", label: "Badge text", default: "Trusted by 520+ happy clients in UK" },
		badgeAvatars: { type: "imageList", label: "Badge avatars" },
		title: { type: "multiline", label: "Title", default: "Quality cleaning that won't cost more" },
		primaryText: { type: "text", label: "Primary button", default: "Get free quote" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/quote" },
		phoneLabel: { type: "text", label: "Phone label", default: "Emergency call for 24/7 help :" },
		phone: { type: "text", label: "Phone number", default: "020 3950 6452" },
		trustItems: {
			type: "list",
			label: "Trust bar items",
			itemLabel: "item",
			fields: {
				icon: { type: "text", label: "Icon (emoji)" },
				text: { type: "text", label: "Text" },
			},
		},
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		accent: { type: "text", label: "Accent color", default: "#f29022" },
	},
});

export type Hero14Props = InferProps<typeof schema>;
