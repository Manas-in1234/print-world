"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/cart-context";
import { formatPrice } from "@/lib/format-price";

interface ProductDetailActionsProps {
  product: CatalogProduct;
  initialShapeSlug?: string;
}

export function ProductDetailActions({
  product,
  initialShapeSlug,
}: ProductDetailActionsProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariantId, setSelectedVariantId] = useState(
    product.variants[0]?.id ?? "",
  );
  const [selectedShapeId, setSelectedShapeId] = useState(() => {
    if (initialShapeSlug) {
      return product.shapes.find((s) => s.slug === initialShapeSlug)?.id ?? "";
    }
    return product.shapes[0]?.id ?? "";
  });
  const [added, setAdded] = useState(false);

  const sizeVariants = product.variants.filter((v) => v.variantType === "size");
  const materialVariants = product.variants.filter(
    (v) => v.variantType === "material",
  );

  const selectedVariant = product.variants.find((v) => v.id === selectedVariantId);
  const selectedShape = product.shapes.find((s) => s.id === selectedShapeId);

  const unitPrice = useMemo(() => {
    if (selectedVariant) return selectedVariant.price;
    if (selectedShape) return selectedShape.startingPrice;
    return product.startingPrice;
  }, [selectedVariant, selectedShape, product.startingPrice]);

  function handleAddToCart() {
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantId: selectedVariant?.id,
      variantName: selectedVariant?.name,
      shapeId: selectedShape?.id,
      shapeName: selectedShape?.name,
      imageKey: product.imageKey,
      quantity,
      unitPrice,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-6">
      <p className="text-lg font-semibold text-foreground">
        Starting {formatPrice(unitPrice, product.currency)}
      </p>

      {sizeVariants.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Size</p>
          <div className="flex flex-wrap gap-2">
            {sizeVariants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantId(v.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  selectedVariantId === v.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-card-border bg-card text-foreground hover:border-accent"
                }`}
              >
                {v.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {materialVariants.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Material</p>
          <div className="flex flex-wrap gap-2">
            {materialVariants.map((v) => (
              <button
                key={v.id}
                type="button"
                onClick={() => setSelectedVariantId(v.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  selectedVariantId === v.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-card-border bg-card text-foreground hover:border-accent"
                }`}
              >
                {v.name} — {formatPrice(v.price)}
              </button>
            ))}
          </div>
        </div>
      )}

      {product.shapes.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-foreground">Shape</p>
          <div className="flex flex-wrap gap-2">
            {product.shapes.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setSelectedShapeId(s.id)}
                className={`rounded-full border px-4 py-2 text-sm transition-all ${
                  selectedShapeId === s.id
                    ? "border-foreground bg-foreground text-background"
                    : "border-card-border bg-card text-foreground hover:border-accent"
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label htmlFor="quantity" className="mb-2 block text-sm font-medium text-foreground">
          Quantity
        </label>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(1, q - 1))}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-lg hover:border-accent"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <span id="quantity" className="min-w-[2rem] text-center text-lg font-medium">
            {quantity}
          </span>
          <button
            type="button"
            onClick={() => setQuantity((q) => q + 1)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-card-border bg-card text-lg hover:border-accent"
            aria-label="Increase quantity"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <Button
          href={
            selectedShape
              ? `/customize/${product.slug}?shape=${encodeURIComponent(selectedShape.slug)}`
              : `/customize/${product.slug}`
          }
          variant="secondary"
          size="lg"
          className="flex-1"
        >
          Customize
        </Button>
        <button
          type="button"
          onClick={handleAddToCart}
          className="inline-flex flex-1 items-center justify-center rounded-full bg-foreground px-8 py-3.5 text-base font-medium text-background shadow-soft transition-all hover:bg-foreground/90 hover:shadow-soft-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          Add to Cart
        </button>
      </div>

      {added && (
        <p className="text-sm text-accent" role="status">
          Added to cart!{" "}
          <button
            type="button"
            className="underline"
            onClick={() => router.push("/cart")}
          >
            View cart
          </button>
        </p>
      )}
    </div>
  );
}
