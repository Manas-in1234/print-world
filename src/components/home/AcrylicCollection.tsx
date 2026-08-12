import type { CatalogShape } from "@/lib/catalog/mappers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AcrylicCard } from "@/components/products/AcrylicCard";

interface AcrylicCollectionProps {
  shapes: CatalogShape[];
  productStorageUrl?: string | null;
}

export function AcrylicCollection({ shapes }: AcrylicCollectionProps) {
  const productSlug = "acrylic-photo-frame";

  return (
    <section id="acrylic" className="bg-surface/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Acrylic"
          title="Acrylic Collection"
          description="Crystal-clear acrylic products in distinctive shapes — portraits, landscapes, collages, and custom art pieces."
        />
        {shapes.length === 0 ? (
          <p className="text-center text-muted">Acrylic shapes loading from catalog...</p>
        ) : (
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {shapes.map((shape) => (
              <AcrylicCard key={shape.id} shape={shape} productSlug={productSlug} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
