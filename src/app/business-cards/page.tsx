import {
  createLandingMetadata,
  renderProductLanding,
} from "@/lib/landing/render-product-landing";

export const dynamic = "force-dynamic";
export const metadata = createLandingMetadata("business-cards");

export default function BusinessCardsLandingPage() {
  return renderProductLanding("business-cards");
}
