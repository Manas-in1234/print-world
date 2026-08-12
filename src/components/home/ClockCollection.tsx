import Link from "next/link";
import type { CatalogShape } from "@/lib/catalog/mappers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ClockShapePreview } from "@/components/products/ClockShapePreview";
import { toPreviewShapeId } from "@/lib/catalog/shape-utils";
import { formatPrice } from "@/lib/format-price";

interface ClockCollectionProps {
  shapes: CatalogShape[];
}

export function ClockCollection({ shapes }: ClockCollectionProps) {
  const productSlug = "custom-clock";

  return (
    <section id="clocks" className="bg-surface/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Clocks"
          title="Clock Collection"
          description="Personalized wall clocks in premium shapes — each one a statement piece for your space."
        />
        {shapes.length === 0 ? (
          <p className="text-center text-muted">Clock shapes loading from catalog...</p>
        ) : (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6 lg:grid-cols-5">
            {shapes.map((clock) => (
              <article
                key={clock.id}
                className="group flex flex-col overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-soft-hover"
              >
                <div className="aspect-square bg-gradient-to-br from-neutral-50 via-surface to-accent/5 p-5 sm:p-6">
                  <ClockShapePreview shape={toPreviewShapeId(clock.slug, clock.previewKey)} />
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="font-display text-sm font-semibold text-foreground sm:text-base">
                    {clock.name} Clock
                  </h3>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Starting {formatPrice(clock.startingPrice)}
                  </p>
                  <div className="mt-3">
                    <Button
                      href={`/products/${productSlug}?shape=${clock.slug}`}
                      variant="secondary"
                      size="sm"
                      className="w-full"
                    >
                      Customize
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
        <div className="mt-8 text-center">
          <Link
            href={`/products/${productSlug}`}
            className="text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            View all clock options →
          </Link>
        </div>
      </Container>
    </section>
  );
}
