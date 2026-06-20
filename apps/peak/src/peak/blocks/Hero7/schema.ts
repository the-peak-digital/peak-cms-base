import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero7 — centered hero on a soft gradient with social proof: headline,
 * subhead, tagline, a CTA, a row of review-logo badges, and a stats row.
 * Optional decorative side images.
 */
export const schema = defineBlock({
	type: "peak.hero7",
	label: "Hero (Social Proof)",
	category: "Sections",
	description: "Centered hero with review-logo badges and a stats row",
	fields: {
		title: { type: "text", label: "Title", default: "San Diego Website Design" },
		subtitle: { type: "multiline", label: "Subtitle", default: "WordPress Web Design, Web Development & Secure Hosting" },
		tagline: { type: "text", label: "Tagline (uppercase)", default: "Awesome websites that convert visitors to leads since 2003" },
		buttonText: { type: "text", label: "Button text", default: "Work With Us!" },
		buttonUrl: { type: "text", label: "Button URL", default: "/contact" },
		proofLabel: { type: "text", label: "Proof label", default: "An Award-Winning Web Design Agency" },
		reviews: {
			type: "list",
			label: "Review badges",
			itemLabel: "review",
			fields: {
				logo: { type: "image", label: "Logo" },
				stars: {
					type: "select",
					label: "Stars",
					default: "5",
					options: [
						{ label: "5", value: "5" },
						{ label: "4", value: "4" },
						{ label: "3", value: "3" },
					],
				},
			},
		},
		stats: {
			type: "list",
			label: "Stats",
			itemLabel: "stat",
			fields: {
				value: { type: "text", label: "Value" },
				label: { type: "text", label: "Label" },
			},
		},
		sideLeft: { type: "image", label: "Decorative image (left)" },
		sideRight: { type: "image", label: "Decorative image (right)" },
	},
});

export type Hero7Props = InferProps<typeof schema>;
