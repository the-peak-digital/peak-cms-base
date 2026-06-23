# Peak block catalog

These are the page-building blocks available on this site. To build a page, choose the blocks that best fit the brief and put them in the page's `content` array (in order) when calling the EmDash MCP `content_create` tool on the `pages` collection. Each block below shows its `_type` and a complete example object — copy the shape, replace the text/images with content for the brief, and give every block a unique `_key`.

## Services (Card Row)  `peak.services1`
_Serif headline + supporting copy, then a row of tall image cards_ (category: Sections)

```json
{
  "_type": "peak.services1",
  "_key": "REPLACE",
  "badge": "Our services",
  "title": "What we can do for you",
  "description": "From design to installation, we provide quality fence solutions tailored to your needs.",
  "buttonText": "See our services",
  "buttonUrl": "/services",
  "cards": [
    {
      "image": "https://picsum.photos/seed/fence-design/600/1100",
      "alt": "Custom fence design",
      "label": "Custom fence design",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/fence-repair/600/1100",
      "alt": "Fence repair",
      "label": "Fence repair",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/fence-install/600/1100",
      "alt": "Fence installation",
      "label": "Fence installation",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/staining/600/1100",
      "alt": "Staining & sealing",
      "label": "Staining & sealing",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/maintenance/600/1100",
      "alt": "Maintenance services",
      "label": "Maintenance services",
      "url": "#"
    }
  ],
  "bg": "#ece3d6",
  "accent": "#1c1b19"
}
```

## Services (Stacking List)  `peak.services10`
_Dark sticky-stacking service rows that collapse to strips on scroll_ (category: Sections)

```json
{
  "_type": "peak.services10",
  "_key": "REPLACE",
  "title": "Our Services",
  "taglineLead": "Building experiences that",
  "taglineAccent": "connect people and brands.",
  "accent": "#c2f53c",
  "bg": "#163026",
  "items": [
    {
      "title": "Branding",
      "description": "Working with StellarForge was a game-changer. Their innovative branding and collaborative spirit were invaluable. I always recommend them to my network.",
      "tags": "Brand audit, Customer journey, Brand strategy, Visual identity, Brand guidelines, Brand assets",
      "image": "https://picsum.photos/seed/branding/700/700",
      "alt": "Branding"
    },
    {
      "title": "Product Design",
      "description": "AirPixel was crucial to our success. Their creativity and fun approach truly made a difference. I recommend them to every founder I mentor.",
      "tags": "Brand audit, Customer journey, Brand strategy, Visual identity, Brand guidelines, Brand assets",
      "image": "https://picsum.photos/seed/product-design/700/700",
      "alt": "Product design"
    },
    {
      "title": "Website Design",
      "description": "AirPixel was crucial to our success. Their creativity and fun approach truly made a difference. I recommend them to every founder I mentor.",
      "tags": "Brand audit, Customer journey, Brand strategy, Visual identity, Brand guidelines, Brand assets",
      "image": "https://picsum.photos/seed/website-design/700/700",
      "alt": "Website design"
    },
    {
      "title": "No Code Development",
      "description": "Working with StellarForge was a game-changer. Their innovative branding and collaborative spirit were invaluable. I always recommend them to my network.",
      "tags": "Brand audit, Customer journey, Brand strategy, Visual identity, Brand guidelines, Brand assets",
      "image": "https://picsum.photos/seed/nocode/700/700",
      "alt": "No code development"
    },
    {
      "title": "Webflow & CMS",
      "description": "A reliable partner from kickoff to launch. Clear communication, sharp execution, and a finish that exceeded what we imagined.",
      "tags": "Brand audit, Customer journey, Brand strategy, Visual identity, Brand guidelines, Brand assets",
      "image": "https://picsum.photos/seed/webflow/700/700",
      "alt": "Webflow and CMS"
    }
  ]
}
```

## Services (Accordion Row)  `peak.services11`
_Header + horizontal accordion cards; hover opens one, closes the other_ (category: Sections)

