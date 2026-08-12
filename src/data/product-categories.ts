/** Six main product categories — links to real product pages. */
export interface ProductCategory {
  slug: string;
  name: string;
  description: string;
  image: string;
  href: string;
}

export const productCategories: ProductCategory[] = [
  {
    slug: "custom-t-shirt",
    name: "Custom T-Shirts",
    description: "Premium cotton tees with vibrant, long-lasting custom prints.",
    image: "/product-assets/custom-t-shirt.jpg",
    href: "/products/custom-t-shirt",
  },
  {
    slug: "acrylic-photo-frame",
    name: "Acrylic Photo Frames",
    description: "Crystal-clear acrylic displays for your favorite memories.",
    image: "/product-assets/acrylic-photo-frame.jpg",
    href: "/products/acrylic-photo-frame",
  },
  {
    slug: "custom-mug",
    name: "Custom Mugs",
    description: "Ceramic mugs with rich, dishwasher-safe personalized prints.",
    image: "/product-assets/custom-mug.jpg",
    href: "/products/custom-mug",
  },
  {
    slug: "business-card",
    name: "Business Cards",
    description: "Premium cardstock with sharp typography and professional finishes.",
    image: "/product-assets/business-card.jpg",
    href: "/products/business-card",
  },
  {
    slug: "custom-poster",
    name: "Custom Posters",
    description: "Museum-quality prints on premium paper with vivid color.",
    image: "/product-assets/custom-poster.jpg",
    href: "/products/custom-poster",
  },
  {
    slug: "custom-clock",
    name: "Custom Clocks",
    description: "Personalized wall clocks in multiple premium shapes.",
    image: "/product-assets/custom-clock.jpg",
    href: "/products/custom-clock",
  },
];
