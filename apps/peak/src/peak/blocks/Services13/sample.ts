import type { Services13Props } from "./schema";

/** Demo content for Services13 — used by the preview page + make-section script. */
export const sample: Services13Props = {
	badge: "Our Service",
	title: "Logistics Solutions Designed for Every Scale",
	bg: "#0e0e0e",
	items: [
		{
			title: "Ocean Freight",
			description: "International ocean freight solutions built for high-volume cargo movement, global trade operations, and reliable cross-border shipping coordination.",
			features: "Global Coverage, Port Coordination, Container Tracking",
			image: "https://picsum.photos/seed/ocean-freight/1600/1000",
			alt: "Ocean freight container ship",
		},
		{
			title: "Air Freight",
			description: "Fast and efficient air freight services tailored for urgent deliveries, extensive route options, and time-sensitive logistics.",
			features: "Speed Optimization, Customs Clearance, Real-time Monitoring",
			image: "https://picsum.photos/seed/air-freight/1600/1000",
			alt: "Air freight cargo plane",
		},
		{
			title: "Road Freight",
			description: "Reliable road freight solutions for domestic transport, flexible scheduling, and cost-effective shipping options for various cargo types.",
			features: "Route Planning, Load Optimization, Delivery Tracking",
			image: "https://picsum.photos/seed/road-freight/1600/1000",
			alt: "Road freight truck on highway",
		},
		{
			title: "Warehousing",
			description: "Secure, scalable storage and fulfilment with inventory visibility, smart slotting, and same-day dispatch from strategically located hubs.",
			features: "Inventory Control, Smart Slotting, Same-day Dispatch",
			image: "https://picsum.photos/seed/warehousing/1600/1000",
			alt: "Warehouse logistics",
		},
	],
};