```json
{
  "_type": "peak.services11",
  "_key": "REPLACE",
  "badge": "What we do",
  "title": "Our services",
  "tagline": "We deliver strategic digital services designed to improve performance, usability, and long-term growth.",
  "cards": [
    {
      "title": "Web Design",
      "description": "Visually strong websites created to communicate clearly and perform across all devices.",
      "image": "https://picsum.photos/seed/svc-webdesign/900/1000",
      "alt": "Web design"
    },
    {
      "title": "UI/UX Design",
      "description": "Thoughtfully structured interfaces built to guide users smoothly through digital journeys.",
      "image": "https://picsum.photos/seed/svc-uiux/900/1000",
      "alt": "UI/UX design"
    },
    {
      "title": "Web Development",
      "description": "Robust, fast, and scalable builds engineered to bring your designs to life flawlessly.",
      "image": "https://picsum.photos/seed/svc-webdev/900/1000",
      "alt": "Web development"
    },
    {
      "title": "AI Automation",
      "description": "Smart workflows and AI tooling that remove busywork and accelerate your team's output.",
      "image": "https://picsum.photos/seed/svc-ai/900/1000",
      "alt": "AI automation"
    }
  ]
}
```

## Services (Hover List)  `peak.services12`
_Left service list; hovering swaps the right image + description_ (category: Sections)

```json
{
  "_type": "peak.services12",
  "_key": "REPLACE",
  "title": "Crafting Spaces with Purpose",
  "subtitle": "We design refined environments where architecture, comfort, and functionality come together to create a truly elevated living experience.",
  "descriptionLabel": "Description",
  "services": [
    {
      "title": "Interior Styling",
      "image": "https://picsum.photos/seed/interior-styling/1000/720",
      "alt": "Interior styling",
      "description": "Every space we create is thoughtfully designed to reflect both beauty and functionality. From material selection to lighting and layout, we ensure each detail enhances comfort, style, and everyday living.\n\nOur approach focuses on balance — combining modern aesthetics with practical design solutions to create environments that feel both luxurious and lived-in."
    },
    {
      "title": "Exterior Architecture",
      "image": "https://picsum.photos/seed/exterior-arch/1000/720",
      "alt": "Exterior architecture",
      "description": "We design exterior spaces that combine modern architecture, durable materials, and visual balance, creating refined structures that feel timeless, practical, welcoming, and connected to everyday living.\n\nWe focus on creating balanced structures that combine modern architectural character with timeless design principles, resulting in spaces that feel refined, welcoming, and built to last."
    },
    {
      "title": "Space Planning",
      "image": "https://picsum.photos/seed/space-planning/1000/720",
      "alt": "Space planning",
      "description": "Smart, efficient layouts that make every square metre count. We map circulation, zoning, and flow so each room works hard while feeling open and effortless.\n\nGood planning is invisible — you simply feel that a space works. That's the standard we design to on every project."
    },
    {
      "title": "Structural Design",
      "image": "https://picsum.photos/seed/structural-design/1000/720",
      "alt": "Structural design",
      "description": "Engineering and aesthetics in lockstep. We design structures that are sound, efficient, and quietly beautiful — letting the architecture breathe without compromise.\n\nFrom load paths to finishes, every decision supports a result that is as durable as it is refined."
    },
    {
      "title": "Interior Design",
      "image": "https://picsum.photos/seed/interior-design/1000/720",
      "alt": "Interior design",
      "description": "Complete interiors composed with intent — palette, texture, furniture, and light working as one. We craft rooms that feel collected, calm, and unmistakably yours.\n\nThe result is a home that looks considered and feels effortless to live in, day after day."
    }
  ]
}
```

## Services (Stacking Panels)  `peak.services13`
_Dark header + full-screen image panels that stack up on scroll_ (category: Sections)

