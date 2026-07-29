export interface Solution {
  id: string;
  tier: 'Residential' | 'Commercial' | 'Industrial';
  category: string;
  name: string;
  description: string;
  image: string;
}

export interface Brand {
  name: string;
  logo: string;
}

export interface Service {
  title: string;
  description: string;
  iconName: string;
}

export interface Review {
  name: string;
  role: string;
  comment: string;
  rating: number;
  date: string;
}

export interface Inspiration {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  colors: string[]; // hex codes
}

export interface Project {
  id: string;
  title: string;
  category: string;
  sector: 'Residential' | 'Commercial' | 'Industrial';
  scope: string;
  description: string;
  image: string;
  beforeImage?: string;
  compare?: {
    fromLabel: string;
    fromHex: string;
    toLabel: string;
    toHex: string;
  };
  products: string[];
}

/* ─────────────────────────────────────────────────
   SOLUTIONS — Curated market tier surface solutions.
   ───────────────────────────────────────────────── */

export const SOLUTIONS: Solution[] = [
  // ── Residential ──────────────────────────────
  {
    id: "res-interior",
    tier: "Residential",
    category: "Interior Finishes",
    name: "Premium Interior Wall Systems",
    description: "Luxury emulsions, anti-bacterial coatings, and low-VOC formulations for healthy, beautiful living spaces. Washable, stain-resistant, and architect-specified.",
    image: "/images/painted_rooms.png"
  },
  {
    id: "res-exterior",
    tier: "Residential",
    category: "Exterior Protection",
    name: "Exterior Weatherproofing Systems",
    description: "High-durability facade coatings with UV resistance, anti-algae technology, and 10-year performance warranties against cracking and peeling.",
    image: "/images/hero_banner.png"
  },
  {
    id: "res-waterproof",
    tier: "Residential",
    category: "Waterproofing",
    name: "Structural Waterproofing Solutions",
    description: "Scientific damp-proofing using elastomeric membranes. Treatment for rising damp, terrace leakage, bathroom seepage, and structural crack bridging.",
    image: "/images/sol_waterproofing.jpg"
  },
  {
    id: "res-texture",
    tier: "Residential",
    category: "Luxury Finishes",
    name: "Decorative Textures & Designer Walls",
    description: "Metallic, marble-effect, microcement, and artisanal plaster finishes. Transform accent walls into signature design statements.",
    image: "/images/sol_texture.jpg"
  },
  // ── Commercial ───────────────────────────────
  {
    id: "com-office",
    tier: "Commercial",
    category: "Office & Corporate",
    name: "Office & Corporate Interiors",
    description: "Durable, low-maintenance wall systems for open-plan offices, executive suites, and reception areas. Specified for high-traffic durability and professional aesthetics.",
    image: "/images/sol_office_interior.png"
  },
  {
    id: "com-hospitality",
    tier: "Commercial",
    category: "Hospitality & Retail",
    name: "Hotels, Restaurants & Retail Spaces",
    description: "Premium decorative finishes for lobbies, dining areas, and customer-facing retail environments. Stain-resistant, easy to maintain, and visually striking.",
    image: "/images/sol_hospitality.jpg"
  },
  {
    id: "com-institution",
    tier: "Commercial",
    category: "Institutional",
    name: "Schools, Hospitals & Public Buildings",
    description: "Anti-bacterial, hypoallergenic, and easy-clean coating systems formulated for healthcare, educational, and institutional environments with strict hygiene standards.",
    image: "/images/sol_institutional.png"
  },
  // ── Industrial ───────────────────────────────
  {
    id: "ind-floor",
    tier: "Industrial",
    category: "Floor Coatings",
    name: "Epoxy & Polyurethane Floor Systems",
    description: "High-performance floor coatings for warehouses, factories, parking structures, and showrooms. Chemical-resistant, anti-skid, and engineered for heavy traffic.",
    image: "/images/sol_epoxy_floor.png"
  },
  {
    id: "ind-protective",
    tier: "Industrial",
    category: "Protective Coatings",
    name: "Anti-Corrosion & Protective Systems",
    description: "Industrial-grade protective coatings for steel structures, pipelines, tanks, and machinery. Formulated for extreme weather, chemical exposure, and marine environments.",
    image: "/images/sol_protective_coat.png"
  }
];

export const BRANDS: Brand[] = [
  { name: "Berger Paints", logo: "/images/logo.png" }
];

export const SERVICES: Service[] = [
  {
    title: "Precision Colour Matching",
    description: "In-store computerised tinting with access to 2,500+ shades. Every formula mixed from genuine Berger bases to ensure exact on-wall accuracy.",
    iconName: "Palette"
  },
  {
    title: "Surface Assessment & Diagnostics",
    description: "Professional site visits with electronic moisture meters. We diagnose damp points, structural cracks, and substrate conditions before recommending any coating system.",
    iconName: "CheckCircle"
  },
  {
    title: "Project Quantity Engineering",
    description: "Coverage-index calculations mapped to your wall areas, product types, and application coats. Eliminates waste and prevents mid-project shortfalls.",
    iconName: "Calculator"
  },
  {
    title: "Project Logistics & Delivery",
    description: "Coordinated dispatch to residential, commercial, and industrial project sites across Mysuru. Same-day availability for urgent requirements.",
    iconName: "Truck"
  },
  {
    title: "Contractor & Trade Partnerships",
    description: "Dedicated trade accounts, bulk pricing structures, and technical product briefings for painting contractors, builders, and facility management companies.",
    iconName: "Users"
  },
  {
    title: "Architect & Designer Specifications",
    description: "Custom shade mixing, material sample provisioning, and specification support for architects, interior designers, and project consultants.",
    iconName: "Cpu"
  }
];

