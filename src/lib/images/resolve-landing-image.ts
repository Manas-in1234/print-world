import type { ProductPlaceholder } from "@/types/product";
import {
  getCanonicalLocalImage,
  getLocalFallbackImage,
  getLocalProductImage,
  resolveProductImage,
  type ProductImageSource,
} from "@/lib/images/product-image";

/** Resolved image for landing pages and homepage cards. */
export interface ResolvedLandingImage {
  /** storage | local | mockup — mirrors ProductImageSource.type */
  mode: ProductImageSource["type"];
  imageKey: ProductPlaceholder;
  storageUrl: string | null;
  /** Canonical local path from slug mapping (may 404 until file is placed) */
  localImageUrl: string | null;
  /** SVG / legacy fallback for onError */
  localFallbackUrl: string | null;
  alt: string;
  /** Full source for ProductPreview */
  imageSource: ProductImageSource;
}

const SLUG_TO_PLACEHOLDER: Record<string, ProductPlaceholder> = {
  "custom-t-shirt": "tshirt",
  "acrylic-photo-frame": "frame",
  "custom-mug": "mug",
  "business-card": "card",
  "custom-poster": "poster",
  "custom-clock": "clock",
};

export function slugToPlaceholder(slug: string): ProductPlaceholder {
  return SLUG_TO_PLACEHOLDER[slug] ?? "poster";
}

/**
 * Central landing image resolver.
 * Priority: Supabase storage → canonical local JPG → SVG/legacy → mockup preview.
 */
export function resolveLandingImage(
  productSlug: string,
  imageKey: ProductPlaceholder,
  storageUrl: string | null | undefined,
  alt: string,
): ResolvedLandingImage {
  const canonicalLocal = getCanonicalLocalImage(productSlug);
  const imageSource = resolveProductImage(imageKey, storageUrl, alt, productSlug);

  return {
    mode: imageSource.type,
    imageKey,
    storageUrl: storageUrl && imageSource.type === "storage" ? storageUrl : null,
    localImageUrl:
      imageSource.type === "local"
        ? imageSource.localUrl ?? canonicalLocal
        : canonicalLocal,
    localFallbackUrl:
      imageSource.fallbackUrl ?? getLocalFallbackImage(productSlug) ?? null,
    alt,
    imageSource,
  };
}

/** Best URL for next/image when only a string src is needed (homepage cards). */
export function getLandingImageSrc(resolved: ResolvedLandingImage): string | null {
  if (resolved.mode === "storage" && resolved.storageUrl) {
    return resolved.storageUrl;
  }
  if (resolved.localImageUrl) {
    return resolved.localImageUrl;
  }
  return null;
}

/** Whether ProductPreview mockup fallback is required. */
export function needsMockupFallback(resolved: ResolvedLandingImage): boolean {
  return resolved.mode === "mockup";
}

export { getLocalProductImage, getCanonicalLocalImage };
