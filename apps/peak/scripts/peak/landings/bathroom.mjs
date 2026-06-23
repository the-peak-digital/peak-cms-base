const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;
const CONSENT =
	"Yes, I agree to receive text messages about my free quote. Consent is not a condition of purchase. Reply STOP to opt out. Msg & data rates may apply.";

/** Washington DC bathroom-remodeling landing — best price / best value. */
export const landing = {
	slug: "dc-bathroom-remodeling",
	title: "DC Bathroom Remodeling — Best Price, Best Value",
	blocks: [
		{
			type: "peak.hero28",
			node: {
				image: img("1620626011761-996317b8d101", 1800),
				imageAlt: "Newly remodeled Washington DC bathroom",
				eyebrow: "WASHINGTON DC BATHROOM REMODELING",
				title: "DC's Best-Value Bathroom Remodeling",
				offer: "Lowest Price Guaranteed in the DMV — Up to 40% Off + Free 3D Design",
				button1Text: "Get Your Free Quote",
				button1Url: "#lead",
				button2Text: "See Our Work",
				button2Url: "#lead",
				features: [
					{ icon: "visualizer", title: "Free 3D Design", text: "See your new bathroom before any demo begins." },
					{ icon: "showroom", title: "Price-Match Promise", text: "Find a lower written DC quote and we'll beat it." },
				],
				socials: [
					{ icon: "facebook", url: "#" },
					{ icon: "instagram", url: "#" },
					{ icon: "phone", url: "tel:+12025551234" },
					{ icon: "map", url: "#" },
					{ icon: "mail", url: "mailto:hello@example.com" },
				],
			},
		},
		{
			type: "peak.services2",
			node: {
				titleLead: "Everything Your",
				titleHighlight: "Bathroom Needs",
				description: "One trusted crew for the whole remodel — at the best price in Washington DC.",
				cards: [
					{ icon: "star", title: "Vanities & Cabinets", description: "Custom vanities and storage that fit your space and your budget.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#ff7a18" },
					{ icon: "shield", title: "Tile & Showers", description: "Walk-in showers and tile work at wholesale-direct pricing, expertly installed.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#16c79a" },
					{ icon: "bolt", title: "Tubs & Fixtures", description: "Soaking tubs, faucets and fixtures built to last for decades.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#5b5bd6" },
					{ icon: "users", title: "Project Management", description: "One dedicated manager from free quote to final walkthrough.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#0ea5e9" },
				],
				buttonText: "Get My Free Estimate",
				buttonUrl: "#lead",
				accent: "#0ea5e9",
				bg: "#eef4f7",
			},
		},
		{
			type: "peak.hero29",
			node: {
				eyebrow: "Best Value in the DMV",
				title: "DC Homeowners Trust Us for Honest, Affordable Bathrooms",
				subtitle:
					"Hundreds of Washington DC families have upgraded their bathrooms with us — on time, on budget, and at the best price in the area. Ready for a free quote? Call us today at",
				phone: "(202) 555-1234",
				avatars: [
					{ url: "https://i.pravatar.cc/100?img=22", alt: "Reviewer" },
					{ url: "https://i.pravatar.cc/100?img=45", alt: "Reviewer" },
					{ url: "https://i.pravatar.cc/100?img=12", alt: "Reviewer" },
					{ url: "https://i.pravatar.cc/100?img=60", alt: "Reviewer" },
				],
				stars: 5,
				reviewsText: "473 Google Reviews",
				images: [
					{ url: img("1584622650111-993a426fbf0a", 800), alt: "Remodeled bathroom" },
					{ url: img("1552321554-5fefe8c9ef14", 800), alt: "Modern bathroom vanity" },
					{ url: img("1604709177225-055f99402ea3", 800), alt: "Walk-in shower" },
				],
				accent: "#0ea5e9",
			},
		},
		{
			type: "peak.hero27",
			node: {
				title: "Get your free bathroom",
				titleAccent: "design & quote",
				image: img("1507652313519-d4e9174996dd", 1800),
				imageAlt: "Modern remodeled bathroom",
				formHeading: "It starts with a free, no-pressure design consultation",
				buttonText: "Get My Free Quote",
				consentText: CONSENT,
				formAction: "", // empty → Peak's built-in /api/lead
			},
		},
	],
};

export default landing;
