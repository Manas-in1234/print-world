import { getSiteSettings } from "@/lib/site-settings";
import { loadCatalogFromApi } from "@/lib/catalog/load-catalog-api";
import type { CatalogProduct, CatalogShape } from "@/lib/catalog/mappers";

export interface HomepageData {
  hero: { headline?: string; subheadline?: string };
  featuredSlugs: string[];
  products: CatalogProduct[];
  allProducts: CatalogProduct[];
  productsError: string | null;
  shapes: {
    acrylic: CatalogShape[];
    clock: CatalogShape[];
    explore: CatalogShape[];
  };
}

/** Homepage catalog via server API — no browser Supabase env access. */
export async function getHomepageData(): Promise<HomepageData> {
  const [settings, catalog] = await Promise.all([
    getSiteSettings(),
    loadCatalogFromApi({}),
  ]);

  const { featuredSlugs } = settings;
  const { products: allProducts, error, shapes } = catalog;

  const products = featuredSlugs.length
    ? featuredSlugs
        .map((slug) => allProducts.find((p) => p.slug === slug))
        .filter((p): p is CatalogProduct => Boolean(p))
    : allProducts.filter((p) => p.featured);

  return {
    hero: settings.hero,
    featuredSlugs,
    products,
    allProducts,
    productsError: error,
    shapes,
  };
}