export const REVIEWS: Review[] = [
  {
    name: "Dileep Kumar",
    role: "Homeowner, Gokulam (Verified Review)",
    comment: "Excellent service! They have the official computerised tinting machine — got the exact shade mixed in 5 minutes. The team also helped me calculate exact quantities so I didn't waste any material. Fair pricing and genuine products.",
    rating: 5,
    date: "12 days ago"
  },
  {
    name: "Shivakumar M.",
    role: "Painting Contractor, Mysuru (Verified Review)",
    comment: "Nimishamba has been my trusted supplier for years. I source all my Berger products from them — WeatherCoat for exteriors, HomeShield for waterproofing. Always genuine materials, proper technical advice, and timely site delivery.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Nandini S.",
    role: "Architect, Mysuru (Verified Review)",
    comment: "We specify Nimishamba for our luxury residential and commercial projects. Their owner understands specifications, not just products. The moisture meter analysis at site was very professional — exactly what we need before specifying any coating system.",
    rating: 5,
    date: "2 months ago"
  }
];

export const INSPIRATIONS: Inspiration[] = [
  {
    id: "living",
    title: "Modern Minimalist Living Room",
    category: "Living Room",
    description: "Soft warm neutrals on main walls paired with rich pastel teal accents to create an open, tranquil space.",
    image: "/images/painted_rooms.png",
    colors: ["#FCFBF7", "#F5F3EE", "#1E3A5F", "#FAF0DC"]
  },
  {
    id: "bedroom",
    title: "Warm Elegance Master Bedroom",
    category: "Bedroom",
    description: "Soothing pink-cream base shades paired with luxurious gold or deep red upholstery finishes.",
    image: "/images/sol_texture.jpg",
    colors: ["#F5E2E9", "#FAF0DC", "#C97152", "#FFFFFF"]
  },
  {
    id: "exterior",
    title: "Contemporary Villa Exterior",
    category: "Exterior",
    description: "Premium stone-greys with classic navy accents on gables and door trims for a modern look.",
    image: "/images/hero_banner.png",
    colors: ["#FAF0DC", "#BDD5C0", "#152B4C", "#B8D4E8"]
  }
];

export const PROJECTS: Project[] = [
  {
    id: "living-warm-neutral",
    title: "Warm Neutral Living Room",
    category: "Living Room",
    sector: "Residential",
    scope: "3BHK apartment · 4 walls + ceiling",
    description:
      "A soft sand base keeps a west-facing living room from going harsh in the afternoon. Silk Glamor was specified for its low-sheen wipe-clean finish around the seating.",
    image: "/images/rooms/living.png",
    compare: {
      fromLabel: "Warm Sand",
      fromHex: "#E4C79C",
      toLabel: "Cool Ivory",
      toHex: "#DCE3E8"
    },
    products: ["Silk Glamor", "Bison Acrylic Putty"]
  },
  {
    id: "bedroom-calm-blue",
    title: "Calm Blue Master Bedroom",
    category: "Bedroom",
    sector: "Residential",
    scope: "Master bedroom · feature wall + trim",
    description:
      "A muted blue headboard wall with the remaining walls held light, so the room reads restful rather than dark. Breathe Easy chosen for the low-odour, low-VOC formulation.",
    image: "/images/rooms/bedroom.png",
    compare: {
      fromLabel: "Powder Blue",
      fromHex: "#9FB8CD",
      toLabel: "Clay Rose",
      toHex: "#D3A79A"
    },
    products: ["Silk Breathe Easy", "Undercoat Primer"]
  },
  {
    id: "kids-bright",
    title: "Bright Kids Room",
    category: "Kids Room",
    sector: "Residential",
    scope: "Children's bedroom · washable finish",
    description:
      "A pale citrus scheme that stays cheerful without overwhelming a small room. Specified in an easy-clean emulsion so scuffs and crayon come off the wall, not the coating.",
    image: "/images/rooms/kids.png",
    compare: {
      fromLabel: "Soft Citrus",
      fromHex: "#EDE8A6",
      toLabel: "Mint Wash",
      toHex: "#BFD9C8"
    },
    products: ["Easy Clean", "Bison Acrylic Putty"]
  },
  {
    id: "dining-teal",
    title: "Deep Teal Dining Room",
    category: "Dining Room",
    sector: "Residential",
    scope: "Open dining · accent wall",
    description:
      "A saturated teal accent wall behind the dining table, balanced by warm timber and brass. Deep tones need correct base tinting — mixed in-store on the computerised machine.",
    image: "/images/rooms/dining.png",
    compare: {
      fromLabel: "Deep Teal",
      fromHex: "#2E7286",
      toLabel: "Forest Green",
      toHex: "#3F6B4F"
    },
    products: ["Silk Glamor", "Silk Illusions"]
  }
];
