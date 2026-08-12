import type { CatalogProduct } from "@/lib/catalog/mappers";
import type { ProductLandingConfig } from "@/data/landing-pages";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ProductCard } from "@/components/products/ProductCard";
import { LandingProductImage } from "@/components/landing/LandingProductImage";
import {
  getLandingPageShapes,
  getClockShapeGalleryTitle,
  ShapeGallerySection,
} from "@/components/landing/ShapeGallerySection";
import { resolveLandingProductDisplay } from "@/lib/landing/render-product-landing";
import { formatPrice } from "@/lib/format-price";
import { productSupportsShapeImages } from "@/lib/images/product-shape-images";

interface ProductLandingPageProps {
  config: ProductLandingConfig;
  product: CatalogProduct | null;
  catalogError?: string | null;
  relatedProducts?: CatalogProduct[];
}

export function ProductLandingPage({
  config,
  product,
  catalogError,
  relatedProducts = [],
}: ProductLandingPageProps) {
  const display = resolveLandingProductDisplay(config, product);
  const landingShapes = product
    ? getLandingPageShapes(
        config.productSlug,
        product.shapes,
        product.id,
        product.startingPrice,
      )
    : [];
  const showShapeGallery =
    productSupportsShapeImages(config.productSlug) && landingShapes.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="border-b border-card-border bg-surface/40 py-12 sm:py-16 lg:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <div className="order-2 lg:order-1">
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-accent">
                {config.heroEyebrow}
              </p>
              <h1 className="font-display text-3xl font-semibold leading-tight text-foreground sm:text-4xl lg:text-5xl">
                {config.headline}
              </h1>
              <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">
                {display.shortDescription}
              </p>
              <p className="mt-4 text-xl font-semibold text-foreground">
                Starting {formatPrice(display.startingPrice, display.currency)}
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Button href={`/customize/${display.slug}`} size="lg">
                  Customize Now
                </Button>
                <Button href={`/products/${display.slug}`} variant="secondary" size="lg">
                  View Product
                </Button>
              </div>
            </div>
            <div className="relative order-1 aspect-square max-h-[480px] w-full overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-surface to-background shadow-soft lg:order-2 lg:max-h-none">
              <LandingProductImage
                resolved={display.resolvedImage}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </Container>
      </section>

      {showShapeGallery && (
        <ShapeGallerySection
          title={
            config.productSlug === "custom-clock"
              ? getClockShapeGalleryTitle()
              : `Available ${config.navLabel} Shapes`
          }
          description={
            config.productSlug === "custom-clock"
              ? "Seven premium clock silhouettes — each with a real product preview. Pick your shape and customize the face."
              : "Each shape uses a real product preview — pick the one that fits your space."
          }
          productSlug={config.productSlug}
          imageKey={display.imageKey}
          productStorageUrl={display.storageUrl}
          shapes={landingShapes}
          className="border-b border-card-border bg-surface/30 py-12 sm:py-16"
        />
      )}

      {/* Benefits */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading
            title={`Why Choose Our ${config.navLabel}`}
            description={display.description}
            align="left"
          />
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {config.benefits.map((benefit) => (
              <li
                key={benefit}
                className="flex items-start gap-3 rounded-xl border border-card-border bg-card px-5 py-4 shadow-soft"
              >
                <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                <span className="text-sm leading-relaxed text-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
          {catalogError && !product && (
            <p className="mt-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
              Live catalog pricing is temporarily unavailable. Displayed information uses our catalog configuration.
            </p>
          )}
        </Container>
      </section>

      {/* Features */}
      <section className="bg-surface/50 py-12 sm:py-16">
        <Container>
          <SectionHeading title="Product Features" align="left" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {config.features.map((feature) => (
              <article
                key={feature}
                className="rounded-2xl border border-card-border bg-card p-5 text-center shadow-soft"
              >
                <p className="text-sm font-medium text-foreground">{feature}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Customization */}
      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <SectionHeading
              title="Customization Options"
              description="Everything you need to make it yours — in our easy-to-use design editor."
              align="left"
              className="mb-0"
            />
            <ul className="space-y-3">
              {config.customizationOptions.map((option) => (
                <li
                  key={option}
                  className="flex items-center gap-3 rounded-xl border border-card-border bg-card px-4 py-3 text-sm text-foreground"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5 shrink-0 text-accent" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clipRule="evenodd" />
                  </svg>
                  {option}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-8 text-center lg:text-left">
            <Button href={`/customize/${display.slug}`} size="lg">
              Open Design Editor
            </Button>
          </div>
        </Container>
      </section>

      {/* How It Works */}
      <section className="bg-surface/50 py-12 sm:py-16">
        <Container>
          <SectionHeading title="How It Works" description="From idea to delivered product in four simple steps." />
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {config.howItWorks.map((step) => (
              <li
                key={step.step}
                className="rounded-2xl border border-card-border bg-card p-5 shadow-soft"
              >
                <span className="font-display text-3xl font-light text-accent/40">
                  {String(step.step).padStart(2, "0")}
                </span>
                <h3 className="mt-2 font-display text-base font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.description}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Use Cases */}
      <section className="py-12 sm:py-16">
        <Container>
          <SectionHeading title="Perfect For" align="left" />
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {config.useCases.map((useCase) => (
              <article
                key={useCase.title}
                className="rounded-2xl border border-card-border bg-card p-6 shadow-soft"
              >
                <h3 className="font-display text-lg font-semibold text-foreground">{useCase.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{useCase.description}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Inspiration Gallery */}
      <section className="bg-surface/50 py-12 sm:py-16">
        <Container>
          <SectionHeading title="Inspiration" description="See what's possible with your own photos and designs." align="left" />
          <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-2">
            {config.inspirationImages.map((img) => (
              <div
                key={img.src}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-card-border bg-surface shadow-soft"
              >
                <LandingProductImage
                  resolved={{
                    mode: "local",
                    imageKey: display.imageKey,
                    storageUrl: null,
                    localImageUrl: img.src,
                    localFallbackUrl: display.resolvedImage.localFallbackUrl,
                    alt: img.alt,
                    imageSource: {
                      type: "local",
                      localUrl: img.src,
                      fallbackUrl: display.resolvedImage.localFallbackUrl ?? undefined,
                      alt: img.alt,
                    },
                  }}
                  sizes="(max-width: 640px) 50vw, 40vw"
                />
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Button href={`/customize/${display.slug}`} variant="secondary" size="lg">
              Create Something Similar
            </Button>
          </div>
        </Container>
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="py-12 sm:py-16">
          <Container>
            <SectionHeading title="Related Products" align="left" />
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}

      {/* FAQ */}
      <section className="bg-surface/50 py-12 sm:py-16">
        <Container>
          <SectionHeading title="Frequently Asked Questions" align="left" />
          <div className="mt-8 mx-auto max-w-3xl space-y-3">
            {config.faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-xl border border-card-border bg-card shadow-soft"
              >
                <summary className="cursor-pointer list-none px-5 py-4 text-sm font-medium text-foreground marker:content-none [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between gap-4">
                    {faq.question}
                    <span className="text-accent transition-transform group-open:rotate-180" aria-hidden="true">▼</span>
                  </span>
                </summary>
                <p className="border-t border-card-border px-5 py-4 text-sm leading-relaxed text-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Final CTA */}
      <section className="py-12 sm:py-20">
        <Container>
          <div className="rounded-3xl border border-card-border bg-gradient-to-br from-foreground via-foreground to-foreground/90 px-6 py-12 text-center shadow-soft sm:px-12 sm:py-16">
            <h2 className="font-display text-2xl font-semibold text-background sm:text-3xl lg:text-4xl">
              {config.ctaHeadline}
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-base text-background/75">
              {config.ctaDescription}
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                href={`/customize/${display.slug}`}
                size="lg"
                className="min-w-[180px] bg-background text-foreground hover:bg-background/90"
              >
                Customize Now
              </Button>
              <Button
                href={`/products/${display.slug}`}
                variant="secondary"
                size="lg"
                className="min-w-[180px] border-background/30 bg-transparent text-background hover:bg-background/10"
              >
                View Product
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
