import type { ProductPlaceholder } from "@/types/product";
import {
  CLOCK_SHAPE_IDS,
  CLOCK_SHAPE_IMAGE_FILES,
  getClockShapeImagePath,
  isClockShapeId,
  toClockShapeId,
  type ClockShapeId,
} from "@/data/clock-shapes";
import { toPreviewShapeId } from "@/lib/catalog/shape-utils";
import {
  getLocalFallbackImage,
  getLocalProductImage,
  resolveProductImage,
  type ProductImageSource,
} from "@/lib/images/product-image";

/** Product slug → asset folder under /product-assets/ */
export const PRODUCT_ASSET_FOLDERS: Record<string, string> = {
  "custom-t-shirt": "tshirt",
  "acrylic-photo-frame": "acrylic-frame",
  "custom-mug": "mug",
  "business-card": "business-card",
  "custom-poster": "poster",
  "custom-clock": "clock",
};

/** @deprecated Use CLOCK_SHAPE_IDS from @/data/clock-shapes */
export const CLOCK_SHAPE_IMAGE_IDS = CLOCK_SHAPE_IDS;

/** Acrylic frame explore shapes with dedicated local image files (user-placed). */
export const ACRYLIC_SHAPE_IMAGE_IDS = ["round", "square", "heart"] as const;

export type AcrylicShapeImageId = (typeof ACRYLIC_SHAPE_IMAGE_IDS)[number];

export interface ResolvedShapeImage {
  mode: "storage" | "local" | "mockup";
  storageUrl: string | null;
  localImageUrl: string | null;
  localFallbackUrl: string | null;
  mainImageUrl: string | null;
  shapeImageUrl: string | null;
  imageKey: ProductPlaceholder;
  previewShapeId: ReturnType<typeof toPreviewShapeId>;
  clockShapeId: ClockShapeId | null;
  alt: string;
  imageSource: ProductImageSource;
  useMockup: boolean;
}

export function getProductAssetFolder(productSlug: string): string | null {
  return PRODUCT_ASSET_FOLDERS[productSlug] ?? null;
}

/** Product main image — flat canonical JPG, then optional folder main.jpg */
export function getProductMainImagePath(productSlug: string): string | null {
  const flat = getLocalProductImage(productSlug);
  if (flat) return flat;
  const folder = getProductAssetFolder(productSlug);
  if (!folder) return null;
  return `/product-assets/${folder}/main.jpg`;
}

function isStorageUrl(url: string): boolean {
  return url.startsWith("http") && !url.startsWith("/product-assets/");
}

/** Resolve shape slug / preview key to a local clock shape image path when mapped. */
export function getClockLocalShapeImagePath(
  shapeSlug: string,
  previewKey?: string | null,
): string | null {
  const shapeId = toClockShapeId(shapeSlug, previewKey);
  if (!shapeId) return null;
  return getClockShapeImagePath(shapeId);
}

/** Resolve shape slug / preview key to a local shape filename when one exists. */
export function getShapeImageFileName(
  productSlug: string,
  shapeSlug: string,
  previewKey?: string | null,
): string | null {
  if (productSlug === "custom-clock") {
    const shapeId = toClockShapeId(shapeSlug, previewKey);
    if (!shapeId) return null;
    return CLOCK_SHAPE_IMAGE_FILES[shapeId];
  }

  const shapeId = toPreviewShapeId(shapeSlug, previewKey);

  if (productSlug === "acrylic-photo-frame") {
    if ((ACRYLIC_SHAPE_IMAGE_IDS as readonly string[]).includes(shapeId)) {
      return `${shapeId}.jpg`;
    }
    return null;
  }

  return null;
}

/** /product-assets/{folder}/{shape}.jpg — null when no dedicated shape file is mapped. */
export function getLocalShapeImagePath(
  productSlug: string,
  shapeSlug: string,
  previewKey?: string | null,
): string | null {
  if (productSlug === "custom-clock") {
    return getClockLocalShapeImagePath(shapeSlug, previewKey);
  }

  const folder = getProductAssetFolder(productSlug);
  const fileName = getShapeImageFileName(productSlug, shapeSlug, previewKey);
  if (!folder || !fileName) return null;
  return `/product-assets/${folder}/${fileName}`;
}

function slugToPlaceholder(slug: string): ProductPlaceholder {
  const map: Record<string, ProductPlaceholder> = {
    "custom-t-shirt": "tshirt",
    "acrylic-photo-frame": "frame",
    "custom-mug": "mug",
    "business-card": "card",
    "custom-poster": "poster",
    "custom-clock": "clock",
  };
  return map[slug] ?? "poster";
}

