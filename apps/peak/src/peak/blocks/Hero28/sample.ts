import type { Hero28Props } from "./schema";

/** Demo content. Swap the image for your own; set real social URLs. */
export const sample: Hero28Props = {
	image: "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=1800&q=70&auto=format&fit=crop",
	imageAlt: "Modern kitchen with stone countertops",
	eyebrow: "PREMIUM SELECTION OF COUNTERTOPS",
	title: "Virginia Beach's Premier Countertop Destination",
	offer: "Exclusive Virginia Offer: Up to 40% OFF Countertops & Installation",
	button1Text: "Schedule Appointment",
	button1Url: "/book",
	button2Text: "View Our Stone Collection",
	button2Url: "/collection",
	features: [
		{ icon: "🖼", title: "Kitchen Visualizer", text: "See how marble, granite, or quartz looks in your kitchen." },
		{ icon: "🏛", title: "Visit Our Showroom", text: "Explore premium stone slabs in person at our Virginia showroom." },
	],
	socials: [
		{ icon: "📘", url: "#" },
		{ icon: "📷", url: "#" },
		{ icon: "📞", url: "#" },
		{ icon: "📍", url: "#" },
		{ icon: "✉️", url: "#" },
	],
};
