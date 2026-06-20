import type { Services2Props } from "./schema";

/** Demo content for Services2 — used by the preview page + make-section script. */
export const sample: Services2Props = {
	titleLead: "Our",
	titleHighlight: "Services",
	description:
		"Our mission is to drive progress and enhance the lives of our customers by delivering superior products and services that exceed expectations.",
	cards: [
		{ icon: "pie", title: "Title Goes Here", description: "Tailored to meet individual needs perfectly balanced.", linkText: "Read more", linkUrl: "#" },
		{ icon: "globe", title: "Title Goes Here", description: "Tailored to meet individual needs perfectly balanced.", linkText: "Read more", linkUrl: "#" },
		{ icon: "users", title: "Title Goes Here", description: "Tailored to meet individual needs perfectly balanced.", linkText: "Read more", linkUrl: "#" },
		{ icon: "voicemail", title: "Title Goes Here", description: "Tailored to meet individual needs perfectly balanced.", linkText: "Read more", linkUrl: "#" },
	],
	buttonText: "Hire Us Today",
	buttonUrl: "/contact",
	accent: "#f5163f",
	bg: "#f1f2f4",
};
