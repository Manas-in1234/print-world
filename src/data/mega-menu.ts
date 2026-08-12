import type { MegaMenuGroup } from "@/types/navigation";

export const megaMenus: MegaMenuGroup[] = [
  {
    key: "products",
    label: "Products",
    href: "/products",
    items: [
      { label: "T-Shirts", href: "/products/custom-t-shirt", description: "Premium custom apparel" },
      { label: "Acrylic Frames", href: "/products/acrylic-photo-frame", description: "Crystal-clear displays" },
      { label: "Mugs", href: "/products/custom-mug", description: "Personalized drinkware" },
      { label: "Business Cards", href: "/products/business-card", description: "Professional stationery" },
      { label: "Posters", href: "/products/custom-poster", description: "Museum-quality prints" },
      { label: "Clocks", href: "/products/custom-clock", description: "Custom wall clocks" },
    ],
  },
  {
    key: "services",
    label: "Services",
    href: "/services",
    items: [
      { label: "Custom Printing", href: "/services#custom-printing", description: "Tailored print solutions" },
      { label: "Photo Printing", href: "/services#photo-printing", description: "Gallery-quality photos" },
      { label: "Business Printing", href: "/services#business-printing", description: "Corporate materials" },
      { label: "Personalized Gifts", href: "/services#personalized-gifts", description: "Thoughtful keepsakes" },
      { label: "Bulk Printing", href: "/services#bulk-printing", description: "Volume orders & pricing" },
    ],
  },
  {
    key: "aiStudio",
    label: "AI Studio",
    href: "/ai-studio",
    items: [
      { label: "AI Logo Maker", href: "/ai-studio", description: "Brand logos in seconds" },
      { label: "AI T-Shirt Designer", href: "/ai-studio", description: "Apparel-ready artwork" },
      { label: "AI Artwork Generator", href: "/ai-studio", description: "Original artwork & posters" },
      { label: "AI Design Assistant", href: "/ai-studio", description: "Smart layout guidance" },
    ],
  },
];

export const simpleNavLinks = [
  { label: "Business", href: "/business" },
  { label: "Inspiration", href: "/inspiration" },
  { label: "About", href: "/about" },
];
