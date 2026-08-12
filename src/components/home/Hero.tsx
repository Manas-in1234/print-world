import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import type { HeroSettings } from "@/lib/site-settings";

export function Hero({ hero }: { hero?: HeroSettings }) {
  const headline = hero?.headline ?? "Turn Your Ideas Into Something Real.";
  const subheadline = hero?.subheadline ?? "Premium personalized printing, crafted your way.";

  return (
    <section className="relative overflow-hidden">
      <Container className="relative py-16 sm:py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="animate-fade-up">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.2em] text-accent">
              Premium Printing & Design
            </p>
            <h1 className="font-display text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              {headline}
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg">
              {subheadline}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:gap-4">
              <Button href="#products" size="lg">Start Designing</Button>
              <Button href="#products" variant="secondary" size="lg">Explore Products</Button>
            </div>
          </div>
          <div className="relative animate-fade-up lg:pl-8">
            <HeroVisual />
          </div>
        </div>
      </Container>
      <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
    </section>
  );
}

function HeroVisual() {
  return (
    <div className="relative mx-auto aspect-square max-w-lg">
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-surface via-card to-accent/10 shadow-soft" />
      <div className="absolute inset-6 flex flex-col gap-4">
        <div className="flex flex-1 gap-4">
          <div className="flex flex-1 flex-col gap-4">
            <div className="relative flex-1 overflow-hidden rounded-2xl bg-gradient-to-br from-neutral-100 to-neutral-200 shadow-inner">
              <div className="absolute inset-4 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] border-2 border-white/60 bg-gradient-to-br from-accent/20 to-white/30" />
              <div className="absolute bottom-3 left-3 right-3 h-6 rounded-lg bg-white/40 backdrop-blur-sm" />
            </div>
            <div className="h-24 rounded-2xl bg-card p-3 shadow-soft">
              <div className="flex h-full items-center gap-3">
                <div className="relative h-full w-16 overflow-hidden rounded-lg bg-neutral-200">
                  <div className="absolute inset-1 rounded bg-gradient-to-br from-accent/30 to-accent/10" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-2 w-3/4 rounded bg-foreground/10" />
                  <div className="h-2 w-1/2 rounded bg-muted/20" />
                </div>
              </div>
            </div>
          </div>
          <div className="w-2/5 space-y-4">
            <div className="relative h-32 overflow-hidden rounded-2xl bg-gradient-to-b from-neutral-100 to-neutral-200 shadow-inner">
              <div className="absolute bottom-2 left-1/2 h-20 w-12 -translate-x-1/2 rounded-b-xl rounded-t-lg bg-neutral-300" />
              <div className="absolute left-1/2 top-6 h-8 w-10 -translate-x-1/2 rounded bg-accent/20" />
            </div>
            <div className="relative h-32 overflow-hidden rounded-2xl border-4 border-white/60 bg-white/20 shadow-lg backdrop-blur-sm">
              <div className="absolute inset-2 rounded-lg bg-gradient-to-br from-accent/15 to-transparent" />
              <div className="absolute bottom-2 left-2 right-2 h-3 rounded bg-white/30" />
            </div>
          </div>
        </div>
        <div className="flex gap-3">
          {["T-Shirt", "Frame", "Mug"].map((label) => (
            <div key={label} className="flex-1 rounded-xl bg-card px-3 py-2 text-center text-xs font-medium text-muted shadow-sm">{label}</div>
          ))}
        </div>
      </div>
      <div className="animate-float absolute -right-4 top-8 rounded-2xl border border-card-border bg-card px-4 py-3 shadow-soft">
        <p className="text-xs font-medium text-accent">AI Design Studio</p>
        <p className="text-sm font-semibold text-foreground">Create in seconds</p>
      </div>
    </div>
  );
}
