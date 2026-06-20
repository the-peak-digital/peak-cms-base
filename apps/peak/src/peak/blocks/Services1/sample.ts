import type { Services1Props } from "./schema";

/**
 * Demo content for Services1. Used by the block-preview page and the
 * make-section script to build the Section thumbnail + the services-demo page.
 * Images are deterministic Picsum seeds so they always resolve.
 */
export const sample: Services1Props = {
	badge: "Our services",
	title: "What we can do for you",
	description:
		"From design to installation, we provide quality fence solutions tailored to your needs.",
	buttonText: "See our services",
	buttonUrl: "/services",
	cards: [
		{ image: "https://picsum.photos/seed/fence-design/600/1100", alt: "Custom fence design", label: "Custom fence design", url: "#" },
		{ image: "https://picsum.photos/seed/fence-repair/600/1100", alt: "Fence repair", label: "Fence repair", url: "#" },
		{ image: "https://picsum.photos/seed/fence-install/600/1100", alt: "Fence installation", label: "Fence installation", url: "#" },
		{ image: "https://picsum.photos/seed/staining/600/1100", alt: "Staining & sealing", label: "Staining & sealing", url: "#" },
		{ image: "https://picsum.photos/seed/maintenance/600/1100", alt: "Maintenance services", label: "Maintenance services", url: "#" },
	],
	bg: "#ece3d6",
	accent: "#1c1b19",
};
