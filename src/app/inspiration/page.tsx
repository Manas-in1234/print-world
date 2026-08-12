import type { Metadata } from "next";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { InspirationGallery } from "@/components/inspiration/InspirationGallery";

export const metadata: Metadata = {
  title: "Design Inspiration — Print World",
  description:
    "Browse t-shirt, mug, acrylic frame, poster, clock, and business card inspiration. Create something similar with your own designs.",
};

export default function InspirationPage() {
  return (
    <MarketingLayout>
      <InspirationGallery />
    </MarketingLayout>
  );
}
