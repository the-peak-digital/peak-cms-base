import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero18 — rounded full-image hero with frosted glass cards floating over the
 * photo: a stat card (bottom-left), floating category tag pills, and an Insights
 * card + a Doctors card (bottom-right).
 */
export const schema = defineBlock({
	type: "peak.hero18",
	label: "Hero (Glass Cards)",
	category: "Sections",
	description: "Full-image hero with frosted glass stat, tag, and info cards",
	fields: {
		badge: { type: "text", label: "Badge", default: "Reliable Solutions for Everyday Care" },
		title: { type: "multiline", label: "Title", default: "Where care meets innovation" },
		body: { type: "multiline", label: "Body", default: "From daily wellness to advanced health insights, our platform is designed to support you." },
		buttonText: { type: "text", label: "Button text", default: "Get Started For Free" },
		buttonUrl: { type: "text", label: "Button URL", default: "/signup" },
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Background alt" },
		tags: {
			type: "list",
			label: "Floating tags",
			itemLabel: "label",
			fields: { label: { type: "text", label: "Label" } },
		},
		statValue: { type: "text", label: "Stat value", default: "190K+" },
		statLabel: { type: "multiline", label: "Stat label", default: "Cured satisfied patients around the globe" },
		avatars: { type: "imageList", label: "Stat avatars" },
		insightLabel: { type: "text", label: "Insight label", default: "Insights" },
		insightCta: { type: "text", label: "Insight CTA", default: "Explore" },
		insightCtaUrl: { type: "text", label: "Insight CTA URL", default: "/insights" },
		insightTitle: { type: "multiline", label: "Insight title", default: "Personalized care and demand" },
		insightBody: { type: "multiline", label: "Insight body", default: "From daily wellness to advanced health insights we support." },
		insightStat: { type: "text", label: "Insight stat", default: "78%" },
		doctorsValue: { type: "text", label: "Doctors value", default: "150+" },
		doctorsLabel: { type: "text", label: "Doctors label", default: "Doctors" },
		doctorImage: { type: "image", label: "Doctor image" },
		doctorImageAlt: { type: "text", label: "Doctor image alt" },
	},
});

export type Hero18Props = InferProps<typeof schema>;
