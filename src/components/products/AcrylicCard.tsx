import type { CatalogShape } from "@/lib/catalog/mappers";
import type { AcrylicVariant } from "@/types/navigation";
import { Button } from "@/components/ui/Button";
import { AcrylicPreview } from "@/components/products/AcrylicPreview";
import { formatPrice } from "@/lib/format-price";

interface AcrylicCardProps {
  shape: CatalogShape;
  productSlug: string;
}

export function AcrylicCard({ shape, productSlug }: AcrylicCardProps) {
  const variant = (shape.previewKey ?? shape.slug) as AcrylicVariant;

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover">
      <div className="aspect-square bg-gradient-to-br from-surface to-background p-4 sm:p-5">
        <AcrylicPreview variant={variant} />
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
            href={`/products/${productSlug}?shape=${shape.slug}`}
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
