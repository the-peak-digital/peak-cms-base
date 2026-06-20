import type { Services14Props } from "./schema";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/1200/900`;
const th = (seed: string) => `https://picsum.photos/seed/${seed}/240/160`;

/** Demo content for Services14 — used by the preview page + make-section script. */
export const sample: Services14Props = {
	badge: "Services",
	titleLead: "We craft visual stories with passion",
	tagline: "From the first click to the final edit, we pour relentless passion into every single visual story we create, beautifully and authentically",
	accent: "#ff4127",
	panelColor: "#f3f2f0",
	items: [
		{
			title: "Wedding stories",
			description: "We preserve every tender glance, stolen kiss, and joyful tear — crafting a timeless wedding story you will cherish absolutely forever.",
			features: "Bridal Portraits, Ceremony Coverage, Reception Moments, Couple Sessions",
			image: img("wedding-main"),
			alt: "Wedding photography",
			thumb1: th("wedding-t1"),
			thumb2: th("wedding-t2"),
			thumb3: th("wedding-t3"),
		},
		{
			title: "Portrait sessions",
			description: "We capture raw human emotion, personality, and depth through carefully composed portraits that tell your most authentic personal story.",
			features: "Executive Portraits, Fine Art, Family Portraits, Newborn Portraits",
			image: img("portrait-main"),
			alt: "Portrait photography",
			thumb1: th("portrait-t1"),
			thumb2: th("portrait-t2"),
			thumb3: th("portrait-t3"),
		},
		{
			title: "Brand visuals",
			description: "From product shots to campaign imagery, we craft powerful brand visuals that communicate your identity and captivate your ideal audience.",
			features: "Campaign Shoots, Brand Storytelling, Social Content, Commercial Imagery",
			image: img("brand-main"),
			alt: "Brand visuals",
			thumb1: th("brand-t1"),
			thumb2: th("brand-t2"),
			thumb3: th("brand-t3"),
		},
	],
};
