import type { Metadata } from "next";
import Image from "next/image";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/data/services";
import { designSteps } from "@/data/design-steps";

export const metadata: Metadata = {
  title: "Printing Services — Print World",
  description:
    "Custom printing, photo printing, business materials, bulk orders, and corporate gifts — all designed around you.",
};

export default function ServicesPage() {
  return (
    <MarketingLayout>
      <section className="border-b border-card-border bg-surface/40 py-16 sm:py-20">
        <Container>
          <SectionHeading
            eyebrow="Services"
            title="Printing Services Designed Around You"
            description="From one-of-a-kind gifts to full-scale business printing — we bring your ideas to life with premium quality and personal care."
            align="left"
          />
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.id}
                id={service.id}
                className="scroll-mt-24 overflow-hidden rounded-2xl border border-card-border bg-card shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-hover"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-surface">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h2 className="font-display text-xl font-semibold text-foreground">{service.title}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{service.description}</p>
                  <Button href={service.href} variant="secondary" size="sm" className="mt-4">
                    Get started
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-surface/50 py-16 sm:py-20">
        <Container>
          <SectionHeading title="How It Works" description="From concept to delivery in five simple steps." />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {designSteps.map((step) => (
              <li key={step.id} className="rounded-2xl border border-card-border bg-card p-5 text-center shadow-soft">
                <span className="font-display text-3xl font-light text-accent/40">{String(step.step).padStart(2, "0")}</span>
                <h3 className="mt-2 font-display text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-card-border bg-gradient-to-br from-surface to-card px-6 py-12 text-center shadow-soft sm:px-12">
            <h2 className="font-display text-3xl font-semibold text-foreground">Ready to start?</h2>
            <p className="mx-auto mt-3 max-w-lg text-muted">Choose a product, customize your design, and order with confidence.</p>
            <Button href="/products" size="lg" className="mt-8">
              Start Creating
            </Button>
          </div>
        </Container>
      </section>
    </MarketingLayout>
  );
}
