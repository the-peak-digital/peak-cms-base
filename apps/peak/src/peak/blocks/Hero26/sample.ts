import type { Hero26Props } from "./schema";

/** Demo content. Add a per-slide image to put a darkened photo behind a slide. */
export const sample: Hero26Props = {
	slides: [
		{
			title: "Want to spruce up your kitchen or bath?",
			subtitle: "A beautiful kitchen or bath shouldn't cost the earth",
			buttonText: "Get a quote",
			buttonUrl: "/quote",
		},
		{
			title: "Designs that fit your life",
			subtitle: "From modern to timeless — built around how you live",
			buttonText: "See projects",
			buttonUrl: "/projects",
		},
		{
			title: "Quality you can stand on",
			subtitle: "Premium materials, expert installation, lasting results",
			buttonText: "Our process",
			buttonUrl: "/process",
		},
		{
			title: "Book your free consultation",
			subtitle: "Let's plan your dream space together",
			buttonText: "Book now",
			buttonUrl: "/book",
		},
	],
	accent: "#c2703d",
};
