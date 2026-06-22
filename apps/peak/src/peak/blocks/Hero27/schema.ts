import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero27 — lead-capture hero: a large two-tone headline over a full-width image,
 * with an overlapping white consultation form card (zip, name, email, phone,
 * consent, submit). The form posts to `formAction` (wire it to your handler).
 */
export const schema = defineBlock({
	type: "peak.hero27",
	label: "Hero (Form)",
	category: "Sections",
	description: "Full-width image hero with a two-tone headline and an inline lead-capture form",
	fields: {
		title: { type: "multiline", label: "Title", default: "Custom closets & storage solutions" },
		titleAccent: { type: "text", label: "Title accent (grey)", default: "for every room" },
		image: { type: "image", label: "Hero image" },
		imageAlt: { type: "text", label: "Image alt" },
		formHeading: {
			type: "multiline",
			label: "Form heading",
			default: "It all starts with a free design consultation",
		},
		buttonText: { type: "text", label: "Submit button text", default: "Submit" },
		consentText: {
			type: "multiline",
			label: "Consent checkbox text",
			default:
				"Yes, I agree to receive text messages at the phone number above to schedule my design consultation. Consent is not a condition of purchase. Reply HELP for help and STOP to end. Msg frequency varies; msg & data rates may apply.",
		},
		formAction: { type: "text", label: "Form POST URL (your handler)", default: "" },
	},
});

export type Hero27Props = InferProps<typeof schema>;
