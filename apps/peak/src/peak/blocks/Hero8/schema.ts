import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero8 — lead-form hero: full background image with headline + feature pills on
 * the left and a quote/lead form card on the right, plus an optional review
 * badge. The core local-SEO conversion layout.
 */
export const schema = defineBlock({
	type: "peak.hero8",
	label: "Hero (Lead Form)",
	category: "Sections",
	description: "Background image with headline left and a quote form on the right",
	fields: {
		titleItalic: { type: "text", label: "Title (italic line)", default: "Full-Service Home Remodeling —" },
		title: { type: "multiline", label: "Title (rest)", default: "Design, Permits & Build" },
		subtitle: { type: "multiline", label: "Subtitle", default: "Kitchen, Bathroom, and Full-Home remodels done right — on time and on budget." },
		features: {
			type: "list",
			label: "Feature pills",
			itemLabel: "feature",
			fields: { label: { type: "text", label: "Label" } },
		},
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		formTitle: { type: "text", label: "Form title", default: "Get a Free On-Site Quote" },
		projectTypes: { type: "multiline", label: "Project Type options (one per line)", default: "Kitchen Remodel\nBathroom Remodel\nFull-Home Remodel\nOther" },
		timingOptions: { type: "multiline", label: "Project Timing options (one per line)", default: "ASAP\n1–3 months\n3–6 months\nJust exploring" },
		buttonText: { type: "text", label: "Submit button", default: "Get My Free Estimate" },
		note: { type: "text", label: "Form note", default: "No pressure. We'll reply within 24 hours." },
		endpoint: { type: "text", label: "POST endpoint (optional)" },
		reviewRating: { type: "text", label: "Review rating", default: "5.0" },
		reviewText: { type: "text", label: "Review text", default: "5 reviews" },
	},
});

export type Hero8Props = InferProps<typeof schema>;