```json
{
  "_type": "peak.services13",
  "_key": "REPLACE",
  "badge": "Our Service",
  "title": "Logistics Solutions Designed for Every Scale",
  "bg": "#0e0e0e",
  "items": [
    {
      "title": "Ocean Freight",
      "description": "International ocean freight solutions built for high-volume cargo movement, global trade operations, and reliable cross-border shipping coordination.",
      "features": "Global Coverage, Port Coordination, Container Tracking",
      "image": "https://picsum.photos/seed/ocean-freight/1600/1000",
      "alt": "Ocean freight container ship"
    },
    {
      "title": "Air Freight",
      "description": "Fast and efficient air freight services tailored for urgent deliveries, extensive route options, and time-sensitive logistics.",
      "features": "Speed Optimization, Customs Clearance, Real-time Monitoring",
      "image": "https://picsum.photos/seed/air-freight/1600/1000",
      "alt": "Air freight cargo plane"
    },
    {
      "title": "Road Freight",
      "description": "Reliable road freight solutions for domestic transport, flexible scheduling, and cost-effective shipping options for various cargo types.",
      "features": "Route Planning, Load Optimization, Delivery Tracking",
      "image": "https://picsum.photos/seed/road-freight/1600/1000",
      "alt": "Road freight truck on highway"
    },
    {
      "title": "Warehousing",
      "description": "Secure, scalable storage and fulfilment with inventory visibility, smart slotting, and same-day dispatch from strategically located hubs.",
      "features": "Inventory Control, Smart Slotting, Same-day Dispatch",
      "image": "https://picsum.photos/seed/warehousing/1600/1000",
      "alt": "Warehouse logistics"
    }
  ]
}
```

## Services (Stacking Showcase)  `peak.services14`
_Header + light panels with image + thumbnails that stack up on scroll_ (category: Sections)

```json
{
  "_type": "peak.services14",
  "_key": "REPLACE",
  "badge": "Services",
  "titleLead": "We craft visual stories with passion",
  "tagline": "From the first click to the final edit, we pour relentless passion into every single visual story we create, beautifully and authentically",
  "accent": "#ff4127",
  "panelColor": "#f3f2f0",
  "items": [
    {
      "title": "Wedding stories",
      "description": "We preserve every tender glance, stolen kiss, and joyful tear — crafting a timeless wedding story you will cherish absolutely forever.",
      "features": "Bridal Portraits, Ceremony Coverage, Reception Moments, Couple Sessions",
      "image": "https://picsum.photos/seed/wedding-main/1200/900",
      "alt": "Wedding photography",
      "thumb1": "https://picsum.photos/seed/wedding-t1/240/160",
      "thumb2": "https://picsum.photos/seed/wedding-t2/240/160",
      "thumb3": "https://picsum.photos/seed/wedding-t3/240/160"
    },
    {
      "title": "Portrait sessions",
      "description": "We capture raw human emotion, personality, and depth through carefully composed portraits that tell your most authentic personal story.",
      "features": "Executive Portraits, Fine Art, Family Portraits, Newborn Portraits",
      "image": "https://picsum.photos/seed/portrait-main/1200/900",
      "alt": "Portrait photography",
      "thumb1": "https://picsum.photos/seed/portrait-t1/240/160",
      "thumb2": "https://picsum.photos/seed/portrait-t2/240/160",
      "thumb3": "https://picsum.photos/seed/portrait-t3/240/160"
    },
    {
      "title": "Brand visuals",
      "description": "From product shots to campaign imagery, we craft powerful brand visuals that communicate your identity and captivate your ideal audience.",
      "features": "Campaign Shoots, Brand Storytelling, Social Content, Commercial Imagery",
      "image": "https://picsum.photos/seed/brand-main/1200/900",
      "alt": "Brand visuals",
      "thumb1": "https://picsum.photos/seed/brand-t1/240/160",
      "thumb2": "https://picsum.photos/seed/brand-t2/240/160",
      "thumb3": "https://picsum.photos/seed/brand-t3/240/160"
    }
  ]
}
```

## Services (Sticky Works)  `peak.services15`
_Sticky dark left panel + scrolling column of project image cards_ (category: Sections)

