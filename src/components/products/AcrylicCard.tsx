import type { CatalogShape } from "@/lib/catalog/mappers";
import { Button } from "@/components/ui/Button";
import { ShapeProductImage } from "@/components/landing/ShapeProductImage";
import { resolveShapeImage } from "@/lib/images/product-shape-images";
import { formatPrice } from "@/lib/format-price";

interface AcrylicCardProps {
  shape: CatalogShape;
  productSlug: string;
  productStorageUrl?: string | null;
}

export function AcrylicCard({ shape, productSlug, productStorageUrl }: AcrylicCardProps) {
  const resolved = resolveShapeImage({
    productSlug,
    imageKey: "frame",
    shapeSlug: shape.slug,
    previewKey: shape.previewKey,
    shapeStorageUrl:
      shape.previewKey?.startsWith("http") ? shape.previewKey : null,
    productStorageUrl,
    alt: shape.name,
  });

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover">
      <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-surface to-background p-2 sm:p-3">
        <ShapeProductImage resolved={resolved} sizes="(max-width: 640px) 50vw, 25vw" />
      </div>
      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <h3 className="font-display text-base font-semibold text-foreground sm:text-lg">
          {shape.name}
        </h3>
        <div className="mt-4 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-foreground">
            Starting{" "}
            <span className="font-semibold">
              {formatPrice(shape.startingPrice)}
            </span>
          </p>
          <Button
            href={`/products/${productSlug}?shape=${encodeURIComponent(shape.slug)}`}
            variant="secondary"
            size="sm"
          >
            Customize
          </Button>
        </div>
      </div>
    </article>
  );
}
