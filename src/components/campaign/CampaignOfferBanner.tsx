"use client";

import Link from "next/link";
import { cn } from "@/lib/cn";

interface CampaignOfferBannerProps {
  headline: string;
  subheadline: string;
  discount: string;
  code: string;
  startingPrice: string;
  cta: string;
  href: string;
  theme?: "diwali" | "rakhi" | "wedding";
}

export function CampaignOfferBanner({
  headline,
  subheadline,
  discount,
  code,
  startingPrice,
  cta,
  href,
  theme = "diwali",
}: CampaignOfferBannerProps) {
  const isDiwali = theme === "diwali";
  const isRakhi = theme === "rakhi";
  const isWedding = theme === "wedding";

  return (
    <section className="py-8 sm:py-10 bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "relative overflow-hidden rounded-3xl px-6 py-8 sm:px-10 sm:py-10 shadow-lg text-white flex flex-col md:flex-row items-center justify-between gap-6",
            isDiwali && "bg-gradient-to-r from-[#240638] via-[#4B1FA8] to-[#9D174D]",
            isRakhi && "bg-gradient-to-r from-[#4C0519] via-[#831843] to-[#4B1FA8]",
            isWedding && "bg-gradient-to-r from-[#1E1B4B] via-[#4C1D95] to-[#831843]",
          )}
        >
          {/* Decorative ambient spots */}
          <div className="pointer-events-none absolute -left-10 top-0 h-40 w-40 rounded-full bg-amber-400/20 blur-2xl" />
          <div className="pointer-events-none absolute right-0 bottom-0 h-40 w-40 rounded-full bg-pink-500/20 blur-2xl" />

          {/* Left copy */}
          <div className="relative z-10 text-center md:text-left">
            <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-0.5 text-xs font-bold text-amber-300 backdrop-blur-xs mb-2">
              <span>{discount}</span>
              <span>•</span>
              <span>From {startingPrice}</span>
            </div>
            <h3 className="font-display text-2xl sm:text-3xl font-black tracking-tight text-white">
              {headline}
            </h3>
            <p className="mt-1 text-sm sm:text-base text-purple-100/90 max-w-xl">
              {subheadline}
            </p>
          </div>

          {/* Right Action + Code */}
          <div className="relative z-10 flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <div className="rounded-xl bg-black/30 border border-white/20 px-3.5 py-2 text-center">
              <div className="text-[10px] uppercase font-bold text-purple-200 tracking-wider">
                Coupon Code
              </div>
              <div className="font-mono text-sm font-black text-amber-300 tracking-wider">
                {code}
              </div>
            </div>

            <Link
              href={href}
              className="inline-flex items-center justify-center rounded-xl bg-[#FFD200] px-6 py-3 text-sm font-black text-gray-950 shadow-md hover:bg-amber-300 transition-all hover:scale-105"
            >
              <span>{cta}</span>
              <svg
                className="ml-1.5 h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2.5"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
