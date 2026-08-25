import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function CorporateBulkOrders() {
  return (
    <section className="bg-[#F8F8FA] py-12 sm:py-16">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#171717] via-[#2A1744] to-[#4B1FA8] p-8 sm:p-12 text-white shadow-lg">
          {/* Subtle background glow */}
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-[#E5007D]/20 blur-3xl" />

          <div className="relative grid gap-8 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-8">
              <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-[#FFD200] backdrop-blur-xs border border-white/10">
                <span>🏢</span>
                <span>B2B & Bulk Solutions</span>
              </div>

              <h2 className="mt-4 font-display text-2xl font-bold sm:text-3xl lg:text-4xl text-white">
                Corporate & Bulk Orders
              </h2>

              <p className="mt-3 text-sm sm:text-base leading-relaxed text-gray-200 max-w-2xl">
                Custom employee welcome kits, company branded T-shirts, uniform mugs, business cards & promotional giveaways.
              </p>

              {/* Badges */}
              <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold">
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10 text-white">
                  <span>📄</span>
                  <span>GST Invoice Available</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10 text-white">
                  <span>💰</span>
                  <span>Volume Discounts</span>
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 border border-white/10 text-white">
                  <span>⚡</span>
                  <span>Fast Turnaround Across India</span>
                </span>
              </div>
            </div>

            <div className="flex flex-col items-start lg:items-end lg:col-span-4">
              <Link
                href="/business"
                className="inline-flex items-center justify-center rounded-xl bg-[#E5007D] px-7 py-3.5 text-sm font-bold text-white shadow-md transition-all hover:bg-[#C70068] active:scale-95"
              >
                <span>Get a Custom Quote</span>
                <span className="ml-2">→</span>
              </Link>
              <span className="mt-2 text-[11px] text-gray-300">
                Direct WhatsApp & email quotes within 2 hours
              </span>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
