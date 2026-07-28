export interface Product {
  id: string;
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

export const PRODUCTS: Product[] = [
  {
    id: "int-paint",
    category: "Interior Paint",
    name: "Berger Silk Glamor & Silk Breathe Easy",
    description: "Premium ultra-luxury rich sheen emulsion. Washable, anti-bacterial, low-VOC for elegant, hygienic walls.",
    image: "/images/painted_rooms.png"
  },
  {
    id: "ext-paint",
    category: "Exterior Paint",
    name: "Berger WeatherCoat Long Life & WeatherGuard",
    description: "High-durability luxury exterior emulsion. Anti-dust, rain-protection, and 10-year warranty against cracks/algae.",
    image: "/images/hero_banner.png"
  },
  {
    id: "waterproof",
    category: "Waterproofing",
    name: "Berger HomeShield Waterproofing Solutions",
    description: "Scientific waterproofing using Damp Shield Elasto. Treatment for damp walls, ceiling leakages, and structural cracks.",
    image: "/images/color_wall.png"
  },
  {
    id: "wood-coat",
    category: "Wood Finishes",
    name: "Berger WoodKeeper Melamine & PU",
    description: "Premium polyurethane coatings. Long-lasting protection, scratch resistance, and gloss/matte finishes for furniture.",
    image: "/images/shop_interior.png"
  },
  {
    id: "primers",
    category: "Primers & Putty",
    name: "Berger Bison Acrylic Putty & Undercoat Primers",
    description: "Smooth wall preps. Seal pores, cover hairline cracks, and ensure high adhesion/yield for top-coat emulsions.",
    image: "/images/paint_cans.png"
  },
  {
    id: "textures",
    category: "Texture Paints",
    name: "Berger Silk Illusions Design Wall Textures",
    description: "Luxury decorative plaster textures. Metallic, marble, and concrete finishes to elevate your signature accent walls.",
    image: "/images/hero_minimal.png"
  }
];

export const BRANDS: Brand[] = [
  { name: "Berger Paints", logo: "/images/logo.png" }
];

export const SERVICES: Service[] = [
  {
    title: "Official Shade Selection",
    description: "Access our exclusive Color World library. Our specialists assist in picking the right color matches for your home lighting.",
    iconName: "Palette"
  },
  {
    title: "Paint Quantity Estimation",
    description: "Detailed wall area calculations based on Berger coverage indexes. Save costs and prevent raw material wastage.",
    iconName: "Calculator"
  },
  {
    title: "Vip Color Tinting Systems",
    description: "Instant computerized mixing machine in-store. Tint any base paint to exact catalogue formulas within 2 minutes.",
    iconName: "Cpu"
  },
  {
    title: "Showroom Delivery",
    description: "Same-day prompt dispatch and logistics direct to residential construction sites and apartments in Mysuru.",
    iconName: "Truck"
  },
  {
    title: "Painter Support & Rates",
    description: "Wholesale bulk rates, genuine material supply certificates, and technical contractor briefings.",
    iconName: "Users"
  },
  {
    title: "Homeshield Damp Diagnostics",
    description: "Dampness checking site visits using moisture meters to diagnose wall leakage before painting.",
    iconName: "CheckCircle"
  }
];

export const REVIEWS: Review[] = [
  {
    name: "Dileep Kumar",
    role: "Homeowner, Gokulam (Verified Justdial Review)",
    comment: "Excellent service! Visited their showroom near Hinkal ring road. They have the official computerized color tinting machine. Got the exact shade of Berger Silk Glamor mixed in 5 minutes. Fair pricing compared to other shops.",
    rating: 5,
    date: "12 days ago"
  },
  {
    name: "Shivakumar M.",
    role: "Painting Contractor, Mysuru (Verified Justdial Review)",
    comment: "Nimishamba Paints has been my trusted supplier for years. Sourced Berger WeatherCoat for a villa project. Always genuine materials, proper advice on primer/putty ratio, and timely site delivery.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Nandini S.",
    role: "Architect, Mysuru (Verified Justdial Review)",
    comment: "We recommend Nimishamba for our luxury decor projects. The owner is very helpful. Sourced WoodKeeper melamine polish and HomeShield waterproofing. Their moisture meter analysis at site was very professional.",
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
    image: "/images/hero_minimal.png",
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
