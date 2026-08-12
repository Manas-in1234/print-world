import type { Metadata } from "next";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import type { ProductPlaceholder } from "@/types/product";
import type { ProductLandingConfig, ProductLandingRouteKey } from "@/data/landing-pages";
import { getLandingPageConfig } from "@/data/landing-pages";
import { loadCatalogFromApi } from "@/lib/catalog/load-catalog-api";
import {
  resolveLandingImage,
  slugToPlaceholder,
  type ResolvedLandingImage,
} from "@/lib/images/resolve-landing-image";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProductLandingPage } from "@/components/landing/ProductLandingPage";

export function createLandingMetadata(routeKey: ProductLandingRouteKey): Metadata {
  const config = getLandingPageConfig(routeKey);
  return {
    title: `${config.title} | Print World`,
    description: config.description,
    openGraph: {
      title: config.title,
      description: config.description,
    },
  };
}

export async function renderProductLanding(routeKey: ProductLandingRouteKey) {
  const config = getLandingPageConfig(routeKey);
  const catalog = await loadCatalogFromApi({});
  const product =
    catalog.products.find((p) => p.slug === config.productSlug) ?? null;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <ProductLandingPage
          config={config}
          product={product}
          catalogError={catalog.error}
          relatedProducts={catalog.products.filter(
            (p) => p.slug !== config.productSlug,
          ).slice(0, 3)}
        />
      </main>
      <Footer />
    </>
  );
}

export interface LandingProductDisplay {
  name: string;
  slug: string;
  description: string;
  shortDescription: string;
  startingPrice: number;
  currency: "INR";
  imageKey: ProductPlaceholder;
  storageUrl: string | null;
  localImageUrl: string | null;
  resolvedImage: ResolvedLandingImage;
}

/** Resolve display fields from Supabase product with config fallbacks. */
export function resolveLandingProductDisplay(
  config: ProductLandingConfig,
  product: CatalogProduct | null,
): LandingProductDisplay {
  const name = product?.name ?? config.fallbackName;
  const slug = product?.slug ?? config.productSlug;
  const imageKey =
    product?.imageKey ?? slugToPlaceholder(config.productSlug);
  const storageUrl = product?.images[0]?.url ?? null;

  const resolvedImage = resolveLandingImage(slug, imageKey, storageUrl, name);

  return {
    name,
    slug,
    description: product?.description ?? config.longDescription,
    shortDescription: product?.shortDescription ?? config.description,
    startingPrice: product?.startingPrice ?? config.fallbackStartingPrice,
    currency: product?.currency ?? "INR",
    imageKey,
    storageUrl,
    localImageUrl: resolvedImage.localImageUrl,
    resolvedImage,
  };
}
