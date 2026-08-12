import type { ProductPlaceholder } from "@/types/product";

/**
 * Canonical local asset filenames — place images at:
 *   public/product-assets/tshirt.jpg
 *   public/product-assets/acrylic-frame.jpg
 *   public/product-assets/mug.jpg
 *   public/product-assets/business-card.jpg
 *   public/product-assets/poster.jpg
 *   public/product-assets/clock.jpg
 */
export const LANDING_ASSET_FILES = {
  tshirt: "tshirt.jpg",
  "acrylic-frame": "acrylic-frame.jpg",
  mug: "mug.jpg",
  "business-card": "business-card.jpg",
  poster: "poster.jpg",
  clock: "clock.jpg",
} as const;

export type LandingAssetKey = keyof typeof LANDING_ASSET_FILES;

/** Supabase product slug → canonical asset key */
export const SLUG_TO_ASSET_KEY: Record<string, LandingAssetKey> = {
  "custom-t-shirt": "tshirt",
  "acrylic-photo-frame": "acrylic-frame",
  "custom-mug": "mug",
  "business-card": "business-card",
  "custom-poster": "poster",
  "custom-clock": "clock",
};

/** Legacy filenames (kept for backward compatibility) */
const LEGACY_JPG_BY_SLUG: Record<string, string> = {
  "custom-t-shirt": "/product-assets/custom-t-shirt.jpg",
  "acrylic-photo-frame": "/product-assets/acrylic-photo-frame.jpg",
  "custom-mug": "/product-assets/custom-mug.jpg",
  "business-card": "/product-assets/business-card.jpg",
  "custom-poster": "/product-assets/custom-poster.jpg",
  "custom-clock": "/product-assets/custom-clock.jpg",
};

export const PRODUCT_SAMPLE_FALLBACKS: Record<string, string> = {
  "custom-t-shirt": "/product-assets/custom-t-shirt.svg",
  "acrylic-photo-frame": "/product-assets/acrylic-photo-frame.svg",
  "custom-mug": "/product-assets/custom-mug.svg",
  "business-card": "/product-assets/business-card.svg",
  "custom-poster": "/product-assets/custom-poster.svg",
  "custom-clock": "/product-assets/custom-clock.svg",
};

export const HERO_PRODUCT_IMAGE = "/product-assets/hero-products.jpg";

const PLACEHOLDER_TO_SLUG: Record<ProductPlaceholder, string> = {
  tshirt: "custom-t-shirt",
  frame: "acrylic-photo-frame",
  mug: "custom-mug",
  card: "business-card",
  poster: "custom-poster",
  clock: "custom-clock",
};

export interface ProductImageSource {
  type: "mockup" | "storage" | "local";
  mockupKey?: ProductPlaceholder;
  storageUrl?: string;
  localUrl?: string;
  fallbackUrl?: string;
  alt: string;
}

/** Canonical local path — flat JPG at /product-assets/{key}.jpg */
export function getCanonicalLocalImage(slug: string): string | null {
  const key = SLUG_TO_ASSET_KEY[slug];
  if (!key) return null;
  return `/product-assets/${LANDING_ASSET_FILES[key]}`;
}

/** Folder-based main image for shape products (optional user-placed). */
export function getFolderMainImage(slug: string): string | null {
  const key = SLUG_TO_ASSET_KEY[slug];
  if (!key) return null;
  return `/product-assets/${key}/main.jpg`;
}

export function getLegacyLocalImage(slug: string): string | null {
  return LEGACY_JPG_BY_SLUG[slug] ?? null;
}

export function getLocalProductImage(slug: string): string | null {
  const canonical = getCanonicalLocalImage(slug);
  if (canonical) return canonical;
  const folderMain = getFolderMainImage(slug);
  if (folderMain) return folderMain;
  return getLegacyLocalImage(slug);
}

export function getLocalFallbackImage(slug: string): string | null {
  return PRODUCT_SAMPLE_FALLBACKS[slug] ?? null;
}

export function getLocalImageByPlaceholder(key: ProductPlaceholder): string {
  const slug = PLACEHOLDER_TO_SLUG[key] ?? "custom-poster";
  return getLocalProductImage(slug) ?? "/product-assets/poster.jpg";
}

/** @deprecated Use getLocalProductImage — kept for imports */
export const PRODUCT_SAMPLE_IMAGES: Record<string, string> = Object.fromEntries(
  Object.keys(SLUG_TO_ASSET_KEY).map((slug) => [slug, getLocalProductImage(slug)!]),
);

/**
 * Priority: Supabase storage URL → canonical local JPG → legacy JPG → SVG → CSS mockup.
 */
export function resolveProductImage(
  imageKey: ProductPlaceholder | null,
  storageUrl?: string | null,
  alt = "Product preview",
  productSlug?: string,
): ProductImageSource {
  if (storageUrl && isStorageUrl(storageUrl)) {
    return { type: "storage", storageUrl, alt };
  }

  const slug = productSlug ?? (imageKey ? PLACEHOLDER_TO_SLUG[imageKey] : null);
  if (slug) {
    const localUrl = getLocalProductImage(slug);
    const fallbackUrl =
      getFolderMainImage(slug) ??
      getLegacyLocalImage(slug) ??
      getLocalFallbackImage(slug) ??
      undefined;
    if (localUrl) {
      return { type: "local", localUrl, fallbackUrl, alt };
    }
  }

  return {
    type: "mockup",
    mockupKey: imageKey ?? "poster",
    alt,
  };
}

function isStorageUrl(url: string): boolean {
  return url.startsWith("http") && !url.startsWith("/product-assets/");
}

export interface CustomerUploadImage {
  originalUrl: string;
  previewAvifUrl: string;
  alt: string;
}
