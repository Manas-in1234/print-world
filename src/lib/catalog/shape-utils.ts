import type { ProductShapeId } from "@/types/navigation";

/** Normalize DB shape slug (e.g. round-explore, round-clock, heart-clock) to base slug. */
export function normalizeShapeSlug(slug: string): string {
  return slug.replace(/-(explore|clock)$/, "");
}

/** Normalize DB shape slug (e.g. round-explore, round-clock) to a preview shape id. */
export function toPreviewShapeId(slug: string, previewKey?: string | null): ProductShapeId {
  if (previewKey && isProductShapeId(previewKey)) return previewKey;
  const base = normalizeShapeSlug(slug);
  if (isProductShapeId(base)) return base;
  return "round";
}

function isProductShapeId(value: string): value is ProductShapeId {
  return [
    "round",
    "square",
    "rectangle",
    "hexagon",
    "heart",
    "star",
    "bean",
    "egg",
    "floral",
  ].includes(value);
}
