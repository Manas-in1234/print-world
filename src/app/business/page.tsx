import type { Metadata } from "next";
import Image from "next/image";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Business Printing — Print World",
  description:
    "Business cards, posters, bulk printing, corporate gifts, and branding packages for companies of every size.",
};

const businessProducts = [
  { title: "Business Cards", image: "/product-assets/business-card.jpg", href: "/products/business-card", description: "Premium cardstock with sharp detail and professional finishes." },
  { title: "Posters", image: "/product-assets/custom-poster.jpg", href: "/products/custom-poster", description: "Bold posters for offices, retail, and events." },
  { title: "Flyers", image: "/product-assets/custom-poster.jpg", href: "/products/custom-poster", description: "High-impact promotional prints for campaigns and launches." },
  { title: "Corporate Gifts", image: "/product-assets/custom-mug.jpg", href: "/products/custom-mug", id: "corporate-gifts", description: "Branded mugs, apparel, and gift sets for clients and teams." },
  { title: "Bulk Orders", image: "/product-assets/custom-t-shirt.jpg", href: "/products/custom-t-shirt", id: "bulk-orders", description: "Volume pricing for teams, events, and corporate needs." },
  { title: "Branding", image: "/product-assets/hero-products.jpg", href: "/products", id: "branding", description: "Consistent brand materials across every customer touchpoint." },
];

const whyBusiness = [
  { title: "Volume Pricing", description: "Competitive rates for bulk and repeat orders." },
  { title: "Premium Quality", description: "Professional-grade materials and printing standards." },
  { title: "Fast Turnaround", description: "Reliable production timelines for business deadlines." },
  { title: "Easy Reordering", description: "Save designs and reorder with a few clicks." },
];

export default function BusinessPage() {
  return (
    <MarketingLayout>
      <section className="border-b border-card-border bg-surface/40 py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <SectionHeading
              eyebrow="Business"
              title="Printing That Builds Your Brand"
              description="From startup stationery to enterprise bulk orders — Print World delivers professional results that represent your business with pride."
              align="left"
              className="mb-0"
            />
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border shadow-soft">
              <Image src="/product-assets/business-card.jpg" alt="Premium business printing" fill className="object-cover" sizes="50vw" priority />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <SectionHeading title="Business Products" description="Everything your company needs to look polished and professional." />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessProducts.map((item) => (
              <article key={item.title} id={item.id} className="scroll-mt-24 overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft">
                <div className="relative aspect-[16/10] bg-surface">
                  <Image src={item.image} alt={item.title} fill className="object-cover" sizes="33vw" />
                </div>
                <div className="p-5">
                  <h2 className="font-display text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted">{item.description}</p>
                  <Button href={item.href} variant="secondary" size="sm" className="mt-4">View product</Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface/50 py-16 sm:py-20">
        <Container>
          <SectionHeading title="Why Businesses Choose Print World" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {whyBusiness.map((item) => (
              <article key={item.title} className="rounded-2xl border border-card-border bg-card p-6 shadow-soft">
                <h3 className="font-display font-semibold text-foreground">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:justify-center">
            <Button href="/products/business-card" size="lg">Get Started</Button>
            <Button href="/products" variant="secondary" size="lg">Explore Business Products</Button>
          </div>
        </Container>
      </section>
    </MarketingLayout>
  );
}
