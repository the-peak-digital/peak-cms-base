import type { Services5Props } from "./schema";

/** Demo content for Services5 — used by the preview page + make-section script. */
export const sample: Services5Props = {
	title: "World-Class Facilities",
	intro:
		"ArcClub offers pro courts, modern locker rooms, and spacious recovery zones specifically designed to help you play your very best.",
	buttonText: "Read More",
	accent: "#bdf739",
	cardColor: "#1f4030",
	panelColor: "#eeeeec",
	cards: [
		{ tagline: "Play Like the Pros", title: "Pro Tennis Courts", badge: "Pro Level", description: "Clay and hard courts with professional-grade lighting beautifully, expertly installed", url: "#" },
		{ tagline: "Train Smarter, Not Harder", title: "Coaching Studio", badge: "Pro Level", description: "Private coaching sessions, comprehensive and detailed video analysis & planning strategies", url: "#" },
		{ tagline: "Built for Performance", title: "Fitness Zone", badge: "Pro Level", description: "Strength, cardio, and specialized tennis-specific training equipment tools for athletes", url: "#" },
		{ tagline: "Reset in Style", title: "Locker Rooms", badge: "Pro Level", description: "Clean, private, and spa-inspired for your ultimate comfort and deep relaxation experience.", url: "#" },
	],
};
