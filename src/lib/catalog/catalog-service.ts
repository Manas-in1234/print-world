import {
  mapProductRow,
  mapShapeRow,
  type CatalogProduct,
  type CatalogShape,
  toProductPlaceholder,
} from "@/lib/catalog/mappers";
import type {
  DbCategory,
  DbProduct,
  DbProductImage,
  DbProductShape,
  DbProductVariant,
} from "@/types/database";
import {
  getCatalogClient,
  validateCatalogEnv,
} from "@/lib/catalog/catalog-client";
import { products as staticProducts } from "@/data/products";
import { categories as staticCategories } from "@/data/categories";
import { shapes as staticShapes } from "@/data/shapes";
import { CLOCK_SHAPE_DEFINITIONS } from "@/data/clock-shapes";
import { acrylicItems } from "@/data/acrylic-items";

function getMockProducts(): CatalogProduct[] {
  return staticProducts.map((p) => {
    let shapes: CatalogShape[] = [];
    if (p.slug === "custom-clock") {
      shapes = CLOCK_SHAPE_DEFINITIONS.map((def) => ({
        id: `mock-shape-${def.slug}`,
        productId: p.id,
        name: def.name,
        slug: def.slug,
        shapeType: "clock",
        previewKey: def.previewKey,
        priceAdjustment: def.priceAdjustment,
        sortOrder: def.sortOrder,
        startingPrice: p.startingPrice + def.priceAdjustment,
      }));
    } else if (p.slug === "acrylic-photo-frame") {
      shapes = acrylicItems.map((item, idx) => ({
        id: `mock-acrylic-${item.slug}`,
        productId: p.id,
        name: item.label,
        slug: item.slug,
        shapeType: "acrylic",
        previewKey: item.slug,
        priceAdjustment: Math.max(0, item.startingPrice - p.startingPrice),
        sortOrder: idx + 1,
        startingPrice: item.startingPrice,
      }));
    }

    return {
      id: p.id,
      slug: p.slug,
      name: p.name,
      description: p.description,
      shortDescription: p.shortDescription,
      startingPrice: p.startingPrice,
      currency: "INR",
      category: p.category,
      categorySlug: p.category,
      imageKey: toProductPlaceholder(p.slug, p.imagePlaceholder),
      featured: p.featured,
      sortOrder: p.sortOrder,
      variants: [],
      shapes,
      images: [
        {
          id: `img-${p.id}`,
          url: `/product-assets/${p.slug}.jpg`,
          altText: p.name,
          sortOrder: 1,
        },
      ],
    };
  });
}

function getMockCategories(): DbCategory[] {
  return staticCategories.map((c) => ({
    id: c.id,
    name: c.label,
    slug: c.id,
    description: c.description ?? null,
    image: null,
    active: true,
    created_at: new Date().toISOString(),
  }));
}

function getMockShapes(): {
  acrylic: CatalogShape[];
  clock: CatalogShape[];
  explore: CatalogShape[];
} {
  return {
    acrylic: acrylicItems.map((item, idx) => ({
      id: `mock-acrylic-${item.slug}`,
      productId: "2",
      name: item.label,
      slug: item.slug,
      shapeType: "acrylic",
      previewKey: item.slug,
      priceAdjustment: Math.max(0, item.startingPrice - 499),
      sortOrder: idx + 1,
      startingPrice: item.startingPrice,
    })),
    clock: CLOCK_SHAPE_DEFINITIONS.map((def) => ({
      id: `mock-shape-${def.slug}`,
      productId: "6",
      name: def.name,
      slug: def.slug,
      shapeType: "clock",
      previewKey: def.previewKey,
      priceAdjustment: def.priceAdjustment,
      sortOrder: def.sortOrder,
      startingPrice: 799 + def.priceAdjustment,
    })),
    explore: staticShapes.map((s, idx) => ({
      id: `mock-explore-${s.id}`,
      productId: "6",
      name: s.label,
      slug: s.id,
      shapeType: "explore",
      previewKey: s.id,
      priceAdjustment: 0,
      sortOrder: idx + 1,
      startingPrice: 799,
    })),
  };
}

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

export interface CatalogApiResponse {
  products: CatalogProduct[];
  categories: { slug: string; name: string }[];
  shapes: {
    acrylic: CatalogShape[];
    clock: CatalogShape[];
    explore: CatalogShape[];
  };
  configured: boolean;
  error: string | null;
}

function logCatalogError(context: string, message: string) {
  if (process.env.NODE_ENV === "development") {
    console.error(`[catalog] ${context}: ${message}`);
  }
}

