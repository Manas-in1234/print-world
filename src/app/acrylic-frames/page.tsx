import {
  createLandingMetadata,
  renderProductLanding,
} from "@/lib/landing/render-product-landing";

export const dynamic = "force-dynamic";
export const metadata = createLandingMetadata("acrylic-frames");

export default function AcrylicFramesLandingPage() {
  return renderProductLanding("acrylic-frames");
}
