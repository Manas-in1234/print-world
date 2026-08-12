import type { FooterColumn } from "@/types/navigation";

export const footerColumns: FooterColumn[] = [
  {
    title: "Products",
    links: [
      { label: "Custom T-Shirts", href: "/products/custom-t-shirt" },
      { label: "Acrylic Frames", href: "/products/acrylic-photo-frame" },
      { label: "Custom Mugs", href: "/products/custom-mug" },
      { label: "Business Cards", href: "/products/business-card" },
      { label: "Posters", href: "/products/custom-poster" },
      { label: "Custom Clocks", href: "/products/custom-clock" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "All Services", href: "/services" },
      { label: "Bulk Printing", href: "/services#bulk-printing" },
      { label: "Design Services", href: "/services#custom-design" },
      { label: "Corporate Gifts", href: "/services#corporate-gifts" },
    ],
  },
  {
    title: "AI Studio",
    links: [
      { label: "AI Logo Maker", href: "/ai-studio" },
      { label: "AI T-Shirt Design", href: "/ai-studio" },
      { label: "AI Artwork", href: "/ai-studio" },
      { label: "Design Assistant", href: "/ai-studio" },
    ],
  },
  {
    title: "Business",
    links: [
      { label: "Business Solutions", href: "/business" },
      { label: "Volume Pricing", href: "/business#bulk-orders" },
      { label: "Corporate Gifts", href: "/business#corporate-gifts" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Inspiration", href: "/inspiration" },
      { label: "Contact", href: "/about#contact" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Help Center", href: "/about#support" },
      { label: "Shipping Info", href: "/about#support" },
      { label: "Returns", href: "/about#support" },
      { label: "Contact Us", href: "/about#contact" },
    ],
  },
];

export const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "Pinterest", href: "https://pinterest.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];
