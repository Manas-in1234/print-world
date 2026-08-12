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
          eyebrow="Our Collection"
          title="Our Products"
          description="Premium product lines, each crafted for personalization and lasting quality."
        />

        {error ? (
          <p className="text-center text-red-600 text-sm" role="alert">
            Could not load products: {error}
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted">
            Products will appear here once Supabase is connected and seeded.
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
