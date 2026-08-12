import Link from "next/link";
import type { CatalogShape } from "@/lib/catalog/mappers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ShapeTile } from "@/components/products/ShapeTile";
import { toPreviewShapeId } from "@/lib/catalog/shape-utils";

interface ShapeExplorerProps {
  shapes: CatalogShape[];
}

export function ShapeExplorer({ shapes }: ShapeExplorerProps) {
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
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-9 lg:gap-4">
            {shapes.map((shape) => (
              <Link
                key={shape.id}
                href={`/products/acrylic-photo-frame?shape=${shape.slug}`}
                className="group flex flex-col items-center gap-3 rounded-2xl border border-transparent p-4 transition-all duration-300 hover:-translate-y-1 hover:border-card-border hover:bg-card hover:shadow-soft"
              >
                <ShapeTile shape={toPreviewShapeId(shape.slug, shape.previewKey)} />
                <span className="text-xs font-medium text-muted transition-colors group-hover:text-foreground sm:text-sm">
                  {shape.name}
                </span>
              </Link>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
