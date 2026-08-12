import type { CatalogProduct } from "@/lib/catalog/mappers";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";

interface ProductGridProps {
  id?: string;
  products: CatalogProduct[];
  error?: string | null;
}

export function ProductGrid({ id, products, error }: ProductGridProps) {
  return (
    <section id={id} className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Featured"
          title="Featured Products"
          description="Hand-picked favorites from our premium catalog — customize any product to make it yours."
        />

        {error ? (
          <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-center text-sm text-amber-900" role="alert">
            Could not load featured products. Please try again shortly.
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted">
            Featured products will appear here once the catalog is available.
          </p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        <div className="mt-10 text-center">
          <Button href="/products" variant="secondary" size="lg">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
}
