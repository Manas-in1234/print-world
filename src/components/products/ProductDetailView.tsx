"use client";

import { useMemo, useState } from "react";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { getClockShapeAlt } from "@/data/clock-shapes";
import { getProductDisplayShapes } from "@/lib/catalog/clock-shape-catalog";
import { ShapeProductImage, ShapeThumbnail } from "@/components/landing/ShapeProductImage";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { resolveShapeImage } from "@/lib/images/product-shape-images";

interface ProductDetailViewProps {
  product: CatalogProduct;
  initialShapeSlug?: string;
}

export function ProductDetailView({ product, initialShapeSlug }: ProductDetailViewProps) {
  const selectableShapes = useMemo(
    () => getProductDisplayShapes(product.slug, product.shapes, product.id, product.startingPrice),
    [product],
  );

  const [selectedShapeId, setSelectedShapeId] = useState(() => {
    if (initialShapeSlug) {
      return selectableShapes.find((s) => s.slug === initialShapeSlug)?.id ?? "";
    }
    return selectableShapes[0]?.id ?? "";
  });

  const selectedShape = selectableShapes.find((s) => s.id === selectedShapeId);

  const mainImage = useMemo(
    () =>
      resolveShapeImage({
        productSlug: product.slug,
        imageKey: product.imageKey,
        shapeSlug: selectedShape?.slug,
        previewKey: selectedShape?.previewKey,
        shapeStorageUrl:
          selectedShape?.previewKey?.startsWith("http")
            ? selectedShape.previewKey
            : null,
        productStorageUrl: product.images[0]?.url,
        alt: selectedShape
          ? product.slug === "custom-clock"
            ? getClockShapeAlt(selectedShape.name)
            : `${product.name} — ${selectedShape.name}`
          : product.name,
      }),
    [product, selectedShape],
  );

  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div>
        <div className="relative aspect-square overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-surface to-background shadow-soft">
          <ShapeProductImage resolved={mainImage} priority sizes="(max-width: 1024px) 100vw, 50vw" />
        </div>

        {selectableShapes.length > 0 && (
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium text-foreground">Shape</p>
            <div className="flex gap-2 overflow-x-auto pb-1" role="listbox" aria-label="Select clock shape">
              {selectableShapes.map((shape) => {
                const thumb = resolveShapeImage({
                  productSlug: product.slug,
                  imageKey: product.imageKey,
                  shapeSlug: shape.slug,
                  previewKey: shape.previewKey,
                  shapeStorageUrl:
                    shape.previewKey?.startsWith("http") ? shape.previewKey : null,
                  productStorageUrl: product.images[0]?.url,
                  alt: product.slug === "custom-clock"
                    ? getClockShapeAlt(shape.name)
                    : `${shape.name} shape`,
                });
                return (
                  <div key={shape.id} className="flex shrink-0 flex-col items-center gap-1">
                    <ShapeThumbnail
                      resolved={thumb}
                      selected={selectedShapeId === shape.id}
                      label={shape.name}
                      onClick={() => setSelectedShapeId(shape.id)}
                    />
                    <span className="max-w-[5rem] truncate text-center text-xs text-muted">
                      {shape.name}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {product.images.length > 1 && (
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
            {product.images.map((img) => (
              <div
                key={img.id}
                className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-card-border bg-card"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={img.url}
                  alt={img.altText ?? product.name}
                  className="h-full w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-col justify-center">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent capitalize">
          {product.category}
        </p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
          {product.name}
        </h1>
        {selectedShape && (
          <p className="mt-1 text-sm text-muted">Selected shape: {selectedShape.name}</p>
        )}
        <p className="mt-4 text-base leading-relaxed text-muted">{product.description}</p>
        <div className="mt-8">
          <ProductDetailActions
            product={product}
            selectedShapeId={selectedShapeId}
            selectableShapes={selectableShapes}
          />
        </div>
      </div>
    </div>
  );
}
