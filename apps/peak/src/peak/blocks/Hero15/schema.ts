import { defineBlock, type InferProps } from "../defineBlock";

/**
 * Hero15 — real-estate showcase hero with a card-stack intro: on a white
 * screen, project photos drop in one by one (each more rotated), then the hero
 * reveals — full image, big address headline, agent card, and a thumbnail strip.
 */
export const schema = defineBlock({
	type: "peak.hero15",
	label: "Hero (Card Stack)",
	category: "Sections",
	description: "Card-stack intro animation, then a property showcase hero",
	fields: {
		image: { type: "image", label: "Background image" },
		imageAlt: { type: "text", label: "Image alt" },
		phone: { type: "text", label: "Phone" },
		statValue: { type: "text", label: "Stat value", default: "90+" },
		statLabel: { type: "text", label: "Stat label", default: "Properties Sold" },
		ratingLabel: { type: "text", label: "Rating label", default: "Best Properties" },
		title: { type: "text", label: "Title", default: "50 Riverside Blvd, 24A" },
		subtitle: { type: "text", label: "Subtitle", default: "4 Beds, 2 Baths, 2,570 Sq.Ft." },
		agentPhoto: { type: "image", label: "Agent photo" },
		agentRole: { type: "text", label: "Agent role", default: "Your Trusted Real Estate Agent" },
		agentName: { type: "text", label: "Agent name", default: "Sofia Kovalsky" },
		thumbs: { type: "imageList", label: "Gallery thumbnails (first 3 used for the intro)" },
	},
});

export type Hero15Props = InferProps<typeof schema>;
