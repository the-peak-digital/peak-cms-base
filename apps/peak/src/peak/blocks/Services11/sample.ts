import type { Services11Props } from "./schema";

/** Demo content for Services11 — used by the preview page + make-section script. */
export const sample: Services11Props = {
	badge: "What we do",
	title: "Our services",
	tagline: "We deliver strategic digital services designed to improve performance, usability, and long-term growth.",
	cards: [
		{ title: "Web Design", description: "Visually strong websites created to communicate clearly and perform across all devices.", image: "https://picsum.photos/seed/svc-webdesign/900/1000", alt: "Web design" },
		{ title: "UI/UX Design", description: "Thoughtfully structured interfaces built to guide users smoothly through digital journeys.", image: "https://picsum.photos/seed/svc-uiux/900/1000", alt: "UI/UX design" },
		{ title: "Web Development", description: "Robust, fast, and scalable builds engineered to bring your designs to life flawlessly.", image: "https://picsum.photos/seed/svc-webdev/900/1000", alt: "Web development" },
		{ title: "AI Automation", description: "Smart workflows and AI tooling that remove busywork and accelerate your team's output.", image: "https://picsum.photos/seed/svc-ai/900/1000", alt: "AI automation" },
	],
};
