import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero23 — lead-capture hero: full-image background with marketing copy on the
 * left (eyebrow, headline, offer, hours, two buttons) and a cream consultation
 * form card on the right (name, email, phone, zip, message, submit).
 */
export const schema = defineBlock({
	type: "peak.hero23",
	label: "Hero (Consult Form)",
	category: "Sections",
	description: "Full-image hero with a consultation lead form card",
	fields: {
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Background alt" },
		eyebrow: { type: "text", label: "Eyebrow", default: "Chicago's Top Kitchen and Bathroom Cabinet Store" },
		title: { type: "multiline", label: "Title", default: "Kitchen and Bathrom Remodeling Start with Free Estimate" },
		offer: { type: "text", label: "Offer line", default: "Exclusive Offer up to 40% OFF Kitchen Cabinets" },
		hoursLabel: { type: "text", label: "Hours label", default: "Hours:" },
		hoursStatus: { type: "text", label: "Hours status", default: "Closed" },
		hoursNote: { type: "text", label: "Hours note", default: "— Opens at 9:30 AM" },
		primaryText: { type: "text", label: "Primary button", default: "Schedule Now" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/schedule" },
		secondaryText: { type: "text", label: "Secondary button", default: "Financing Available" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/financing" },
		formTitle: { type: "multiline", label: "Form title", default: "It all starts with a free design consultation" },
		messagePlaceholder: { type: "text", label: "Message placeholder", default: "Please share your kitchen or bathroom remodeling plans, project details and location." },
		submitText: { type: "text", label: "Submit text", default: "Submit" },
		formAction: { type: "text", label: "Form action URL", default: "#" },
		formBg: { type: "text", label: "Form background color", default: "#ead9bf" },
	},
});

export type Hero23Props = InferProps<typeof schema>;
