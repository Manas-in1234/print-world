import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function FinalCTA() {
  return (
    <section className="bg-[#F8F8FA] py-14 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#4B1FA8] via-[#6C2BD9] to-[#3B158A] px-6 py-12 text-center text-white shadow-xl sm:px-12 sm:py-16">
          {/* Subtle decorative circles */}
          <div className="pointer-events-none absolute -left-12 -top-12 h-64 w-64 rounded-full bg-[#E5007D]/20 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-[#FFD200]/20 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1 text-xs font-bold text-white backdrop-blur-xs border border-white/20">
              <span>✨</span>
              <span>Made in India • Built for Creators</span>
            </span>

            <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Your Idea Deserves to Be Printed.
            </h2>

            <p className="mt-4 text-base sm:text-lg leading-relaxed text-purple-100">
              Start with a photo, a name, or a blank canvas. We&apos;ll turn it into something unforgettable.
            </p>

            {/* CTA Buttons with 100% visible high contrast */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              {/* Primary: Magenta/Pink Background with White Text */}
              <Link
                href="/customize/custom-t-shirt"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full bg-[#E5007D] px-8 py-3.5 text-base font-bold text-white shadow-lg transition-all duration-200 hover:bg-[#C70068] active:scale-95 border border-pink-400/30"
              >
                Start Creating
              </Link>

              {/* Secondary: White Border with White/Light Text & Translucent Background */}
              <Link
                href="/products"
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-full border-2 border-white/80 bg-white/10 px-8 py-3.5 text-base font-bold text-white shadow-sm backdrop-blur-xs transition-all duration-200 hover:bg-white hover:text-[#4B1FA8] active:scale-95"
              >
                Explore Products →
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
