export interface InspirationItem {
  id: string;
  title: string;
  category: string;
  image: string;
  href: string;
}

export const inspirationItems: InspirationItem[] = [
  {
    id: "tshirt-minimal",
    title: "Minimal Typography Tee",
    category: "T-Shirts",
    image: "/product-assets/custom-t-shirt.jpg",
    href: "/customize/custom-t-shirt",
  },
  {
    id: "mug-family",
    title: "Family Photo Mug",
    category: "Mugs",
    image: "/product-assets/custom-mug.jpg",
    href: "/customize/custom-mug",
  },
  {
    id: "frame-wedding",
    title: "Wedding Memory Frame",
    category: "Acrylic Frames",
    image: "/product-assets/acrylic-photo-frame.jpg",
    href: "/customize/acrylic-photo-frame",
  },
  {
    id: "poster-gallery",
    title: "Gallery Wall Poster",
    category: "Posters",
    image: "/product-assets/custom-poster.jpg",
    href: "/customize/custom-poster",
  },
  {
    id: "clock-modern",
    title: "Modern Shape Clock",
    category: "Clocks",
    image: "/product-assets/custom-clock.jpg",
    href: "/customize/custom-clock",
  },
  {
    id: "card-professional",
    title: "Professional Business Card",
    category: "Business Cards",
    image: "/product-assets/business-card.jpg",
    href: "/customize/business-card",
  },
  {
    id: "tshirt-bold",
    title: "Bold Graphic Tee",
    category: "T-Shirts",
    image: "/product-assets/custom-t-shirt.jpg",
    href: "/customize/custom-t-shirt",
  },
  {
    id: "mug-gift",
    title: "Gift Mug Design",
    category: "Mugs",
    image: "/product-assets/custom-mug.jpg",
    href: "/customize/custom-mug",
  },
  {
    id: "poster-art",
    title: "Art Print Poster",
    category: "Posters",
    image: "/product-assets/custom-poster.jpg",
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
