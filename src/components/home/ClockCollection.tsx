import Link from "next/link";
import type { CatalogShape } from "@/lib/catalog/mappers";
import { getClockDisplayShapes, getClockShapeAlt } from "@/data/clock-shapes";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ShapeProductImage } from "@/components/landing/ShapeProductImage";
import { resolveShapeImage } from "@/lib/images/product-shape-images";
import { formatPrice } from "@/lib/format-price";

interface ClockCollectionProps {
  shapes: CatalogShape[];
  productStorageUrl?: string | null;
  productId?: string;
  basePrice?: number;
}

export function ClockCollection({
  shapes,
  productStorageUrl,
  productId = "",
  basePrice = 799,
}: ClockCollectionProps) {
  const productSlug = "custom-clock";
  const displayShapes = getClockDisplayShapes(shapes, productId, basePrice);

  return (
    <section id="clocks" className="bg-surface/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Clocks"
          title="Clock Collection"
          description="Personalized wall clocks in premium shapes — each one a statement piece for your space."
        />
        {displayShapes.length === 0 ? (
          <p className="text-center text-muted">Clock shapes loading from catalog...</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-3 sm:gap-6 sm:overflow-visible lg:grid-cols-4 xl:grid-cols-7">
            {displayShapes.map((clock) => {
              const resolved = resolveShapeImage({
                productSlug,
                imageKey: "clock",
                shapeSlug: clock.slug,
                previewKey: clock.previewKey,
                shapeStorageUrl:
                  clock.previewKey?.startsWith("http") ? clock.previewKey : null,
                productStorageUrl,
                alt: getClockShapeAlt(clock.name),
              });

              return (
                <article
                  key={clock.id}
                  className="group flex w-[9rem] shrink-0 flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover sm:w-auto"
                >
                  <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-neutral-50 via-surface to-accent/5 p-2 sm:p-3">
                    <ShapeProductImage resolved={resolved} sizes="(max-width: 640px) 50vw, 20vw" />
                  </div>
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                      {clock.name}
                    </h3>
                    <p className="mt-1 text-xs text-muted sm:text-sm">
                      Starting {formatPrice(clock.startingPrice)}
                    </p>
                    <div className="mt-3">
                      <Button
                        href={`/customize/${productSlug}?shape=${encodeURIComponent(clock.slug)}`}
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
        )}
        <div className="mt-8 text-center">
          <Link
            href="/clocks"
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View all clock options →
          </Link>
        </div>
      </Container>
    </section>
  );
}
