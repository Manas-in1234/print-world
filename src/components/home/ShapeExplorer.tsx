import Link from "next/link";
import type { CatalogShape } from "@/lib/catalog/mappers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShapeProductImage } from "@/components/landing/ShapeProductImage";
import { resolveShapeImage } from "@/lib/images/product-shape-images";

interface ShapeExplorerProps {
  shapes: CatalogShape[];
  productStorageUrl?: string | null;
}

export function ShapeExplorer({ shapes, productStorageUrl }: ShapeExplorerProps) {
  const productSlug = "acrylic-photo-frame";

  return (
    <section id="shapes" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Shapes"
          title="Explore by Shape"
          description="Choose from a wide range of shapes to match your creative vision."
        />
        {shapes.length === 0 ? (
          <p className="text-center text-muted">Shapes loading from catalog...</p>
        ) : (
          <div className="flex gap-3 overflow-x-auto pb-2 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible md:grid-cols-5 lg:grid-cols-9 lg:gap-4">
            {shapes.map((shape) => {
              const resolved = resolveShapeImage({
                productSlug,
                imageKey: "frame",
                shapeSlug: shape.slug,
                previewKey: shape.previewKey,
                shapeStorageUrl:
                  shape.previewKey?.startsWith("http") ? shape.previewKey : null,
                productStorageUrl,
                alt: `${shape.name} shape`,
              });

              return (
                <Link
                  key={shape.id}
                  href={`/products/${productSlug}?shape=${encodeURIComponent(shape.slug)}`}
                  className="group flex w-[5.5rem] shrink-0 flex-col items-center gap-2 rounded-2xl border border-transparent p-3 transition-all duration-300 hover:-translate-y-1 hover:border-card-border hover:bg-card hover:shadow-soft sm:w-auto"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl border border-card-border bg-surface sm:h-20 sm:w-20">
                    <ShapeProductImage resolved={resolved} sizes="80px" />
                  </div>
                  <span className="max-w-[5.5rem] truncate text-center text-xs font-medium text-muted transition-colors group-hover:text-foreground sm:max-w-none sm:text-sm">
                    {shape.name}
                  </span>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
