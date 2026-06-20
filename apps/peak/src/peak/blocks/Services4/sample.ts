import type { Services4Props } from "./schema";

/** Demo content for Services4 — used by the preview page + make-section script. */
export const sample: Services4Props = {
	title: "Services",
	intro:
		"Design support that feels thoughtful, focused, and built around your goals. Whether you're starting fresh or refining something live — I'll meet you where you are and help move it forward.",
	buttonText: "Start Your Project",
	buttonUrl: "/contact",
	accent: "#ff5419",
	bg: "#141414",
	services: [
		{
			title: "Web Design & Layouts",
			description: "Beautiful websites that are easy to explore. From landing pages to full sites, I design layouts that feel clean, modern, and made for humans — not just pixels.",
			image: "https://picsum.photos/seed/svc-web/900/1100",
			imageAlt: "Web design layouts",
		},
		{
			title: "Product UI Design",
			description: "Interfaces that feel natural to use. I help apps and platforms look better and work smarter. Every screen is designed with usability, flow.",
			image: "https://picsum.photos/seed/svc-ui/900/1100",
			imageAlt: "Product UI design",
		},
		{
			title: "Creative Direction",
			description: "Helping ideas take shape — visually and strategically. I support founders, studios, and teams by shaping the creative side of your brand — from first ideas to final polish.",
			image: "https://picsum.photos/seed/svc-creative/900/1100",
			imageAlt: "Creative direction",
		},
		{
			title: "Design Audits & Fixes",
			description: "Quick wins that make a real difference. Already have something live? I'll review, refine, and rebuild key sections to improve usability, visuals, and performance.",
			image: "https://picsum.photos/seed/svc-audit/900/1100",
			imageAlt: "Design audits and fixes",
		},
	],
};