/**
 * Shape-aware image resolution.
 * Priority: Supabase shape URL → local shape JPG → product main JPG → legacy → mockup.
 */
export function resolveShapeImage(options: {
  productSlug: string;
  imageKey?: ProductPlaceholder;
  shapeSlug?: string;
  previewKey?: string | null;
  shapeStorageUrl?: string | null;
  productStorageUrl?: string | null;
  alt: string;
}): ResolvedShapeImage {
  const {
    productSlug,
    shapeSlug,
    previewKey,
    shapeStorageUrl,
    productStorageUrl,
    alt,
  } = options;
  const imageKey = options.imageKey ?? slugToPlaceholder(productSlug);
  const clockShapeId = shapeSlug ? toClockShapeId(shapeSlug, previewKey) : null;
  const previewShapeId = shapeSlug
    ? toPreviewShapeId(shapeSlug, previewKey)
    : "round";

  const mainImageUrl = getProductMainImagePath(productSlug);
  const shapeImageUrl = shapeSlug
    ? getLocalShapeImagePath(productSlug, shapeSlug, previewKey)
    : null;

  if (shapeStorageUrl && isStorageUrl(shapeStorageUrl)) {
    const imageSource: ProductImageSource = {
      type: "storage",
      storageUrl: shapeStorageUrl,
      alt,
    };
    return {
      mode: "storage",
      storageUrl: shapeStorageUrl,
      localImageUrl: shapeImageUrl ?? mainImageUrl,
      localFallbackUrl: mainImageUrl ?? getLocalFallbackImage(productSlug),
      mainImageUrl,
      shapeImageUrl,
      imageKey,
      previewShapeId,
      clockShapeId,
      alt,
      imageSource,
      useMockup: false,
    };
  }

  if (shapeImageUrl) {
    const imageSource: ProductImageSource = {
      type: "local",
      localUrl: shapeImageUrl,
      fallbackUrl: mainImageUrl ?? getLocalProductImage(productSlug) ?? undefined,
      alt,
    };
    return {
      mode: "local",
      storageUrl: null,
      localImageUrl: shapeImageUrl,
      localFallbackUrl: mainImageUrl ?? getLocalFallbackImage(productSlug),
      mainImageUrl,
      shapeImageUrl,
      imageKey,
      previewShapeId,
      clockShapeId,
      alt,
      imageSource,
      useMockup: false,
    };
  }

  const productMain = mainImageUrl ?? getLocalProductImage(productSlug);
  if (productMain) {
    const imageSource: ProductImageSource = {
      type: "local",
      localUrl: productMain,
      fallbackUrl: getLocalFallbackImage(productSlug) ?? undefined,
      alt,
    };
    return {
      mode: "local",
      storageUrl: null,
      localImageUrl: productMain,
      localFallbackUrl: getLocalFallbackImage(productSlug),
      mainImageUrl: productMain,
      shapeImageUrl: null,
      imageKey,
      previewShapeId,
      clockShapeId,
      alt,
      imageSource,
      useMockup: false,
    };
  }

  if (productStorageUrl && isStorageUrl(productStorageUrl)) {
    const imageSource = resolveProductImage(
      imageKey,
      productStorageUrl,
      alt,
      productSlug,
    );
    return {
      mode: imageSource.type,
      storageUrl: productStorageUrl,
      localImageUrl: null,
      localFallbackUrl: getLocalFallbackImage(productSlug),
      mainImageUrl: null,
      shapeImageUrl: null,
      imageKey,
      previewShapeId,
      clockShapeId,
      alt,
      imageSource,
      useMockup: imageSource.type === "mockup",
    };
  }

  const imageSource = resolveProductImage(imageKey, null, alt, productSlug);
  return {
    mode: "mockup",
    storageUrl: null,
    localImageUrl: null,
    localFallbackUrl: getLocalFallbackImage(productSlug),
    mainImageUrl: null,
    shapeImageUrl: null,
    imageKey,
    previewShapeId,
    clockShapeId,
    alt,
    imageSource,
    useMockup: true,
  };
}

export function productSupportsShapeImages(productSlug: string): boolean {
  return productSlug === "custom-clock" || productSlug === "acrylic-photo-frame";
}

export function getSelectableProductShapes<T extends { shapeType: string; slug: string; previewKey?: string | null }>(
  shapes: T[],
  productSlug?: string,
): T[] {
  if (productSlug === "custom-clock") {
    return shapes.filter(
      (s) => s.shapeType === "clock" && isClockShapeId(s.slug),
    ) as T[];
  }
  return shapes.filter(
    (s) => s.shapeType === "clock" || s.shapeType === "acrylic",
  );
}
