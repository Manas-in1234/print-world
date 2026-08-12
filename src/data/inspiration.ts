import { LANDING_ASSET_FILES } from "@/lib/images/product-image";

export interface InspirationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

const img = {
  tshirt: `/product-assets/${LANDING_ASSET_FILES.tshirt}`,
  mug: `/product-assets/${LANDING_ASSET_FILES.mug}`,
  frame: `/product-assets/${LANDING_ASSET_FILES["acrylic-frame"]}`,
  poster: `/product-assets/${LANDING_ASSET_FILES.poster}`,
  clock: `/product-assets/${LANDING_ASSET_FILES.clock}`,
  card: `/product-assets/${LANDING_ASSET_FILES["business-card"]}`,
};

export const inspirationItems: InspirationItem[] = [
  {
    id: "tshirt-minimal",
    title: "Minimal Typography Tee",
    category: "T-Shirts",
    image: img.tshirt,
    href: "/customize/custom-t-shirt",
  },
  {
    id: "mug-family",
    title: "Family Photo Mug",
    category: "Mugs",
    image: img.mug,
    href: "/customize/custom-mug",
  },
  {
    id: "frame-wedding",
    title: "Wedding Memory Frame",
    category: "Acrylic Frames",
    image: img.frame,
    href: "/customize/acrylic-photo-frame",
  },
  {
    id: "poster-gallery",
    title: "Gallery Wall Poster",
    category: "Posters",
    image: img.poster,
    href: "/customize/custom-poster",
  },
  {
    id: "clock-modern",
    title: "Modern Shape Clock",
    category: "Clocks",
    image: img.clock,
    href: "/customize/custom-clock",
  },
  {
    id: "card-professional",
    title: "Professional Business Card",
    category: "Business Cards",
    image: img.card,
    href: "/customize/business-card",
  },
  {
    id: "tshirt-bold",
    title: "Bold Graphic Tee",
    category: "T-Shirts",
    image: img.tshirt,
    href: "/customize/custom-t-shirt",
  },
  {
    id: "mug-gift",
    title: "Gift Mug Design",
    category: "Mugs",
    image: img.mug,
    href: "/customize/custom-mug",
  },
  {
    id: "poster-art",
    title: "Art Print Poster",
    category: "Posters",
    image: img.poster,
    href: "/customize/custom-poster",
  },
];

export const inspirationCategories = [
  "All",
  "T-Shirts",
  "Mugs",
  "Acrylic Frames",
  "Posters",
  "Clocks",
  "Business Cards",
] as const;
