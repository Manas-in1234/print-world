import type { CatalogShape } from "@/lib/catalog/mappers";
import { getClockDisplayShapes } from "@/data/clock-shapes";

/** Shapes shown in product detail / editor for a given product. */
export function getProductDisplayShapes(
  productSlug: string,
  catalogShapes: CatalogShape[],
  productId: string,
  basePrice: number,
): CatalogShape[] {
  if (productSlug === "custom-clock") {
    return getClockDisplayShapes(catalogShapes, productId, basePrice);
  }
  return catalogShapes.filter((s) => s.shapeType === "acrylic");
}
