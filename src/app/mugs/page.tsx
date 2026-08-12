import {
  createLandingMetadata,
  renderProductLanding,
} from "@/lib/landing/render-product-landing";

export const dynamic = "force-dynamic";
export const metadata = createLandingMetadata("mugs");

export default function MugsLandingPage() {
  return renderProductLanding("mugs");
}
