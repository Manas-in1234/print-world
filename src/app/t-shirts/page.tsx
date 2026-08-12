import {
  createLandingMetadata,
  renderProductLanding,
} from "@/lib/landing/render-product-landing";

export const dynamic = "force-dynamic";
export const metadata = createLandingMetadata("t-shirts");

export default function TShirtsLandingPage() {
  return renderProductLanding("t-shirts");
}