```json
{
  "_type": "peak.services15",
  "_key": "REPLACE",
  "badge": "05/ Works",
  "text": "A curated selection of brand and digital work built with clarity, intention, and discipline.",
  "buttonText": "View All Works",
  "buttonUrl": "/works",
  "bg": "#141414",
  "works": [
    {
      "label": "CCNIA",
      "image": "https://picsum.photos/seed/work-ccnia/1000/1100",
      "alt": "CCNIA project",
      "url": "#"
    },
    {
      "label": "Refill",
      "image": "https://picsum.photos/seed/work-refill/1000/1100",
      "alt": "Refill project",
      "url": "#"
    },
    {
      "label": "Lumen",
      "image": "https://picsum.photos/seed/work-lumen/1000/1100",
      "alt": "Lumen project",
      "url": "#"
    },
    {
      "label": "Haven",
      "image": "https://picsum.photos/seed/work-haven/1000/1100",
      "alt": "Haven project",
      "url": "#"
    },
    {
      "label": "Atelier",
      "image": "https://picsum.photos/seed/work-atelier/1000/1100",
      "alt": "Atelier project",
      "url": "#"
    }
  ]
}
```

## Planning / set-square  `peak.services16`
_Header + alternating text/image grid that loads from the middle out_ (category: Sections)

```json
{
  "_type": "peak.services16",
  "_key": "REPLACE",
  "badge": "Our Services",
  "title": "Electrical Solutions",
  "tagline": "From emergency repairs to full installations, we provide electrical services that keep your property safe, powered, and ready for daily use.",
  "accent": "#4f46e5",
  "cardColor": "#eef0fb",
  "cards": [
    {
      "kind": "text",
      "icon": "planning",
      "title": "Strategic Planning",
      "description": "We plan the safest and most efficient electrical setup for your home or business."
    },
    {
      "kind": "image",
      "image": "https://picsum.photos/seed/elec-generator/900/760",
      "alt": "Technician installing a generator"
    },
    {
      "kind": "text",
      "icon": "box",
      "title": "Lighting Installation",
      "description": "Indoor, outdoor, decorative, and security lighting installation with clean finishing."
    },
    {
      "kind": "image",
      "image": "https://picsum.photos/seed/elec-consult/900/760",
      "alt": "Electrician consulting with homeowners"
    },
    {
      "kind": "text",
      "icon": "binoculars",
      "title": "Smart Home Setup",
      "description": "Install smart switches, lighting, security devices, and automation systems."
    },
    {
      "kind": "image",
      "image": "https://picsum.photos/seed/elec-lighting/900/760",
      "alt": "Installing pendant lighting"
    }
  ]
}
```

## Pie chart  `peak.services2`
_Centered header + row of white icon cards + center CTA_ (category: Sections)

```json
{
  "_type": "peak.services2",
  "_key": "REPLACE",
  "titleLead": "Our",
  "titleHighlight": "Services",
  "description": "Our mission is to drive progress and enhance the lives of our customers by delivering superior products and services that exceed expectations.",
  "cards": [
    {
      "icon": "pie",
      "title": "Title Goes Here",
      "description": "Tailored to meet individual needs perfectly balanced.",
      "linkText": "Read more",
      "linkUrl": "#"
    },
    {
      "icon": "globe",
      "title": "Title Goes Here",
      "description": "Tailored to meet individual needs perfectly balanced.",
      "linkText": "Read more",
      "linkUrl": "#"
    },
    {
      "icon": "users",
      "title": "Title Goes Here",
      "description": "Tailored to meet individual needs perfectly balanced.",
      "linkText": "Read more",
      "linkUrl": "#"
    },
    {
      "icon": "voicemail",
      "title": "Title Goes Here",
      "description": "Tailored to meet individual needs perfectly balanced.",
      "linkText": "Read more",
      "linkUrl": "#"
    }
  ],
  "buttonText": "Hire Us Today",
  "buttonUrl": "/contact",
  "accent": "#f5163f",
  "bg": "#f1f2f4"
}
```

