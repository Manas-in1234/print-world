import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MarketingImage } from "@/components/ui/MarketingImage";
import { pageHeroImages } from "@/data/page-heroes";
import type { HeroSettings } from "@/lib/site-settings";

export function Hero({ hero }: { hero?: HeroSettings }) {
  const headline = hero?.headline ?? "Turn Your Ideas Into Something Real.";
  const subheadline =
    hero?.subheadline ??
    "Create personalized products, upload your designs, preview them instantly, and order with confidence.";

  const heroConfig = pageHeroImages.home;

  return (
    <section className="relative overflow-hidden">
      <Container className="relative py-12 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up max-w-xl">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Premium Printing & Design
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]">
              {headline}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="/customize/custom-t-shirt" size="lg">
                Start Creating
              </Button>
              <Button href="/products" variant="secondary" size="lg">
                Explore Products
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-up">
            <div className="relative mx-auto aspect-[4/3] max-w-xl overflow-hidden rounded-3xl border border-card-border shadow-soft-hover lg:max-w-none">
              <MarketingImage
                src={heroConfig.primaryImage}
                fallbackSrc={heroConfig.fallbackImages[0]}
                alt={heroConfig.alt}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="animate-float absolute -bottom-4 -left-2 rounded-2xl border border-card-border bg-card px-4 py-3 shadow-soft sm:-left-6">
              <p className="text-xs font-medium text-accent">AI Design Studio</p>
              <p className="text-sm font-semibold text-foreground">Create in seconds</p>
            </div>
          </div>
        </div>
      </Container>
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}
