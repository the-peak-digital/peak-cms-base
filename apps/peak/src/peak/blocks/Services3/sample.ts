import type { Services3Props } from "./schema";

/** Demo content for Services3 — used by the preview page + make-section script. */
export const sample: Services3Props = {
	image: "https://picsum.photos/seed/vr-services/700/1100",
	imageAlt: "Person using a VR headset",
	title: "Our Services",
	description:
		"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
	buttonText: "Explore All Our Services",
	buttonUrl: "/services",
	accent: "#f7941e",
	cards: [
		{ icon: "megaphone", title: "Enterprise Services", tags: "Mobility, Web Development, IOT" },
		{ icon: "buildings", title: "Emerging Technologies", tags: "Blockchain, Augmented Reality, Virtual Reality" },
		{ icon: "iot", title: "Internet of Things", tags: "Smart City, Digital Signage, Smart Parking" },
		{ icon: "headset", title: "Consulting & Discovery", tags: "Legal, Business, Ecommerce Solution" },
		{ icon: "cloud", title: "Cloud & DevOps", tags: "Amazon Web Services, Dacker, Jenkins" },
		{ icon: "web", title: "Web / CMS & PWA", tags: "Wordpress, Cake PHP, Bootstrap" },
	],
};
