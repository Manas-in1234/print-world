import {
  createLandingMetadata,
  renderProductLanding,
} from "@/lib/landing/render-product-landing";

export const dynamic = "force-dynamic";
export const metadata = createLandingMetadata("clocks");

export default function ClocksLandingPage() {
  return renderProductLanding("clocks");
}
