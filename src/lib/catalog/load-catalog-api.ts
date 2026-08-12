import { headers } from "next/headers";
import type { CatalogApiResponse } from "@/lib/catalog/catalog-service";
import type { ProductQueryOptions } from "@/lib/catalog/catalog-service";

/** Resolve base URL for server-side fetch to /api/products on Vercel. */
async function getServerBaseUrl(): Promise<string> {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  const proto = h.get("x-forwarded-proto") ?? "http";
  if (host) return `${proto}://${host}`;
  return "http://localhost:3000";
}

function buildQuery(options: ProductQueryOptions = {}): string {
  const params = new URLSearchParams();
  if (options.featured) params.set("featured", "true");
  if (options.category) params.set("category", options.category);
  if (options.slugs?.length) params.set("slugs", options.slugs.join(","));
  if (options.sort) params.set("sort", options.sort);
  if (options.limit) params.set("limit", String(options.limit));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

/**
 * Load catalog via the server API route.
 * Browser never reads Supabase env vars — only this server-side fetch runs.
 */
export async function loadCatalogFromApi(
  options: ProductQueryOptions = {},
): Promise<CatalogApiResponse> {
  const base = await getServerBaseUrl();
  const url = `${base}/api/products${buildQuery(options)}`;

  try {
    const res = await fetch(url, { cache: "no-store" });
    const data = (await res.json()) as CatalogApiResponse;
    if (!res.ok && !data.error) {
      return {
        ...data,
        configured: false,
        error: `Catalog API returned ${res.status}.`,
      };
    }
    return data;
  } catch {
    return {
      products: [],
      categories: [],
      shapes: { acrylic: [], clock: [], explore: [] },
      configured: false,
      error: "Could not reach catalog API.",
    };
  }
}
