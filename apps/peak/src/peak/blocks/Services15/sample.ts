import type { Services15Props } from "./schema";

/** Demo content for Services15 — used by the preview page + make-section script. */
export const sample: Services15Props = {
	badge: "05/ Works",
	text: "A curated selection of brand and digital work built with clarity, intention, and discipline.",
	buttonText: "View All Works",
	buttonUrl: "/works",
	bg: "#141414",
	works: [
		{ label: "CCNIA", image: "https://picsum.photos/seed/work-ccnia/1000/1100", alt: "CCNIA project", url: "#" },
		{ label: "Refill", image: "https://picsum.photos/seed/work-refill/1000/1100", alt: "Refill project", url: "#" },
		{ label: "Lumen", image: "https://picsum.photos/seed/work-lumen/1000/1100", alt: "Lumen project", url: "#" },
		{ label: "Haven", image: "https://picsum.photos/seed/work-haven/1000/1100", alt: "Haven project", url: "#" },
		{ label: "Atelier", image: "https://picsum.photos/seed/work-atelier/1000/1100", alt: "Atelier project", url: "#" },
	],
};
