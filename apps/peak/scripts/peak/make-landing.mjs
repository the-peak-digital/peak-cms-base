#!/usr/bin/env node
/**
 * Builds a real landing page (not a showcase) by composing blocks with custom
 * content. Test page: a Washington DC kitchen-remodeling landing page focused on
 * "best price in DC" + "best value".
 *
 *   node scripts/peak/make-landing.mjs
 *   PEAK_BASE=https://… PEAK_COOKIE="astro-session=…" node scripts/peak/make-landing.mjs
 */
const BASE = process.env.PEAK_BASE ?? "http://localhost:4321";
const COOKIE = process.env.PEAK_COOKIE;
const PAT = process.env.PEAK_PAT;
const key = () => Math.random().toString(36).slice(2, 10);
const log = (...a) => console.log("[make-landing]", ...a);
const img = (id, w = 1600) => `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

const SLUG = "dc-kitchen-remodeling";
const TITLE = "DC Kitchen Remodeling — Best Price, Best Value";

// ── The page: three blocks with bespoke best-price/best-value copy ───────────
const blocks = [
	{
		type: "peak.hero28",
		node: {
			image: img("1556912173-3bb406ef7e77", 1800),
			imageAlt: "Newly remodeled Washington DC kitchen",
			eyebrow: "WASHINGTON DC KITCHEN REMODELING",
			title: "DC's Best-Value Kitchen Remodeling",
			offer: "Lowest Price Guaranteed in the DMV — Up to 40% Off + Free 3D Design",
			button1Text: "Get Your Free Quote",
			button1Url: "#quote",
			button2Text: "See Our Work",
			button2Url: "#gallery",
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
				{ icon: "star", title: "Custom Cabinets", description: "Solid-wood, soft-close cabinetry built to fit your space and your budget.", linkText: "Learn more", linkUrl: "#", iconColor: "#ff7a18" },
				{ icon: "shield", title: "Countertops", description: "Quartz, granite & marble at wholesale-direct pricing, expertly installed.", linkText: "Learn more", linkUrl: "#", iconColor: "#16c79a" },
				{ icon: "bolt", title: "Flooring & Tile", description: "Hardwood, LVP and backsplash tile built to last for decades.", linkText: "Learn more", linkUrl: "#", iconColor: "#5b5bd6" },
				{ icon: "users", title: "Project Management", description: "One dedicated manager from free quote to final walkthrough.", linkText: "Learn more", linkUrl: "#", iconColor: "#0ea5e9" },
			],
			buttonText: "Get My Free Estimate",
			buttonUrl: "#quote",
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
];

// ── Auth ─────────────────────────────────────────────────────────────────────
let Hjson, Hauth;
if (PAT) {
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Authorization: `Bearer ${PAT}` };
	Hauth = { "X-EmDash-Request": "1", Authorization: `Bearer ${PAT}` };
} else if (COOKIE) {
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Cookie: COOKIE };
	Hauth = { "X-EmDash-Request": "1", Cookie: COOKIE };
} else {
	const auth = await fetch(`${BASE}/_emdash/api/setup/dev-bypass?token=1`);
	const cookie = (auth.headers.get("set-cookie") || "").split(";")[0];
	Hjson = { "Content-Type": "application/json", "X-EmDash-Request": "1", Cookie: cookie };
	Hauth = { "X-EmDash-Request": "1", Cookie: cookie };
}

// ── Publish (create or update + publish) ─────────────────────────────────────
const content = blocks.map((b) => ({ _key: key(), _type: b.type, ...b.node }));
const list = await (await fetch(`${BASE}/_emdash/api/content/pages`, { headers: Hauth })).json();
const existing = (list.data?.items ?? list.items ?? []).find((p) => p.slug === SLUG);
let id;
if (existing) {
	const full = await (await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, { headers: Hauth })).json();
	const item = full.data?.item ?? full.item;
	const rev = full.data?._rev ?? full._rev ?? item._rev;
	await fetch(`${BASE}/_emdash/api/content/pages/${existing.id}`, {
		method: "PUT",
		headers: Hjson,
		body: JSON.stringify({ data: { ...item.data, title: TITLE, content }, _rev: rev }),
	});
	id = existing.id;
} else {
	const cres = await fetch(`${BASE}/_emdash/api/content/pages`, {
		method: "POST",
		headers: Hjson,
		body: JSON.stringify({ slug: SLUG, data: { title: TITLE, content } }),
	});
	const cj = await cres.json();
	id = cj.data?.item?.id ?? cj.item?.id ?? cj.data?.id ?? cj.id;
	if (!id) {
		console.error(`✗ create failed: ${cres.status} ${JSON.stringify(cj).slice(0, 200)}`);
		process.exit(1);
	}
}
await fetch(`${BASE}/_emdash/api/content/pages/${id}/publish`, { method: "POST", headers: Hjson, body: "{}" });
log(`✓ ${blocks.length} blocks → ${BASE}/${SLUG}`);
