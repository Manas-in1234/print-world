import type { CatalogProduct } from "@/lib/catalog/mappers";
import {
  productLandingPages,
  getLandingPageByProductSlug,
  type ProductLandingConfig,
} from "@/data/landing-pages";
import {
  resolveLandingImage,
  slugToPlaceholder,
  type ResolvedLandingImage,
} from "@/lib/images/resolve-landing-image";

export interface LandingCategoryCard {
  slug: string;
  name: string;
  description: string;
  href: string;
  /** @deprecated Prefer resolvedImage — kept for simple consumers */
  imageUrl: string;
  resolvedImage: ResolvedLandingImage;
  startingPrice: number;
  currency: "INR";
}

/** Build homepage/landing category cards from catalog + centralized config. */
export function buildLandingCategoryCards(
  products: CatalogProduct[],
): LandingCategoryCard[] {
  const bySlug = new Map(products.map((p) => [p.slug, p]));

  return productLandingPages.map((landing) => {
    const product = bySlug.get(landing.productSlug);
    const name = product?.name ?? landing.title;
    const imageKey = product?.imageKey ?? slugToPlaceholder(landing.productSlug);
    const resolved = resolveLandingImage(
      landing.productSlug,
      imageKey,
      product?.images[0]?.url,
      name,
    );

    const imageUrl =
      (resolved.mode === "storage" && resolved.storageUrl) ||
      resolved.localImageUrl ||
      `/product-assets/${landing.assetKey}.jpg`;

    return {
      slug: landing.productSlug,
      name,
      description: product?.shortDescription ?? landing.description,
      href: landing.route,
      imageUrl,
      resolvedImage: resolved,
      startingPrice: product?.startingPrice ?? landing.fallbackStartingPrice,
      currency: "INR" as const,
    };
  });
}

export function getLandingConfigForProduct(slug: string): ProductLandingConfig | undefined {
  return getLandingPageByProductSlug(slug);
}

/** @deprecated Use productLandingPages from landing-pages.ts */
export { productLandingPages as productCategories };
