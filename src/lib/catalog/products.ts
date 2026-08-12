import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { SUPABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/supabase/env";
import {
  mapProductRow,
  mapShapeRow,
  type CatalogProduct,
  type CatalogShape,
} from "@/lib/catalog/mappers";
import type {
  DbCategory,
  DbProduct,
  DbProductImage,
  DbProductShape,
  DbProductVariant,
} from "@/types/database";

export interface ProductQueryOptions {
  featured?: boolean;
  category?: string;
  slugs?: string[];
  sort?: "price-asc" | "price-desc" | "name" | "default";
  limit?: number;
}

export interface CatalogQueryResult<T> {
  data: T;
  error: string | null;
  configured: boolean;
}

function logCatalogError(context: string, message: string) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[catalog] ${context}: ${message}`);
  }
}

async function fetchRelatedData(productIds: string[]) {
  const supabase = await createClient();
  if (!supabase || productIds.length === 0) {
    return { variants: [], shapes: [], images: [], error: null as string | null };
  }

  const [variantsRes, shapesRes, imagesRes] = await Promise.all([
    supabase
      .from("product_variants")
      .select("*")
      .in("product_id", productIds)
      .eq("active", true),
    supabase
      .from("product_shapes")
      .select("*")
      .in("product_id", productIds)
      .eq("active", true)
      .order("sort_order"),
    supabase
      .from("product_images")
      .select("*")
      .in("product_id", productIds)
      .order("sort_order"),
  ]);

  const error =
    variantsRes.error?.message ??
    shapesRes.error?.message ??
    imagesRes.error?.message ??
    null;

  if (error) {
    logCatalogError("fetchRelatedData", error);
  }

  return {
    variants: (variantsRes.data ?? []) as DbProductVariant[],
    shapes: (shapesRes.data ?? []) as DbProductShape[],
    images: (imagesRes.data ?? []) as DbProductImage[],
    error,
  };
}

function sortProducts(
  products: CatalogProduct[],
  sort: ProductQueryOptions["sort"],
): CatalogProduct[] {
  switch (sort) {
    case "price-asc":
      return [...products].sort((a, b) => a.startingPrice - b.startingPrice);
    case "price-desc":
      return [...products].sort((a, b) => b.startingPrice - a.startingPrice);
    case "name":
      return [...products].sort((a, b) => a.name.localeCompare(b.name));
    default:
      return [...products].sort((a, b) => a.sortOrder - b.sortOrder);
  }
}

export const getProducts = cache(async function getProducts(
  options: ProductQueryOptions = {},
): Promise<CatalogQueryResult<CatalogProduct[]>> {
  const supabase = await createClient();
  if (!supabase) {
    return {
      data: [],
      error: SUPABASE_NOT_CONFIGURED_MESSAGE,
      configured: false,
    };
  }

  let query = supabase.from("products").select("*").eq("active", true);

  if (options.featured) query = query.eq("featured", true);
  if (options.category) query = query.eq("category", options.category);
  if (options.slugs?.length) query = query.in("slug", options.slugs);
  if (options.limit) query = query.limit(options.limit);

  query = query.order("sort_order");

  const { data, error } = await query;

  if (error) {
    logCatalogError("getProducts", error.message);
    return { data: [], error: error.message, configured: true };
  }

  if (!data?.length) {
    return { data: [], error: null, configured: true };
  }

  const rows = data as DbProduct[];
  const ids = rows.map((r) => r.id);
  const related = await fetchRelatedData(ids);

  const products = rows.map((row) =>
    mapProductRow(
      row,
      related.variants.filter((v) => v.product_id === row.id),
      related.shapes.filter((s) => s.product_id === row.id),
      related.images.filter((i) => i.product_id === row.id),
    ),
  );

  return {
    data: sortProducts(products, options.sort),
    error: related.error,
    configured: true,
  };
});

/** Convenience wrapper — returns products array only (legacy callers). */
export async function getProductsList(
  options: ProductQueryOptions = {},
): Promise<CatalogProduct[]> {
  const { data } = await getProducts(options);
  return data;
}

export const getProductBySlug = cache(async function getProductBySlug(
  slug: string,
): Promise<CatalogProduct | null> {
  const supabase = await createClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    logCatalogError("getProductBySlug", error.message);
    return null;
  }

  if (!data) return null;

  const row = data as DbProduct;
  const { variants, shapes, images } = await fetchRelatedData([row.id]);

  return mapProductRow(row, variants, shapes, images);
});

export const getProductSlugs = cache(async function getProductSlugs(): Promise<string[]> {
  const supabase = await createClient();
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("products")
    .select("slug")
    .eq("active", true);

  if (error) {
    logCatalogError("getProductSlugs", error.message);
    return [];
  }

  return ((data ?? []) as { slug: string }[]).map((p) => p.slug);
});

export const getCategories = cache(async function getCategories(): Promise<CatalogQueryResult<DbCategory[]>> {
  const supabase = await createClient();
  if (!supabase) {
    return { data: [], error: null, configured: false };
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error) {
    logCatalogError("getCategories", error.message);
    return { data: [], error: error.message, configured: true };
  }

  return { data: (data ?? []) as DbCategory[], error: null, configured: true };
});

/** Single query for all homepage shape types — avoids 3 separate fetches. */
export const getHomepageShapes = cache(async function getHomepageShapes(): Promise<{
  acrylic: CatalogShape[];
  clock: CatalogShape[];
  explore: CatalogShape[];
}> {
  const supabase = await createClient();
  if (!supabase) return { acrylic: [], clock: [], explore: [] };

  const { data: shapes, error } = await supabase
    .from("product_shapes")
    .select("*")
    .in("shape_type", ["acrylic", "clock", "explore"])
    .eq("active", true)
    .order("sort_order");

  if (error || !shapes) {
    logCatalogError("getHomepageShapes", error?.message ?? "no data");
    return { acrylic: [], clock: [], explore: [] };
  }

  const shapeRows = shapes as DbProductShape[];
  const productIds = [...new Set(shapeRows.map((s) => s.product_id))];

  const { data: products } = await supabase
    .from("products")
    .select("id, base_price")
    .in("id", productIds);

  const priceMap = new Map(
    ((products ?? []) as { id: string; base_price: number }[]).map((p) => [
      p.id,
      Number(p.base_price),
    ]),
  );

  const mapped = shapeRows.map((shape) =>
    mapShapeRow(shape, priceMap.get(shape.product_id) ?? 0),
  );

  return {
    acrylic: mapped.filter((s) => s.shapeType === "acrylic"),
    clock: mapped.filter((s) => s.shapeType === "clock"),
    explore: mapped.filter((s) => s.shapeType === "explore"),
  };
});

export async function getShapesByType(
  shapeType: "acrylic" | "clock" | "explore",
): Promise<CatalogShape[]> {
  const all = await getHomepageShapes();
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
