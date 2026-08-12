import { getProducts, getHomepageShapes } from "@/lib/catalog/products";
import { getSiteSettings } from "@/lib/site-settings";
import type { CatalogProduct, CatalogShape } from "@/lib/catalog/mappers";

export interface HomepageData {
  hero: { headline?: string; subheadline?: string };
  featuredSlugs: string[];
  products: CatalogProduct[];
  productsError: string | null;
  shapes: {
    acrylic: CatalogShape[];
    clock: CatalogShape[];
    explore: CatalogShape[];
  };
}

/** Single consolidated fetch for homepage — deduplicated via React cache(). */
export async function getHomepageData(): Promise<HomepageData> {
  const [settings, shapes, allProductsResult] = await Promise.all([
    getSiteSettings(),
    getHomepageShapes(),
    getProducts({}),
  ]);

  const { featuredSlugs } = settings;
  const { data: allProducts, error } = allProductsResult;

  const products = featuredSlugs.length
    ? featuredSlugs
        .map((slug) => allProducts.find((p) => p.slug === slug))
        .filter((p): p is CatalogProduct => Boolean(p))
    : allProducts.filter((p) => p.featured);

  return {
    hero: settings.hero,
    featuredSlugs,
    products,
    productsError: error,
    shapes,
  };
}
