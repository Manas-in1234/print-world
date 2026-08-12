import type { LandingAssetKey } from "@/lib/images/product-image";
import { LANDING_ASSET_FILES } from "@/lib/images/product-image";

/** Centralized hero / marketing imagery — local product assets only. */
export type PageHeroKey =
  | "home"
  | "services"
  | "business"
  | "ai-studio"
  | "inspiration"
  | "about";

function assetPath(key: LandingAssetKey): string {
  return `/product-assets/${LANDING_ASSET_FILES[key]}`;
}

export interface PageHeroConfig {
  primaryImage: string;
  fallbackImages: string[];
  alt: string;
}

export const pageHeroImages: Record<PageHeroKey, PageHeroConfig> = {
  home: {
    primaryImage: assetPath("tshirt"),
    fallbackImages: [assetPath("mug"), assetPath("acrylic-frame"), assetPath("poster")],
    alt: "Premium personalized printing products including t-shirts, mugs, and acrylic frames",
  },
  services: {
    primaryImage: assetPath("poster"),
    fallbackImages: [assetPath("tshirt"), assetPath("business-card")],
    alt: "Custom printing services at Print World",
  },
  business: {
    primaryImage: assetPath("business-card"),
    fallbackImages: [assetPath("poster"), assetPath("tshirt")],
    alt: "Professional business printing materials",
  },
  "ai-studio": {
    primaryImage: assetPath("tshirt"),
    fallbackImages: [assetPath("poster"), assetPath("mug")],
    alt: "AI-powered design for custom products",
  },
  inspiration: {
    primaryImage: assetPath("acrylic-frame"),
    fallbackImages: [assetPath("clock"), assetPath("mug"), assetPath("poster")],
    alt: "Design inspiration across Print World products",
  },
  about: {
    primaryImage: assetPath("acrylic-frame"),
    fallbackImages: [assetPath("tshirt"), assetPath("clock")],
    alt: "Print World personalized printing products",
  },
};

/** Landing route → product asset for dynamic hero images. */
export const landingRouteHeroAsset: Record<string, LandingAssetKey> = {
  "/t-shirts": "tshirt",
  "/acrylic-frames": "acrylic-frame",
  "/mugs": "mug",
  "/business-cards": "business-card",
  "/posters": "poster",
  "/clocks": "clock",
};

export function getLandingHeroImage(route: string): string {
  const key = landingRouteHeroAsset[route];
  return key ? assetPath(key) : assetPath("poster");
}
