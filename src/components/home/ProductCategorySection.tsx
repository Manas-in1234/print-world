import Link from "next/link";
import Image from "next/image";
import { productCategories } from "@/data/product-categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export function ProductCategorySection() {
  return (
    <section id="categories" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          title="What Are You Creating?"
          description="Six premium product lines — each crafted for personalization and lasting quality."
        />

        <div className="grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
          {productCategories.map((category) => (
            <Link
              key={category.slug}
              href={category.href}
              className="group overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-soft-hover"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-surface">
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold text-foreground">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {category.description}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-accent group-hover:underline">
                  Shop now →
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Button href="/products" variant="secondary" size="lg">
            View All Products
          </Button>
        </div>
      </Container>
    </section>
  );
}
