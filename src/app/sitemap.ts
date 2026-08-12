import type { MetadataRoute } from "next";
import { getProducts } from "@/lib/catalog/products";
import { getAllLandingRoutes } from "@/data/landing-pages";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://printworld.example.com";
  const { data: products } = await getProducts();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/products`, changeFrequency: "weekly", priority: 0.9 },
    ...getAllLandingRoutes().map((route) => ({
      url: `${baseUrl}${route}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    { url: `${baseUrl}/services`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/business`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/inspiration`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/about`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/ai-studio`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${baseUrl}/cart`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const productRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/products/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const customizeRoutes: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${baseUrl}/customize/${p.slug}`,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...productRoutes, ...customizeRoutes];
}
