import type { Metadata } from "next";
import { MarketingLayout } from "@/components/layout/MarketingLayout";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { MarketingImage } from "@/components/ui/MarketingImage";
import { pageHeroImages } from "@/data/page-heroes";

export const metadata: Metadata = {
  title: "About Print World | Print World",
  description:
    "Learn about Print World — our mission, quality standards, personalization philosophy, and vision for AI-powered custom printing.",
};

const storySections = [
  {
    title: "Our Story",
    body: "Print World began with a simple belief: everyone should be able to turn ideas into beautiful, tangible products without complexity or compromise.",
  },
  {
    title: "Our Mission",
    body: "We make premium personalized printing accessible to everyone — from first-time creators to established brands. Every idea deserves to become something real.",
  },
  {
    title: "Personalization",
    body: "True personalization goes beyond adding a name. Our tools let you upload, edit, preview, and refine until every product reflects your exact vision.",
  },
  {
    title: "Quality",
    body: "We use professional-grade materials and printing processes so your products look exceptional and last. Every order is produced with care.",
  },
  {
    title: "Technology & AI Vision",
    body: "Our AI Studio accelerates creativity with logo design, artwork generation, and intelligent design guidance — always under your control.",
  },
  {
    title: "Why Print World",
    body: "Premium products, intuitive tools, secure checkout, and real support — all in one platform built for creators and businesses alike.",
  },
];

export default function AboutPage() {
  const hero = pageHeroImages.about;

  return (
    <MarketingLayout>
      <section className="border-b border-card-border bg-surface/40 py-16 sm:py-20">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <SectionHeading
                eyebrow="About"
                title="About Print World"
                description="A premium personalized printing platform built for creators, businesses, and anyone who wants to turn ideas into beautiful, tangible products."
                align="left"
                className="mb-0"
              />
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href="/products" size="lg">Explore Products</Button>
                <Button href="/customize/custom-t-shirt" variant="secondary" size="lg">Start Designing</Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border shadow-soft">
              <MarketingImage
                src={hero.primaryImage}
                fallbackSrc={hero.fallbackImages[0]}
                alt={hero.alt}
                priority
                sizes="50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-3xl space-y-12">
            {storySections.map((section) => (
              <article key={section.title}>
                <h2 className="font-display text-2xl font-semibold text-foreground">{section.title}</h2>
                <p className="mt-3 text-base leading-relaxed text-muted">{section.body}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section id="support" className="scroll-mt-24 bg-surface/50 py-16 sm:py-20">
        <Container>
          <SectionHeading title="Support" description="We're here to help with orders, shipping, and returns." />
          <div className="mx-auto mt-8 grid max-w-3xl gap-6 sm:grid-cols-3">
            <article className="rounded-2xl border border-card-border bg-card p-5 text-center shadow-soft">
              <h3 className="font-semibold text-foreground">Shipping</h3>
              <p className="mt-2 text-sm text-muted">Standard delivery across India with careful packaging on every order.</p>
            </article>
            <article className="rounded-2xl border border-card-border bg-card p-5 text-center shadow-soft">
              <h3 className="font-semibold text-foreground">Returns</h3>
              <p className="mt-2 text-sm text-muted">Contact us within 7 days if your order arrives damaged or incorrect.</p>
            </article>
            <article className="rounded-2xl border border-card-border bg-card p-5 text-center shadow-soft">
              <h3 className="font-semibold text-foreground">Help Center</h3>
              <p className="mt-2 text-sm text-muted">Browse products, customize designs, and track orders from your account.</p>
            </article>
          </div>
        </Container>
      </section>

      <section id="contact" className="scroll-mt-24 py-16 sm:py-20">
        <Container>
          <div className="mx-auto max-w-xl rounded-2xl border border-card-border bg-card p-8 text-center shadow-soft">
            <h2 className="font-display text-2xl font-semibold text-foreground">Contact Us</h2>
            <p className="mt-3 text-muted">
              Questions about an order or custom project? Reach us at{" "}
              <a href="mailto:hello@printworld.in" className="font-medium text-foreground underline hover:text-accent">
                hello@printworld.in
              </a>
            </p>
          </div>
        </Container>
      </section>
    </MarketingLayout>
  );
}