async function fetchRelatedData(supabase: NonNullable<ReturnType<typeof getCatalogClient>>, productIds: string[]) {
  if (productIds.length === 0) {
    return { variants: [], shapes: [], images: [], error: null as string | null };
  }

  const [variantsRes, shapesRes, imagesRes] = await Promise.all([
    supabase.from("product_variants").select("*").in("product_id", productIds).eq("active", true),
    supabase.from("product_shapes").select("*").in("product_id", productIds).eq("active", true).order("sort_order"),
    supabase.from("product_images").select("*").in("product_id", productIds).order("sort_order"),
  ]);

  const error =
    variantsRes.error?.message ??
    shapesRes.error?.message ??
    imagesRes.error?.message ??
    null;

  if (error) logCatalogError("fetchRelatedData", error);

  return {
    variants: (variantsRes.data ?? []) as DbProductVariant[],
    shapes: (shapesRes.data ?? []) as DbProductShape[],
    images: (imagesRes.data ?? []) as DbProductImage[],
    error,
  };
}

function sortProducts(products: CatalogProduct[], sort: ProductQueryOptions["sort"]): CatalogProduct[] {
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

function filterMockProducts(options: ProductQueryOptions): CatalogProduct[] {
  let list = getMockProducts();
  if (options.featured) list = list.filter((p) => p.featured);
  if (options.category) list = list.filter((p) => p.category === options.category);
  if (options.slugs?.length) list = list.filter((p) => options.slugs!.includes(p.slug));
  if (options.limit) list = list.slice(0, options.limit);
  return sortProducts(list, options.sort);
}

export async function getProductsFromService(
  options: ProductQueryOptions = {},
): Promise<CatalogQueryResult<CatalogProduct[]>> {
  const supabase = getCatalogClient();
  if (!supabase) {
    return { data: filterMockProducts(options), error: null, configured: false };
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
    return { data: filterMockProducts(options), error: error.message, configured: true };
  }

  if (!data?.length) {
    return { data: filterMockProducts(options), error: null, configured: true };
  }

  const rows = data as DbProduct[];
  const ids = rows.map((r) => r.id);
  const related = await fetchRelatedData(supabase, ids);

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
}

export async function getCategoriesFromService(): Promise<CatalogQueryResult<DbCategory[]>> {
  const supabase = getCatalogClient();
  if (!supabase) {
    return { data: getMockCategories(), error: null, configured: false };
  }

  const { data, error } = await supabase
    .from("categories")
    .select("*")
    .eq("active", true)
    .order("name");

  if (error || !data?.length) {
    if (error) logCatalogError("getCategories", error.message);
    return { data: getMockCategories(), error: error?.message ?? null, configured: true };
  }

  return { data: (data ?? []) as DbCategory[], error: null, configured: true };
}

export async function getHomepageShapesFromService(): Promise<{
  acrylic: CatalogShape[];
  clock: CatalogShape[];
  explore: CatalogShape[];
}> {
  const supabase = getCatalogClient();
  if (!supabase) return getMockShapes();

  const { data: shapes, error } = await supabase
    .from("product_shapes")
    .select("*")
    .in("shape_type", ["acrylic", "clock", "explore"])
    .eq("active", true)
    .order("sort_order");

  if (error || !shapes || shapes.length === 0) {
    if (error) logCatalogError("getHomepageShapes", error?.message ?? "no data");
    return getMockShapes();
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
}

export async function getProductBySlugFromService(slug: string): Promise<CatalogProduct | null> {
  const supabase = getCatalogClient();
  if (!supabase) {
    return getMockProducts().find((p) => p.slug === slug) ?? null;
  }

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .maybeSingle();

  if (error) {
    logCatalogError("getProductBySlug", error.message);
    return getMockProducts().find((p) => p.slug === slug) ?? null;
  }

  if (!data) return getMockProducts().find((p) => p.slug === slug) ?? null;

  const row = data as DbProduct;
  const related = await fetchRelatedData(supabase, [row.id]);

  return mapProductRow(row, related.variants, related.shapes, related.images);
}

export async function getProductSlugsFromService(): Promise<string[]> {
  const supabase = getCatalogClient();
  if (!supabase) return getMockProducts().map((p) => p.slug);

  const { data, error } = await supabase.from("products").select("slug").eq("active", true);

  if (error || !data?.length) {
    if (error) logCatalogError("getProductSlugs", error.message);
    return getMockProducts().map((p) => p.slug);
  }

  return ((data ?? []) as { slug: string }[]).map((p) => p.slug);
}

/** Full catalog payload — used by GET /api/products and server pages. */
export async function getCatalogBundle(
  options: ProductQueryOptions = {},
): Promise<CatalogApiResponse> {
  const envStatus = validateCatalogEnv();
  if (!envStatus.ok) {
    const mockProds = filterMockProducts(options);
    const mockCats = getMockCategories();
    const mockShapes = getMockShapes();
    return {
      products: mockProds,
      categories: mockCats.map((c) => ({ slug: c.slug, name: c.name })),
      shapes: mockShapes,
      configured: false,
      error: null,
    };
  }

  const [productsResult, categoriesResult, shapes] = await Promise.all([
    getProductsFromService(options),
    getCategoriesFromService(),
    getHomepageShapesFromService(),
  ]);

  const error = productsResult.error ?? categoriesResult.error ?? null;

  return {
    products: productsResult.data,
    categories: categoriesResult.data.map((c) => ({ slug: c.slug, name: c.name })),
    shapes,
    configured: productsResult.configured && categoriesResult.configured,
    error,
  };
}
