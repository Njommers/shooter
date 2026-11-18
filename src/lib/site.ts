import alley from "@/assets/photos/shooter-alley.jpg.asset.json";
import braam from "@/assets/photos/shooter-braam.jpg.asset.json";
import caravan from "@/assets/photos/shooter-caravan.jpg.asset.json";
import checker from "@/assets/photos/shooter-checker.jpg.asset.json";
import flatcap from "@/assets/photos/shooter-flatcap.jpg.asset.json";
import redCar from "@/assets/photos/shooter-red-car.jpg.asset.json";
import redSandals from "@/assets/photos/shooter-red-sandals.jpg.asset.json";

/**
 * Everything editable about the site lives here: bio, links and contact options.
 * Do not add awards, clients or achievements unless Shooter confirms them.
 */
export const site = {
  name: "Shooter Mbatha",
  alias: "Shooter Is The Best",
  slogan: "Uyaphi unga dansanga?",
  sloganTranslation: "Where are you going without dancing?",
  tagline: "Style is an attitude. Art is an expression. Culture is the movement.",
  footerLine: "Style has no boundaries.",
  instagramHandle: "@Shooter_is_the_best",
  instagramUrl: "https://www.instagram.com/Shooter_is_the_best/",
  /**
   * WhatsApp number in international format without "+" or spaces, e.g. "27821234567"
   * (South Africa = 27). Leave empty to hide the WhatsApp button.
   */
  whatsappNumber: "",
  bio: [
    "Shooter Mbatha — known online as Shooter Is The Best — is a South African creative stylist whose visual identity celebrates individuality, fashion, culture and artistic expression.",
    "His looks move between the street and the editorial page: oversized silhouettes, bold colour, heritage pieces and everyday spaces turned into a runway. Every outfit is a statement about showing up exactly as yourself.",
  ],
} as const;

export const categories = [
  "Fashion & Styling",
  "Creative Looks",
  "Street Culture",
  "Editorial",
  "Personal Expression",
] as const;

export type Category = (typeof categories)[number];

export type Photo = {
  id: string;
  src: string;
  title: string;
  caption: string;
  alt: string;
  categories: Category[];
  /** CSS object-position used when the photo is cropped into a frame. */
  focus: string;
  width: number;
  height: number;
};

export const photos: Photo[] = [
  {
    id: "flatcap",
    src: flatcap.url,
    title: "Ra Mofokeng",
    caption: "Plaid flat cap, colour-block knit and woven leather sandals.",
    alt: "Shooter Mbatha crouching against a corrugated wall in a plaid flat cap, blue knit and woven leather sandals",
    categories: ["Editorial", "Fashion & Styling"],
    focus: "50% 25%",
    width: 632,
    height: 959,
  },
  {
    id: "caravan",
    src: caravan.url,
    title: "Purple Step",
    caption: "All black, bucket hat and a loud purple sandal.",
    alt: "Shooter Mbatha seated beside a caravan in an all-black outfit, bucket hat and purple sandals",
    categories: ["Editorial", "Creative Looks"],
    focus: "45% 30%",
    width: 635,
    height: 875,
  },
  {
    id: "red-car",
    src: redCar.url,
    title: "Inja Emdaka",
    caption: "Red cap, check shirt and pleated trousers against a red ride.",
    alt: "Shooter Mbatha leaning on a red car in a red cap, dark check shirt and pleated trousers",
    categories: ["Editorial", "Street Culture"],
    focus: "50% 30%",
    width: 550,
    height: 875,
  },
  {
    id: "checker",
    src: checker.url,
    title: "Checkerboard",
    caption: "Grid jacket, wide shorts and red sandals on a black-and-white floor.",
    alt: "Shooter Mbatha taking a mirror selfie in a grid-print jacket, wide black shorts and red sandals on a checkered floor",
    categories: ["Creative Looks", "Personal Expression"],
    focus: "50% 35%",
    width: 635,
    height: 873,
  },
  {
    id: "braam",
    src: braam.url,
    title: "Phoyaaas",
    caption: "Graphic tee, grey sweat shorts and a city café afternoon.",
    alt: "Shooter Mbatha outside a café with green tiles in a bucket hat, graphic tee and grey shorts",
    categories: ["Fashion & Styling", "Street Culture"],
    focus: "50% 35%",
    width: 635,
    height: 875,
  },
  {
    id: "red-sandals",
    src: redSandals.url,
    title: "Shutter Down",
    caption: "Printed tee, cuffed trousers and red sandals against a roller door.",
    alt: "Shooter Mbatha standing before a metal roller shutter in a red cap, printed white tee and red sandals",
    categories: ["Fashion & Styling", "Creative Looks"],
    focus: "50% 30%",
    width: 485,
    height: 812,
  },
  {
    id: "alley",
    src: alley.url,
    title: "Ehhh",
    caption: "Plum tee, baggy denim and a grin in a concrete corner.",
    alt: "Shooter Mbatha smiling and posing in a concrete alley in a plum tee and baggy jeans",
    categories: ["Street Culture", "Personal Expression"],
    focus: "50% 30%",
    width: 485,
    height: 873,
  },
];

export const photoById = (id: string) => {
  const p = photos.find((x) => x.id === id);
  if (!p) throw new Error(`Unknown photo ${id}`);
  return p;
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "portfolio", label: "Portfolio" },
  { id: "vision", label: "The Vision" },
  { id: "contact", label: "Contact" },
] as const;

export function filterPhotos(list: Photo[], filter: Category | "All") {
  return filter === "All" ? list : list.filter((p) => p.categories.includes(filter));
}

export function whatsappLink(number: string, text = "Hi Shooter! I'd love to create something together.") {
  const digits = number.replace(/\D/g, "");
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}