## Megaphone  `peak.services3`
_Dark image promo panel + pastel category cards with tag chips_ (category: Sections)

```json
{
  "_type": "peak.services3",
  "_key": "REPLACE",
  "image": "https://picsum.photos/seed/vr-services/700/1100",
  "imageAlt": "Person using a VR headset",
  "title": "Our Services",
  "description": "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since",
  "buttonText": "Explore All Our Services",
  "buttonUrl": "/services",
  "accent": "#f7941e",
  "cards": [
    {
      "icon": "megaphone",
      "title": "Enterprise Services",
      "tags": "Mobility, Web Development, IOT"
    },
    {
      "icon": "buildings",
      "title": "Emerging Technologies",
      "tags": "Blockchain, Augmented Reality, Virtual Reality"
    },
    {
      "icon": "iot",
      "title": "Internet of Things",
      "tags": "Smart City, Digital Signage, Smart Parking"
    },
    {
      "icon": "headset",
      "title": "Consulting & Discovery",
      "tags": "Legal, Business, Ecommerce Solution"
    },
    {
      "icon": "cloud",
      "title": "Cloud & DevOps",
      "tags": "Amazon Web Services, Dacker, Jenkins"
    },
    {
      "icon": "web",
      "title": "Web / CMS & PWA",
      "tags": "Wordpress, Cake PHP, Bootstrap"
    }
  ]
}
```

## Services (Hover Spotlight)  `peak.services4`
_Dark section; hovering a service crossfades the center image_ (category: Sections)

```json
{
  "_type": "peak.services4",
  "_key": "REPLACE",
  "title": "Services",
  "intro": "Design support that feels thoughtful, focused, and built around your goals. Whether you're starting fresh or refining something live — I'll meet you where you are and help move it forward.",
  "buttonText": "Start Your Project",
  "buttonUrl": "/contact",
  "accent": "#ff5419",
  "bg": "#141414",
  "services": [
    {
      "title": "Web Design & Layouts",
      "description": "Beautiful websites that are easy to explore. From landing pages to full sites, I design layouts that feel clean, modern, and made for humans — not just pixels.",
      "image": "https://picsum.photos/seed/svc-web/900/1100",
      "imageAlt": "Web design layouts"
    },
    {
      "title": "Product UI Design",
      "description": "Interfaces that feel natural to use. I help apps and platforms look better and work smarter. Every screen is designed with usability, flow.",
      "image": "https://picsum.photos/seed/svc-ui/900/1100",
      "imageAlt": "Product UI design"
    },
    {
      "title": "Creative Direction",
      "description": "Helping ideas take shape — visually and strategically. I support founders, studios, and teams by shaping the creative side of your brand — from first ideas to final polish.",
      "image": "https://picsum.photos/seed/svc-creative/900/1100",
      "imageAlt": "Creative direction"
    },
    {
      "title": "Design Audits & Fixes",
      "description": "Quick wins that make a real difference. Already have something live? I'll review, refine, and rebuild key sections to improve usability, visuals, and performance.",
      "image": "https://picsum.photos/seed/svc-audit/900/1100",
      "imageAlt": "Design audits and fixes"
    }
  ]
}
```

## Services (Numbered Panels)  `peak.services5`
_Numbered light panels with dark inner cards, badges + accent CTA_ (category: Sections)

