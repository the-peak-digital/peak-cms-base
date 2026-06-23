const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;
const CONSENT =
	"Yes, I agree to receive text messages about my free quote. Consent is not a condition of purchase. Reply STOP to opt out. Msg & data rates may apply.";

/** Washington DC kitchen-remodeling landing — best price / best value. */
export const landing = {
	slug: "dc-kitchen-remodeling",
	title: "DC Kitchen Remodeling — Best Price, Best Value",
	blocks: [
		{
			type: "peak.hero28",
			node: {
				image: img("1556912173-3bb406ef7e77", 1800),
				imageAlt: "Newly remodeled Washington DC kitchen",
				eyebrow: "WASHINGTON DC KITCHEN REMODELING",
				title: "DC's Best-Value Kitchen Remodeling",
				offer: "Lowest Price Guaranteed in the DMV — Up to 40% Off + Free 3D Design",
				button1Text: "Get Your Free Quote",
				button1Url: "#lead",
				button2Text: "See Our Work",
				button2Url: "#lead",
				features: [
					{ icon: "visualizer", title: "Free 3D Design", text: "See your new kitchen before a single cabinet goes in." },
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
				titleHighlight: "Kitchen Needs",
				description: "One trusted crew for the whole remodel — at the best price in Washington DC.",
				cards: [
					{ icon: "star", title: "Custom Cabinets", description: "Solid-wood, soft-close cabinetry built to fit your space and your budget.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#ff7a18" },
					{ icon: "shield", title: "Countertops", description: "Quartz, granite & marble at wholesale-direct pricing, expertly installed.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#16c79a" },
					{ icon: "bolt", title: "Flooring & Tile", description: "Hardwood, LVP and backsplash tile built to last for decades.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#5b5bd6" },
					{ icon: "users", title: "Project Management", description: "One dedicated manager from free quote to final walkthrough.", linkText: "Learn more", linkUrl: "#lead", iconColor: "#0ea5e9" },
				],
				buttonText: "Get My Free Estimate",
				buttonUrl: "#lead",
				accent: "#ff5419",
				bg: "#f1f2f4",
			},
		},
		{
			type: "peak.hero29",
			node: {
				eyebrow: "Best Value in the DMV",
				title: "DC Homeowners Trust Us for Honest, Affordable Kitchens",
				subtitle:
					"Hundreds of Washington DC families have upgraded their kitchens with us — on time, on budget, and at the best price in the area. Ready for a free quote? Call us today at",
				phone: "(202) 555-1234",
				avatars: [
					{ url: "https://i.pravatar.cc/100?img=15", alt: "Reviewer" },
					{ url: "https://i.pravatar.cc/100?img=33", alt: "Reviewer" },
					{ url: "https://i.pravatar.cc/100?img=51", alt: "Reviewer" },
					{ url: "https://i.pravatar.cc/100?img=8", alt: "Reviewer" },
				],
				stars: 5,
				reviewsText: "473 Google Reviews",
				images: [
					{ url: img("1600489000022-c2086d79f9d4", 800), alt: "Remodeled kitchen" },
					{ url: img("1565538810643-b5bdb714032a", 800), alt: "Modern kitchen island" },
					{ url: img("1600585154526-990dced4db0d", 800), alt: "Bright kitchen with new countertops" },
				],
				accent: "#ff5419",
			},
		},
		{
			type: "peak.hero27",
			node: {
				title: "Get your free kitchen",
				titleAccent: "design & quote",
				image: img("1556909114-f6e7ad7d3136", 1800),
				imageAlt: "Modern remodeled kitchen",
				formHeading: "It starts with a free, no-pressure design consultation",
				buttonText: "Get My Free Quote",
				consentText: CONSENT,
				formAction: "", // empty → Peak's built-in /api/lead
			},
		},
	],
};

export default landing;
