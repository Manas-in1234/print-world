import type { ProductPlaceholder } from "@/types/product";

/** Local product photography — JPG preferred, SVG fallback. */
export const PRODUCT_SAMPLE_IMAGES: Record<string, string> = {
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

export function getLocalProductImage(slug: string): string | null {
  return PRODUCT_SAMPLE_IMAGES[slug] ?? null;
}

export function getLocalFallbackImage(slug: string): string | null {
  return PRODUCT_SAMPLE_FALLBACKS[slug] ?? null;
}

export function getLocalImageByPlaceholder(key: ProductPlaceholder): string {
  const slug = PLACEHOLDER_TO_SLUG[key] ?? "custom-poster";
  return PRODUCT_SAMPLE_IMAGES[slug] ?? "/product-assets/custom-poster.jpg";
}

/**
 * Priority: Supabase storage URL → local JPG → SVG fallback → CSS mockup component.
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
    const fallbackUrl = getLocalFallbackImage(slug) ?? undefined;
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