```json
{
  "_type": "peak.services5",
  "_key": "REPLACE",
  "title": "World-Class Facilities",
  "intro": "ArcClub offers pro courts, modern locker rooms, and spacious recovery zones specifically designed to help you play your very best.",
  "buttonText": "Read More",
  "accent": "#bdf739",
  "cardColor": "#1f4030",
  "panelColor": "#eeeeec",
  "cards": [
    {
      "tagline": "Play Like the Pros",
      "title": "Pro Tennis Courts",
      "badge": "Pro Level",
      "description": "Clay and hard courts with professional-grade lighting beautifully, expertly installed",
      "url": "#"
    },
    {
      "tagline": "Train Smarter, Not Harder",
      "title": "Coaching Studio",
      "badge": "Pro Level",
      "description": "Private coaching sessions, comprehensive and detailed video analysis & planning strategies",
      "url": "#"
    },
    {
      "tagline": "Built for Performance",
      "title": "Fitness Zone",
      "badge": "Pro Level",
      "description": "Strength, cardio, and specialized tennis-specific training equipment tools for athletes",
      "url": "#"
    },
    {
      "tagline": "Reset in Style",
      "title": "Locker Rooms",
      "badge": "Pro Level",
      "description": "Clean, private, and spa-inspired for your ultimate comfort and deep relaxation experience.",
      "url": "#"
    }
  ]
}
```

## Services (Sticky Showcase)  `peak.services6`
_Sticky left intro + scrolling right grid of image cards (up to 10)_ (category: Sections)

```json
{
  "_type": "peak.services6",
  "_key": "REPLACE",
  "badge": "Smile Success Stories",
  "title": "Where Healthy Smiles Begin",
  "description": "Cosmetic dentistry is gaining popularity as people seek confident, beautiful smiles. Procedures like teeth whitening, veneers, and digital smile design are now more accessible.",
  "buttonText": "Explore More Cases",
  "buttonUrl": "/cases",
  "accent": "#16a6da",
  "cards": [
    {
      "image": "https://picsum.photos/seed/dental-1/700/560",
      "label": "Shine & Smile Dental",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-2/700/560",
      "label": "Gum Disease Monitor",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-3/700/560",
      "label": "Virtual Dental Assistant",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-4/700/560",
      "label": "Smile Craft Dentistry",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-5/700/560",
      "label": "Smart Brush System",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-6/700/560",
      "label": "Smart Dental Diagnosis",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-7/700/560",
      "label": "Healthy Teeth Solutions",
      "url": "#"
    },
    {
      "image": "https://picsum.photos/seed/dental-8/700/560",
      "label": "Dental Risk Analyzer",
      "url": "#"
    }
  ]
}
```

## Services (Numbered Image Cards)  `peak.services7`
_Centered heading + numbered cards with title, blurb and bottom image_ (category: Sections)

```json
{
  "_type": "peak.services7",
  "_key": "REPLACE",
  "title": "What I Can Do for You",
  "cardColor": "#fbf9f6",
  "cards": [
    {
      "title": "Website Design",
      "description": "Modern, clean & strategic layouts that represent your brand at its best.",
      "image": "https://picsum.photos/seed/ws-design/700/700",
      "alt": "Website design"
    },
    {
      "title": "Landing Page Design",
      "description": "High-converting sales pages built to turn visitors into customers.",
      "image": "https://picsum.photos/seed/ws-landing/700/700",
      "alt": "Landing page design"
    },
    {
      "title": "Website Redesign",
      "description": "Upgrade your outdated website into a premium digital experience.",
      "image": "https://picsum.photos/seed/ws-redesign/700/700",
      "alt": "Website redesign"
    }
  ]
}
```

## Services (Tabbed Panels)  `peak.services8`
_Centered header + tab bar that swaps a 2-column service panel_ (category: Sections)

