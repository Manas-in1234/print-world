import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

const ctaButtonBase =
  "inline-flex min-w-[180px] items-center justify-center rounded-full px-8 py-3.5 text-base font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-foreground";

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
              <Link
                href="/customize/custom-t-shirt"
                className={cn(
                  ctaButtonBase,
                  "bg-background text-foreground shadow-soft hover:bg-background/90 hover:shadow-soft-hover",
                )}
              >
                Start Creating
              </Link>
              <Link
                href="/products"
                className={cn(
                  ctaButtonBase,
                  "border border-background/40 bg-transparent text-background hover:border-background/60 hover:bg-background/10",
                )}
              >
                Explore Products
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
