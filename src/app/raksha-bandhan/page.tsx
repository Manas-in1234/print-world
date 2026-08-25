import type { Metadata } from "next";
import { campaignPages } from "@/data/campaign-pages";
import { loadCatalogFromApi } from "@/lib/catalog/load-catalog-api";
import { CampaignView } from "@/components/campaign/CampaignView";
import type { CatalogProduct } from "@/lib/catalog/mappers";

const campaign = campaignPages["raksha-bandhan"];

export const metadata: Metadata = {
  title: campaign.seo.title,
  description: campaign.seo.description,
  openGraph: {
    title: campaign.seo.title,
    description: campaign.seo.description,
    images: [{ url: "/product-assets/hero-products.jpg" }],
  },
};

export default async function RakshaBandhanPage() {
  const catalog = await loadCatalogFromApi({});
  const allProducts = catalog.products;

  const trendingProducts: CatalogProduct[] = campaign.trendingProductSlugs
    .map((slug) => allProducts.find((p) => p.slug === slug))
    .filter((p): p is CatalogProduct => Boolean(p));

  const finalProducts =
    trendingProducts.length > 0 ? trendingProducts : allProducts.slice(0, 6);

  return (
    <CampaignView campaign={campaign} trendingProducts={finalProducts} />
  );
}
