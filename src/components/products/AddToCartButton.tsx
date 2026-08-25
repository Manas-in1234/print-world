"use client";

import { useCartActions } from "@/lib/cart/cart-context";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";

export function AddToCartButton({
  product,
  className,
}: {
  product: CatalogProduct;
  className?: string;
}) {
  const { addItem } = useCartActions();

  return (
    <Button
      variant="ghost"
      size="sm"
      className={cn("whitespace-nowrap", className)}
      onClick={() =>
        addItem({
          productId: product.id,
          productSlug: product.slug,
          productName: product.name,
          imageKey: product.imageKey,
          quantity: 1,
          unitPrice: product.startingPrice,
        })
      }
    >
      Add to Cart
    </Button>
  );
}

