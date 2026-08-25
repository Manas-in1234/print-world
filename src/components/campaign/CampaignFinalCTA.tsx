"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface CampaignFinalCTAProps {
  headline: string;
  subheadline: string;
  primaryCta: string;
  primaryHref: string;
  secondaryCta: string;
  secondaryHref: string;
  theme?: "diwali" | "rakhi" | "wedding";
}

export function CampaignFinalCTA({
  headline,
  subheadline,
  primaryCta,
  primaryHref,
  secondaryCta,
  secondaryHref,
  theme = "diwali",
}: CampaignFinalCTAProps) {
  const isDiwali = theme === "diwali";
  const isRakhi = theme === "rakhi";
  const isWedding = theme === "wedding";

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl px-6 py-12 sm:px-12 sm:py-16 text-center text-white shadow-2xl",
            isDiwali && "bg-gradient-to-br from-[#240638] via-[#4B1FA8] to-[#1A0329]",
            isRakhi && "bg-gradient-to-br from-[#4C0519] via-[#831843] to-[#3B0764]",
            isWedding && "bg-gradient-to-br from-[#1E1B4B] via-[#4C1D95] to-[#2D0D4E]",
          )}
        >
          {/* Subtle Ambient glows */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 rounded-full bg-[#E5007D]/30 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-amber-400/20 blur-3xl" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3.5 py-1 text-xs font-bold text-amber-300 backdrop-blur-xs mb-4">
              <span>🎁 Handcrafted with Love in India</span>
            </span>

            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-white leading-tight">
              {headline}
            </h2>

            <p className="mt-4 text-base sm:text-lg text-purple-100/90 max-w-2xl leading-relaxed">
              {subheadline}
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4 w-full sm:w-auto">
              <Link
                href={primaryHref}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl bg-[#E5007D] px-8 py-4 text-base font-bold text-white shadow-lg shadow-pink-900/30 hover:bg-[#c9006e] transition-all hover:-translate-y-0.5"
              >
                <span>{primaryCta}</span>
                <svg
                  className="ml-2 h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2.5"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
              </Link>

              <Link
                href={secondaryHref}
                className="w-full sm:w-auto inline-flex items-center justify-center rounded-xl border border-white/40 bg-white/10 px-8 py-4 text-base font-semibold text-white backdrop-blur-xs hover:bg-white hover:text-purple-950 transition-all"
              >
                <span>{secondaryCta}</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
