import type { ProductPlaceholder } from "@/types/product";
import type {
  DbProduct,
  DbProductImage,
  DbProductShape,
  DbProductVariant,
} from "@/types/database";

export interface CatalogProduct {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  startingPrice: number;
  currency: "INR";
  category: string;
  categorySlug: string;
  imageKey: ProductPlaceholder;
  featured: boolean;
  sortOrder: number;
  variants: CatalogVariant[];
  shapes: CatalogShape[];
  images: CatalogImage[];
}

export interface CatalogVariant {
  id: string;
  name: string;
  variantType: string;
  price: number;
}

export interface CatalogShape {
  id: string;
  productId: string;
  name: string;
  slug: string;
  shapeType: string;
  previewKey: string | null;
  priceAdjustment: number;
  sortOrder: number;
  startingPrice: number;
}

export interface CatalogImage {
  id: string;
  url: string;
  altText: string | null;
  sortOrder: number;
}

const SLUG_TO_PLACEHOLDER: Record<string, ProductPlaceholder> = {
  "custom-t-shirt": "tshirt",
  "acrylic-photo-frame": "frame",
  "custom-mug": "mug",
  "business-card": "card",
  "custom-poster": "poster",
  "custom-clock": "clock",
};

export function toProductPlaceholder(
  slug: string,
  image: string | null,
): ProductPlaceholder {
  if (image && isValidPlaceholder(image)) return image;
  return SLUG_TO_PLACEHOLDER[slug] ?? "poster";
}

function isValidPlaceholder(value: string): value is ProductPlaceholder {
  return ["tshirt", "frame", "mug", "card", "poster", "clock"].includes(value);
}

export function mapProductRow(
  row: DbProduct,
  variants: DbProductVariant[] = [],
  shapes: DbProductShape[] = [],
  images: DbProductImage[] = [],
): CatalogProduct {
  const imageKey = toProductPlaceholder(row.slug, row.image);
  const shortDescription =
    row.description.length > 80
      ? `${row.description.slice(0, 77)}...`
      : row.description;

  return {
    id: row.id,
    slug: row.slug,
    name: row.name,
    description: row.description,
    shortDescription,
    startingPrice: Number(row.base_price),
    currency: "INR",
    category: row.category,
    categorySlug: row.category,
    imageKey,
    featured: row.featured,
    sortOrder: row.sort_order,
    variants: variants.map(mapVariantRow),
    shapes: shapes.map((s) => mapShapeRow(s, Number(row.base_price))),
    images: images.map(mapImageRow),
  };
}

export function mapVariantRow(row: DbProductVariant): CatalogVariant {
  return {
    id: row.id,
    name: row.name,
    variantType: row.variant_type,
    price: Number(row.price),
  };
}

export function mapShapeRow(
  row: DbProductShape,
  basePrice: number,
): CatalogShape {
  return {
    id: row.id,
    productId: row.product_id,
    name: row.name,
    slug: row.slug,
    shapeType: row.shape_type,
    previewKey: row.preview_image,
    priceAdjustment: Number(row.price_adjustment),
    sortOrder: row.sort_order,
    startingPrice: basePrice + Number(row.price_adjustment),
  };
}

export function mapImageRow(row: DbProductImage): CatalogImage {
  return {
    id: row.id,
    url: row.image_url,
    altText: row.alt_text,
    sortOrder: row.sort_order,
  };
}
