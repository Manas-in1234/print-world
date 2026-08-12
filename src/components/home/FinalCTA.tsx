import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

export function FinalCTA() {
  return (
    <section className="py-16 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-3xl border border-card-border bg-gradient-to-br from-foreground via-foreground to-foreground/90 px-6 py-14 text-center shadow-soft sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="font-display text-3xl font-semibold text-background sm:text-4xl lg:text-5xl">
              Ready to Create Something You Love?
            </h2>
            <p className="mt-4 text-base text-background/75 sm:text-lg">
              Upload your design, customize with ease, and order premium printed products today.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button href="/customize/custom-t-shirt" size="lg" className="min-w-[180px] bg-background text-foreground hover:bg-background/90">
                Start Designing
              </Button>
              <Button href="/products" variant="secondary" size="lg" className="min-w-[180px] border-background/30 bg-transparent text-background hover:bg-background/10">
                Explore Products
              </Button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
