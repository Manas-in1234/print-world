import Link from "next/link";
import type { CatalogShape } from "@/lib/catalog/mappers";
import { getClockDisplayShapes, getClockShapeAlt } from "@/data/clock-shapes";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ShapeProductImage } from "@/components/landing/ShapeProductImage";
import { resolveShapeImage } from "@/lib/images/product-shape-images";
import { formatPrice } from "@/lib/format-price";
import type { ProductPlaceholder } from "@/types/product";

interface ShapeGallerySectionProps {
  title: string;
  description: string;
  productSlug: string;
  imageKey: ProductPlaceholder;
  productStorageUrl?: string | null;
  shapes: CatalogShape[];
  eyebrow?: string;
  className?: string;
}

export function ShapeGallerySection({
  title,
  description,
  productSlug,
  imageKey,
  productStorageUrl,
  shapes,
  eyebrow = "Shapes",
  className,
}: ShapeGallerySectionProps) {
  if (shapes.length === 0) return null;

  const isClock = productSlug === "custom-clock";

  return (
    <section className={className ?? "py-12 sm:py-16"}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} align="left" />
        <div className={`mt-8 ${isClock ? "flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-7" : "grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5"}`}>
          {shapes.map((shape) => {
            const alt = isClock
              ? getClockShapeAlt(shape.name)
              : `${shape.name} — ${title}`;
            const resolved = resolveShapeImage({
              productSlug,
              imageKey,
              shapeSlug: shape.slug,
              previewKey: shape.previewKey,
              shapeStorageUrl:
                shape.previewKey?.startsWith("http") ? shape.previewKey : null,
              productStorageUrl,
              alt,
            });

            return (
              <article
                key={shape.id}
                className={`group flex shrink-0 flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover ${isClock ? "w-[9rem] sm:w-auto" : ""}`}
              >
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 via-surface to-accent/5">
                  <ShapeProductImage resolved={resolved} sizes="(max-width: 640px) 50vw, 20vw" />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {shape.name}
                  </h3>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Starting {formatPrice(shape.startingPrice)}
                  </p>
                  <div className="mt-3">
                    <Button
                      href={`/customize/${productSlug}?shape=${encodeURIComponent(shape.slug)}`}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        <div className="mt-8">
          <Link
            href={`/products/${productSlug}`}
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View all options →
          </Link>
        </div>
      </Container>
    </section>
  );
}

/** Filter catalog shapes for a product landing page. */
export function getLandingPageShapes(
  productSlug: string,
  shapes: CatalogShape[],
  productId = "",
  basePrice = 799,
): CatalogShape[] {
  if (productSlug === "custom-clock") {
    return getClockDisplayShapes(shapes, productId, basePrice);
  }
  if (productSlug === "acrylic-photo-frame") {
    return shapes.filter((s) => s.shapeType === "acrylic");
  }
  return [];
}

/** Title for the clock landing shape section. */
export function getClockShapeGalleryTitle(): string {
  return "Choose Your Shape";
}
