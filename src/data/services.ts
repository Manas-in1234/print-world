import { LANDING_ASSET_FILES } from "@/lib/images/product-image";

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  image: string;
  href: string;
}

export const services: ServiceItem[] = [
  {
    id: "custom-printing",
    title: "Custom Printing",
    description: "Tailored print solutions for any product in our catalog — designed exactly your way.",
    image: `/product-assets/${LANDING_ASSET_FILES.tshirt}`,
    href: "/products",
  },
  {
    id: "personalized-products",
    title: "Personalized Products",
    description: "Turn photos, artwork, and messages into premium keepsakes and everyday essentials.",
    image: `/product-assets/${LANDING_ASSET_FILES.mug}`,
    href: "/products",
  },
  {
    id: "photo-printing",
    title: "Photo Printing",
    description: "Gallery-quality photo prints on acrylic frames, posters, and more with vivid color.",
    image: `/product-assets/${LANDING_ASSET_FILES["acrylic-frame"]}`,
    href: "/acrylic-frames",
  },
  {
    id: "business-printing",
    title: "Business Printing",
    description: "Professional business cards, posters, and branding materials for your company.",
    image: `/product-assets/${LANDING_ASSET_FILES["business-card"]}`,
    href: "/business",
  },
  {
    id: "bulk-printing",
    title: "Bulk Printing",
    description: "Volume orders with competitive pricing for teams, events, and corporate needs.",
    image: `/product-assets/${LANDING_ASSET_FILES.poster}`,
    href: "/business#bulk-orders",
  },
  {
    id: "corporate-gifts",
    title: "Corporate Gifts",
    description: "Branded mugs, apparel, and gift sets that leave a lasting impression.",
    image: `/product-assets/${LANDING_ASSET_FILES.mug}`,
    href: "/business#corporate-gifts",
  },
  {
    id: "custom-design",
    title: "Custom Design Services",
    description: "Work with our tools and AI Studio to create polished designs ready for print.",
    image: `/product-assets/${LANDING_ASSET_FILES.tshirt}`,
    href: "/ai-studio",
  },
];
