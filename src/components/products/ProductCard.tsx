import type { CatalogProduct } from "@/lib/catalog/mappers";
import { Button } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductPreview } from "@/components/products/ProductPreview";
import { formatPrice } from "@/lib/format-price";
import { resolveProductImage } from "@/lib/images/product-image";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: CatalogProduct;
}

export function ProductCard({ product }: ProductCardProps) {
  const imageSource = resolveProductImage(
    product.imageKey,
    product.images[0]?.url,
    product.name,
    product.slug,
  );
  const isClock = product.imageKey === "clock";

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover">
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-surface to-background",
          isClock && "bg-gradient-to-br from-neutral-100 via-surface to-accent/5",
        )}
      >
        <ProductPreview imageKey={product.imageKey} imageSource={imageSource} />
        <div className="absolute inset-0 bg-foreground/0 transition-colors duration-300 group-hover:bg-foreground/[0.02]" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <h3 className="font-display text-xl font-semibold text-foreground">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
          {product.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground">
            Starting{" "}
            <span className="text-base font-semibold">
              {formatPrice(product.startingPrice, product.currency)}
            </span>
          </p>
          <div className="flex items-center gap-2">
            <AddToCartButton product={product} />
            <Button href={`/customize/${product.slug}`} variant="secondary" size="sm">
              Customize
            </Button>
          </div>
        </div>
      </div>
    </article>
  );
}
