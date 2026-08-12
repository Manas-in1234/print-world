import Image from "next/image";
import Link from "next/link";
import { productCategories } from "@/data/product-categories";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function ProductCollections() {
  return (
    <section className="bg-surface/50 py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="Collections"
          title="Shop by Product"
          description="Explore our most popular personalized product lines."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {productCategories.map((cat) => (
            <Link
              key={cat.slug}
              href={cat.href}
              className="group relative aspect-[16/10] overflow-hidden rounded-2xl border border-card-border shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-hover"
            >
              <Image
                src={cat.image}
                alt={cat.name}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-foreground/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-6">
                <h3 className="font-display text-xl font-semibold text-background sm:text-2xl">
                  {cat.name}
                </h3>
                <p className="mt-1 text-sm text-background/80">{cat.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
