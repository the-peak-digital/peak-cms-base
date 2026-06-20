import type { Services16Props } from "./schema";

const img = (seed: string) => `https://picsum.photos/seed/${seed}/900/760`;

/** Demo content for Services16 — used by the preview page + make-section script. */
export const sample: Services16Props = {
	badge: "Our Services",
	title: "Electrical Solutions",
	tagline: "From emergency repairs to full installations, we provide electrical services that keep your property safe, powered, and ready for daily use.",
	accent: "#4f46e5",
	cardColor: "#eef0fb",
	cards: [
		{ kind: "text", icon: "planning", title: "Strategic Planning", description: "We plan the safest and most efficient electrical setup for your home or business." },
		{ kind: "image", image: img("elec-generator"), alt: "Technician installing a generator" },
		{ kind: "text", icon: "box", title: "Lighting Installation", description: "Indoor, outdoor, decorative, and security lighting installation with clean finishing." },
		{ kind: "image", image: img("elec-consult"), alt: "Electrician consulting with homeowners" },
		{ kind: "text", icon: "binoculars", title: "Smart Home Setup", description: "Install smart switches, lighting, security devices, and automation systems." },
		{ kind: "image", image: img("elec-lighting"), alt: "Installing pendant lighting" },
	],
};
