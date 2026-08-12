import type { CatalogShape } from "@/lib/catalog/mappers";

/** The seven supported clock shapes — matches local image files under /product-assets/clock/ */
export const CLOCK_SHAPE_DEFINITIONS = [
  { slug: "heart", name: "Heart", previewKey: "heart", sortOrder: 1, priceAdjustment: 100 },
  { slug: "round", name: "Round", previewKey: "round", sortOrder: 2, priceAdjustment: 0 },
  { slug: "square", name: "Square", previewKey: "square", sortOrder: 3, priceAdjustment: 0 },
  { slug: "oval", name: "Oval", previewKey: "oval", sortOrder: 4, priceAdjustment: 0 },
  { slug: "rhombus", name: "Rhombus", previewKey: "rhombus", sortOrder: 5, priceAdjustment: 0 },
  { slug: "custom", name: "Custom", previewKey: "custom", sortOrder: 6, priceAdjustment: 0 },
  { slug: "rectangle", name: "Rectangle", previewKey: "rectangle", sortOrder: 7, priceAdjustment: 50 },
] as const;

export type ClockShapeId = (typeof CLOCK_SHAPE_DEFINITIONS)[number]["slug"];

export const CLOCK_SHAPE_IDS: ClockShapeId[] = CLOCK_SHAPE_DEFINITIONS.map((s) => s.slug);

/** Local filenames — do not rename; user-provided assets in public/product-assets/clock/ */
export const CLOCK_SHAPE_IMAGE_FILES: Record<ClockShapeId, string> = {
  heart: "heart.jpg",
  round: "round.jpg",
  square: "square.jpg",
  oval: "oval.jpg",
  rhombus: "rhombus.jpg",
  custom: "custom.jpg",
  rectangle: "rectangle.jpg",
};

export function isClockShapeId(value: string): value is ClockShapeId {
  return (CLOCK_SHAPE_IDS as readonly string[]).includes(value);
}

/** Normalize slug/preview key to one of the seven clock shape IDs. */
export function toClockShapeId(slug: string, previewKey?: string | null): ClockShapeId | null {
  const base = slug.replace(/-(explore|clock)$/, "");
  if (previewKey && isClockShapeId(previewKey)) return previewKey;
  if (isClockShapeId(base)) return base;
  return null;
}

/** /product-assets/clock/{shape}.jpg */
export function getClockShapeImagePath(shapeId: ClockShapeId): string {
  return `/product-assets/clock/${CLOCK_SHAPE_IMAGE_FILES[shapeId]}`;
}

export function getClockShapeAlt(name: string): string {
  return `${name} shaped personalized clock`;
}

/**
 * Merge Supabase clock shapes with static definitions so all 7 shapes always appear.
 * Catalog records are preferred when present (real IDs/pricing); static entries fill gaps.
 */
export function getClockDisplayShapes(
  catalogShapes: CatalogShape[],
  productId: string,
  basePrice: number,
): CatalogShape[] {
  const clockFromCatalog = catalogShapes.filter((s) => s.shapeType === "clock");

  return CLOCK_SHAPE_DEFINITIONS.map((def) => {
    const fromCatalog = clockFromCatalog.find(
      (s) => s.slug === def.slug || s.previewKey === def.previewKey,
    );
    if (fromCatalog) return fromCatalog;

    return {
      id: `local-clock-${def.slug}`,
      productId,
      name: def.name,
      slug: def.slug,
      shapeType: "clock",
      previewKey: def.previewKey,
      priceAdjustment: def.priceAdjustment,
      sortOrder: def.sortOrder,
      startingPrice: basePrice + def.priceAdjustment,
    };
  });
}
