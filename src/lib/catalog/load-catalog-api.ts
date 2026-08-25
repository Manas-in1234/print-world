import { getCatalogBundle } from "@/lib/catalog/catalog-service";
import type { CatalogApiResponse, ProductQueryOptions } from "@/lib/catalog/catalog-service";

/**
 * Load catalog directly via the catalog service.
 * Avoids loopback HTTP roundtrips during server rendering.
 */
export async function loadCatalogFromApi(
  options: ProductQueryOptions = {},
): Promise<CatalogApiResponse> {
  try {
    return await getCatalogBundle(options);
  } catch (err) {
    return {
      products: [],
      categories: [],
      shapes: { acrylic: [], clock: [], explore: [] },
      configured: false,
      error: err instanceof Error ? err.message : "Could not load catalog.",
    };
  }
}
