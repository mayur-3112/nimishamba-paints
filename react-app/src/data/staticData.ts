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
    name: "Berger Silk Glamor & Luxury Emulsion",
    description: "Premium rich-sheen internal wall finish. Washable, stain-resistant, and low-VOC for elegant, durable interiors.",
    image: "/images/painted_rooms.png"
  },
  {
    id: "ext-paint",
    category: "Exterior Paint",
    name: "Berger WeatherCoat WeatherGuard",
    description: "High-protection external wall coating. Rain, dust, and anti-algae defense, keeping your facades clean and vibrant.",
    image: "/images/hero_banner.png"
  },
  {
    id: "waterproof",
    category: "Waterproofing",
    name: "Dr. Fixit & Berger Damp Shield",
    description: "Professional structural waterproofing solutions. Prevent dampness, internal cracks, and wall efflorescence.",
    image: "/images/color_wall.png"
  },
  {
    id: "wood-coat",
    category: "Wood Finishes",
    name: "Berger WoodKeeper Polyurethane",
    description: "Premium lacquer and melamine polishes. Enhance and protect natural wood surfaces, tables, and cabinets.",
    image: "/images/shop_interior.png"
  },
  {
    id: "primers",
    category: "Primers & Putty",
    name: "Berger Bison Acrylic & Waterproof Putty",
    description: "Essential base undercoats. Hide wall flaws and ensure smooth finishes with maximum paint coverage and adhesion.",
    image: "/images/paint_cans.png"
  },
  {
    id: "textures",
    category: "Texture Paints",
    name: "Berger Ruff 'N' Tuff Textured Finish",
    description: "Artistic texture aggregates. Create modern, rugged, or metallic signature accent walls for living rooms.",
    image: "/images/hero_minimal.png"
  }
];

export const BRANDS: Brand[] = [
  { name: "Berger", logo: "/images/logo.png" },
  { name: "Asian Paints", logo: "/images/logo.png" },
  { name: "Nerolac", logo: "/images/logo.png" },
  { name: "Indigo", logo: "/images/logo.png" },
  { name: "Dr. Fixit", logo: "/images/logo.png" }
];

export const SERVICES: Service[] = [
  {
    title: "Colour Consultation",
    description: "Struggling to pick the right shade? Our experts analyze lighting and floor plans to recommend the perfect color matches.",
    iconName: "Palette"
  },
  {
    title: "Quantity Estimation",
    description: "Accurate site measurements and material calculations to save cost, prevent wastage, and optimize budget metrics.",
    iconName: "Calculator"
  },
  {
    title: "Tinting & Shading Machine",
    description: "Instant, automated computer tinting systems. Generate any of the 2,500+ shades from official catalogue bases in minutes.",
    iconName: "Cpu"
  },
  {
    title: "Home Delivery",
    description: "Swift dispatch and door-step paint logistics directly to residential sites and commercial properties in Mysuru.",
    iconName: "Truck"
  },
  {
    title: "Contractor Support",
    description: "Supplying bulk quantities with special trade discounts for builders, architects, and professional painters.",
    iconName: "Users"
  },
  {
    title: "On-Site Inspections",
    description: "Technical site visits to diagnose dampness, select base treatments, and prescribe anti-peeling paint systems.",
    iconName: "CheckCircle"
  }
];

export const REVIEWS: Review[] = [
  {
    name: "Mayur Agarwal",
    role: "Homeowner, Mysuru",
    comment: "Excellent showroom! They have the computerized color mixing machine. Got exact shades of Berger Silk Glamor. Visited the store, received great color guidance.",
    rating: 5,
    date: "12 days ago"
  },
  {
    name: "Dinesh Kumar",
    role: "Interior Designer",
    comment: "Nimishamba Paints is my go-to shop for project supplies. Genuine products, competitive pricing, and immediate dispatch. Highly recommended for professionals.",
    rating: 5,
    date: "1 month ago"
  },
  {
    name: "Raju Gowda",
    role: "Painting Contractor",
    comment: "Been purchasing Berger paint, primers, and putty from this showroom since 10+ years. Extremely trustworthy dealer in Hinkal. Always genuine materials.",
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
