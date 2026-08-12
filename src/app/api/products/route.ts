import { NextResponse } from "next/server";
import { getCatalogBundle } from "@/lib/catalog/catalog-service";
import type { ProductQueryOptions } from "@/lib/catalog/catalog-service";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const options: ProductQueryOptions = {};
  if (searchParams.get("featured") === "true") options.featured = true;
  const category = searchParams.get("category");
  if (category) options.category = category;
  const slugs = searchParams.get("slugs");
  if (slugs) options.slugs = slugs.split(",").map((s) => s.trim()).filter(Boolean);
  const sort = searchParams.get("sort");
  if (sort === "price-asc" || sort === "price-desc" || sort === "name" || sort === "default") {
    options.sort = sort;
  }
  const limit = searchParams.get("limit");
  if (limit) options.limit = Number(limit);

  try {
    const payload = await getCatalogBundle(options);

    if (!payload.configured) {
      return NextResponse.json(payload, { status: 503 });
    }

    if (payload.error && payload.products.length === 0) {
      return NextResponse.json(payload, { status: 502 });
    }

    return NextResponse.json(payload);
  } catch (err) {
    const message = err instanceof Error ? err.message : "Catalog fetch failed";
    return NextResponse.json(
      {
        products: [],
        categories: [],
        shapes: { acrylic: [], clock: [], explore: [] },
        configured: false,
        error: message,
      },
      { status: 500 },
    );
  }
}
