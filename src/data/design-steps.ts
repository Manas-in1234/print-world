import type { DesignStep } from "@/types/navigation";

export const designSteps: DesignStep[] = [
  {
    id: "choose",
    step: 1,
    title: "Choose a Product",
    description:
      "Browse our premium catalog and pick the perfect canvas for your idea — apparel, frames, mugs, and more.",
  },
  {
    id: "upload",
    step: 2,
    title: "Upload Your Image",
    description:
      "Add your photos, logos, or artwork. We support high-resolution files for crisp, premium results.",
  },
  {
    id: "customize",
    step: 3,
    title: "Add Text & Design",
    description:
      "Adjust text, colors, shapes, and layouts with intuitive tools designed for creative freedom.",
  },
  {
    id: "preview",
    step: 4,
    title: "Preview",
    description:
      "See exactly how your product will look before you order — real-time preview with every change.",
  },
  {
    id: "order",
    step: 5,
    title: "Order",
    description:
      "Add to cart, checkout securely, and receive your custom creation with fast, reliable delivery.",
  },
];
