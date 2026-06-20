import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero3 — dark medical hero: serif headline with an italic emphasis word, body,
 * two CTAs, trust badges, and a portrait image with floating "glass" stat cards.
 */
export const schema = defineBlock({
	type: "peak.hero3",
	label: "Hero (Portrait)",
	category: "Sections",
	description: "Hero with a portrait image and floating stat cards",
	fields: {
		titlePart1: { type: "text", label: "Title (before emphasis)", default: "Redefining care at" },
		emphasis: { type: "text", label: "Emphasis word (italic)", default: "every" },
		titlePart2: { type: "text", label: "Title (after emphasis)", default: "touchpoint" },
		body: { type: "multiline", label: "Body" },
		primaryText: { type: "text", label: "Primary button", default: "Start Consultation" },
		primaryUrl: { type: "text", label: "Primary URL", default: "/contact" },
		secondaryText: { type: "text", label: "Secondary button", default: "See how it works" },
		secondaryUrl: { type: "text", label: "Secondary URL", default: "/how-it-works" },
		image: { type: "image", label: "Portrait image" },
		imageAlt: { type: "text", label: "Image alt" },
		nextLabel: { type: "text", label: "Card 1 label", default: "NEXT AVAILABLE" },
		nextName: { type: "text", label: "Card 1 name", default: "Dr. Sarah K." },
		nextTime: { type: "text", label: "Card 1 time", default: "Today, 2:30 PM" },
		patientsLabel: { type: "text", label: "Card 2 label", default: "ACTIVE PATIENTS" },
		patientsValue: { type: "text", label: "Card 2 value", default: "10,425" },
		patientsAvatars: { type: "imageList", label: "Card 2 avatars" },
		recoveryLabel: { type: "text", label: "Card 3 label", default: "RECOVERY RATE" },
		recoveryValue: { type: "text", label: "Card 3 value", default: "96.8%" },
		recoveryNote: { type: "text", label: "Card 3 note", default: "Above industry avg" },
		badges: {
			type: "list",
			label: "Trust badges",
			itemLabel: "badge",
			fields: { label: { type: "text", label: "Label" } },
		},
	},
});

export type Hero3Props = InferProps<typeof schema>;