```json
{
  "_type": "peak.services8",
  "_key": "REPLACE",
  "badge": "Services",
  "title": "What we do",
  "subtitle": "Tell us what you need, and we'll find the right expertise to make it happen flawlessly.",
  "priceLabel": "Price",
  "timelineLabel": "Timeline",
  "accent": "#1c1b19",
  "tabs": [
    {
      "label": "Kitchens",
      "title": "Kitchens",
      "description": "We design and build beautiful kitchens tailored to your lifestyle. From modern open-plan spaces to timeless family kitchens, our team focuses on smart storage, durable materials, and a finish that feels both elegant and practical.",
      "price": "from 5 000$",
      "timeline": "2 month avg.",
      "features": "Custom Kitchen Design, Premium stone & natural wood, Design, build & installation, Premium finishes",
      "image": "https://picsum.photos/seed/kitchen/900/800",
      "alt": "Kitchen build"
    },
    {
      "label": "Bathrooms",
      "title": "Bathrooms",
      "description": "Spa-inspired bathrooms that balance comfort and function. We handle everything from layout and plumbing to tiling and lighting for a space you'll love every day.",
      "price": "from 3 500$",
      "timeline": "5 week avg.",
      "features": "Wet rooms, Underfloor heating, Bespoke vanities, Premium finishes",
      "image": "https://picsum.photos/seed/bathroom/900/800",
      "alt": "Bathroom build"
    },
    {
      "label": "Loft Conversions",
      "title": "Loft Conversions",
      "description": "Turn unused roof space into a bright bedroom, studio or office. Structural work, insulation, stairs and finishing — handled end to end.",
      "price": "from 18 000$",
      "timeline": "3 month avg.",
      "features": "Structural calcs, Dormer & Velux, Staircase design, Building control",
      "image": "https://picsum.photos/seed/loft/900/800",
      "alt": "Loft conversion"
    },
    {
      "label": "Extensions",
      "title": "Extensions",
      "description": "Single or double-storey extensions that add space and value. We manage planning, build and finish so your home grows seamlessly.",
      "price": "from 25 000$",
      "timeline": "4 month avg.",
      "features": "Planning support, Steel & groundwork, Glazing & roofing, Full project management",
      "image": "https://picsum.photos/seed/extension/900/800",
      "alt": "Home extension"
    },
    {
      "label": "Restorations",
      "title": "Restorations",
      "description": "Careful restoration of period and heritage properties — preserving character while bringing comfort up to modern standards.",
      "price": "from 12 000$",
      "timeline": "3 month avg.",
      "features": "Heritage materials, Plaster & cornicing, Sash windows, Conservation-grade finishes",
      "image": "https://picsum.photos/seed/restore/900/800",
      "alt": "Property restoration"
    },
    {
      "label": "External Works",
      "title": "External Works",
      "description": "Driveways, patios, landscaping and rendering that lift your home's kerb appeal and durability.",
      "price": "from 4 000$",
      "timeline": "4 week avg.",
      "features": "Driveways & patios, Rendering, Landscaping, Drainage",
      "image": "https://picsum.photos/seed/external/900/800",
      "alt": "External works"
    }
  ]
}
```

## Services (Scroll Gallery)  `peak.services9`
_Pinned section; card row scrolls horizontally as you scroll the page_ (category: Sections)

```json
{
  "_type": "peak.services9",
  "_key": "REPLACE",
  "title": "What we help with",
  "cards": [
    {
      "label": "Wellness Exams",
      "image": "https://picsum.photos/seed/vet-1/800/900",
      "alt": "Wellness exam"
    },
    {
      "label": "Vaccinations",
      "image": "https://picsum.photos/seed/vet-2/800/900",
      "alt": "Vaccinations"
    },
    {
      "label": "Dental Care",
      "image": "https://picsum.photos/seed/vet-3/800/900",
      "alt": "Dental care"
    },
    {
      "label": "Diagnostics",
      "image": "https://picsum.photos/seed/vet-4/800/900",
      "alt": "Diagnostics"
    },
    {
      "label": "Surgery",
      "image": "https://picsum.photos/seed/vet-5/800/900",
      "alt": "Surgery"
    },
    {
      "label": "Puppy & Kitten Care",
      "image": "https://picsum.photos/seed/vet-6/800/900",
      "alt": "Puppy and kitten care"
    },
    {
      "label": "Senior Pet Care",
      "image": "https://picsum.photos/seed/vet-7/800/900",
      "alt": "Senior pet care"
    },
    {
      "label": "Urgent Care",
      "image": "https://picsum.photos/seed/vet-8/800/900",
      "alt": "Urgent care"
    }
  ]
}
```

_16 blocks._
