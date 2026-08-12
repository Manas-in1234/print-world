import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const businessItems = [
  {
    title: "Business Cards",
    description: "Professional cards that make a lasting first impression.",
    image: "/product-assets/business-card.jpg",
    href: "/products/business-card",
  },
  {
    title: "Posters",
    description: "Bold posters for offices, events, and retail spaces.",
    image: "/product-assets/custom-poster.jpg",
    href: "/products/custom-poster",
  },
  {
    title: "Bulk Printing",
    description: "Volume orders with competitive pricing for teams.",
    image: "/product-assets/custom-t-shirt.jpg",
    href: "/business#bulk-orders",
  },
  {
    title: "Corporate Gifts",
    description: "Branded mugs, apparel, and gift sets for clients.",
    image: "/product-assets/custom-mug.jpg",
    href: "/business#corporate-gifts",
  },
  {
    title: "Branding",
    description: "Consistent brand materials across every touchpoint.",
    image: "/product-assets/hero-products.jpg",
    href: "/business#branding",
  },
];

export function BusinessSection() {
  return (
    <section id="business" className="py-16 sm:py-20">
      <Container>
        <SectionHeading
          eyebrow="For Business"
          title="Business Printing That Builds Your Brand"
          description="From business cards to bulk orders — professional printing designed for companies of every size."
        />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {businessItems.map((item) => (
            <article
              key={item.title}
              className="overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-hover"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 33vw"
                />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
                <Button href={item.href} variant="secondary" size="sm" className="mt-4">
                  Learn more
                </Button>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button href="/business" size="lg">
            Explore Business Printing
          </Button>
        </div>
      </Container>
    </section>
  );
}
