/**
 * Catalog query helpers — delegate to server-side catalog service (service role).
 * Public product reads do NOT depend on NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY.
 */
export {
  getProductsFromService as getProducts,
  getCategoriesFromService as getCategories,
  getHomepageShapesFromService as getHomepageShapes,
  getProductBySlugFromService as getProductBySlug,
  getProductSlugsFromService as getProductSlugs,
  getCatalogBundle,
} from "@/lib/catalog/catalog-service";

export type {
  ProductQueryOptions,
  CatalogQueryResult,
  CatalogApiResponse,
} from "@/lib/catalog/catalog-service";

import { getProductsFromService } from "@/lib/catalog/catalog-service";

/** Convenience wrapper — returns products array only (legacy callers). */
export async function getProductsList(
  options: Parameters<typeof getProductsFromService>[0] = {},
) {
  const { data } = await getProductsFromService(options);
  return data;
}

import type { CatalogShape } from "@/lib/catalog/mappers";
import { getHomepageShapesFromService } from "@/lib/catalog/catalog-service";

export async function getShapesByType(
  shapeType: "acrylic" | "clock" | "explore",
): Promise<CatalogShape[]> {
  const all = await getHomepageShapesFromService();
  return all[shapeType];
}

export async function getAcrylicShapes(): Promise<CatalogShape[]> {
  return getShapesByType("acrylic");
}

export async function getClockShapes(): Promise<CatalogShape[]> {
  return getShapesByType("clock");
}

export async function getExploreShapes(): Promise<CatalogShape[]> {
  return getShapesByType("explore");
}
