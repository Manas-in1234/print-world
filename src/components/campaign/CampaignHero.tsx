"use client";

import Link from "next/link";
import Image from "next/image";
import type { CampaignData } from "@/data/campaign-pages";
import { cn } from "@/lib/cn";
import {
  Truck,
  Zap,
  CreditCard,
  ShieldCheck,
  Award,
  Scissors,
  Package,
  Clock,
  Sparkles,
} from "lucide-react";

interface CampaignHeroProps {
  campaign: CampaignData;
}

export function CampaignHero({ campaign }: CampaignHeroProps) {
  const isDiwali = campaign.theme === "diwali";
  const isRakhi = campaign.theme === "rakhi";
  const isWedding = campaign.theme === "wedding";

  return (
    <section className="relative overflow-hidden pt-4 pb-10 sm:pb-14 lg:pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Card Container with Authentic Theme Styling */}
        <div
          className={cn(
            "relative rounded-3xl overflow-hidden shadow-2xl border transition-all duration-300",
            isDiwali &&
              "bg-gradient-to-br from-[#1F0330] via-[#37075A] to-[#12021E] border-amber-500/40 text-white shadow-purple-950/40",
            isRakhi &&
              "bg-gradient-to-r from-[#FFF1F2] via-[#FFE4E6] to-[#FCE7F3] border-pink-200 text-gray-900 shadow-pink-900/10",
            isWedding &&
              "bg-gradient-to-r from-[#FBF8F3] via-[#F6EFE5] to-[#EFE7D8] border-amber-200/90 text-gray-900 shadow-amber-900/10",
          )}
        >
          {/* Decorative Festive Accents */}
          {isDiwali && (
            <>
              {/* Hanging Lanterns on top-left */}
              <div
                className="pointer-events-none absolute -top-4 left-6 sm:left-12 flex items-start gap-4 opacity-80"
                aria-hidden="true"
              >
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-12 bg-amber-400/60" />
                  <div className="w-6 h-8 rounded-b-lg bg-gradient-to-b from-amber-400 to-orange-500 shadow-lg shadow-amber-400/50 flex items-center justify-center text-[10px]">
                    🪔
                  </div>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-0.5 h-7 bg-amber-400/40" />
                  <div className="w-5 h-6 rounded-b-lg bg-gradient-to-b from-orange-400 to-pink-500 shadow-md shadow-orange-400/40 flex items-center justify-center text-[8px]">
                    ✨
                  </div>
                </div>
              </div>

              {/* Glowing Ambient Diya Light Blurs */}
              <div
                className="pointer-events-none absolute top-0 right-1/4 h-80 w-80 rounded-full bg-amber-400/20 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute bottom-0 left-1/3 h-72 w-72 rounded-full bg-[#E5007D]/25 blur-3xl"
                aria-hidden="true"
              />
            </>
          )}

          {isRakhi && (
            <>
              {/* Floating Hearts & Floral Ambient */}
              <div
                className="pointer-events-none absolute top-4 right-10 text-pink-300/40 text-4xl animate-pulse"
                aria-hidden="true"
              >
                ♥
              </div>
              <div
                className="pointer-events-none absolute bottom-6 left-8 text-pink-300/30 text-3xl"
                aria-hidden="true"
              >
                ♥
              </div>
              <div
                className="pointer-events-none absolute -top-10 -right-10 h-72 w-72 rounded-full bg-pink-200/40 blur-3xl"
                aria-hidden="true"
              />
            </>
          )}

          {isWedding && (
            <>
              {/* Delicate Gold & Ivory Ambient */}
              <div
                className="pointer-events-none absolute -top-12 -left-12 h-64 w-64 rounded-full bg-amber-200/40 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="pointer-events-none absolute -bottom-12 -right-12 h-64 w-64 rounded-full bg-amber-100/60 blur-3xl"
                aria-hidden="true"
              />
            </>
          )}

          {/* Main Layout Grid */}
          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Content Side */}
            <div className="lg:col-span-7 flex flex-col items-start text-left">
              {/* Campaign Tag / Eyebrow */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-bold tracking-wide mb-3 sm:mb-4 shadow-xs",
                  isDiwali && "bg-white/10 text-amber-300 border border-amber-400/30 backdrop-blur-md",
                  isRakhi && "bg-pink-100 text-pink-800 border border-pink-200",
                  isWedding && "bg-amber-100/90 text-amber-900 border border-amber-200/80",
                )}
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>{campaign.eyebrow}</span>
              </div>

              {/* Main Headline styled according to theme reference */}
              {isDiwali && (
                <div className="leading-[1.08]">
                  <span className="block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-white">
                    DIWALI
                  </span>
                  <span className="block font-sans text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wide text-[#FFD200] mt-1 drop-shadow-sm">
                    FESTIVE OFFERS
                  </span>
                </div>
              )}

              {isRakhi && (
                <div className="leading-[1.08]">
                  <span className="block font-sans text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#9D174D]">
                    RAKSHA BANDHAN
                  </span>
                  <span className="block font-serif italic text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-purple-900 mt-0.5">
                    Special Gifts
                  </span>
                </div>
              )}

              {isWedding && (
                <div className="leading-[1.08]">
                  <span className="block font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black tracking-tight text-[#4A1525]">
                    WEDDING GIFTS
                  </span>
                  <span className="block font-sans text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-[0.2em] text-[#9A7432] mt-1.5 uppercase">
                    Made Memorable
                  </span>
                </div>
              )}

              {/* Subheadline */}
              <p
                className={cn(
                  "mt-3.5 sm:mt-4 text-sm sm:text-base md:text-lg max-w-lg font-medium leading-relaxed",
                  isDiwali && "text-purple-100/90",
                  isRakhi && "text-gray-700",
                  isWedding && "text-stone-700",
                )}
              >
                {campaign.subtitle}
              </p>

              {/* Coupon / Promo Callout Bar */}
              <div
                className={cn(
                  "mt-5 inline-flex flex-wrap items-center gap-2.5 rounded-2xl p-2.5 sm:p-3 text-xs sm:text-sm font-semibold border backdrop-blur-xs",
                  isDiwali && "bg-black/30 border-white/20 text-purple-100",
                  isRakhi && "bg-white/80 border-pink-200 text-pink-950 shadow-xs",
                  isWedding && "bg-white/80 border-amber-200 text-amber-950 shadow-xs",
                )}
              >
                <span className="rounded-lg bg-[#FFD200] px-2.5 py-1 text-xs font-black text-gray-950">
                  {campaign.offer}
                </span>
                <span>
                  Use code <strong className="font-mono font-bold">{campaign.offerCode}</strong> at checkout
                </span>
              </div>

              {/* Action Buttons & Discount Seal */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <a
                  href={campaign.primaryCtaHref}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-8 py-3.5 text-sm sm:text-base font-extrabold uppercase tracking-wider shadow-lg transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0",
                    isDiwali && "bg-[#E5007D] text-white shadow-pink-900/40 hover:bg-[#c9006e]",
                    isRakhi && "bg-[#E5007D] text-white shadow-pink-600/30 hover:bg-[#c9006e]",
                    isWedding && "bg-[#4A1525] text-white shadow-amber-950/25 hover:bg-[#38101c]",
                  )}
                >
                  {campaign.primaryCta}
                </a>

                <Link
                  href={campaign.secondaryCtaHref}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-bold transition-all duration-200 border",
                    isDiwali && "border-white/40 bg-white/10 text-white hover:bg-white hover:text-purple-950",
                    isRakhi && "border-pink-300 bg-white/90 text-pink-900 hover:bg-pink-100",
                    isWedding && "border-stone-300 bg-white/90 text-stone-900 hover:bg-stone-100",
                  )}
                >
                  {campaign.secondaryCta}
                </Link>
              </div>

              {/* Bottom Trust Indicators Strip with True Icons matching Reference Image 1 */}
              <div
                className={cn(
                  "mt-8 pt-6 border-t grid grid-cols-2 sm:grid-cols-4 gap-3 text-[11px] sm:text-xs font-semibold w-full",
                  isDiwali && "border-white/15 text-purple-200",
                  isRakhi && "border-pink-200 text-pink-900/90",
                  isWedding && "border-amber-200 text-stone-800",
                )}
              >
                {isWedding ? (
                  <>
                    <div className="flex items-center gap-1.5">
                      <Award className="h-4 w-4 text-[#9A7432] shrink-0" />
                      <span>Premium Quality</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Scissors className="h-4 w-4 text-[#9A7432] shrink-0" />
                      <span>Custom Made</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Package className="h-4 w-4 text-[#9A7432] shrink-0" />
                      <span>Elegant Packaging</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-4 w-4 text-[#9A7432] shrink-0" />
                      <span>Timely Delivery</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex items-center gap-1.5">
                      <Truck className="h-4 w-4 text-[#FFD200] shrink-0" />
                      <span>Free Delivery Above ₹999</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Zap className="h-4 w-4 text-[#FFD200] shrink-0" />
                      <span>Express Dispatch</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CreditCard className="h-4 w-4 text-[#FFD200] shrink-0" />
                      <span>UPI | Card | COD</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="h-4 w-4 text-[#FFD200] shrink-0" />
                      <span>Secure Payments</span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Right Side: Visual Showcase + Scalloped Badge */}
            <div className="lg:col-span-5 relative flex flex-col items-center justify-center">
              {/* Scalloped Circular Offer Badge directly matching reference 1 */}
              <div
                className={cn(
                  "absolute -top-4 -right-2 sm:-top-6 sm:right-2 z-20 flex h-20 w-20 sm:h-24 sm:w-24 flex-col items-center justify-center rounded-full text-center shadow-xl transition-transform hover:scale-105",
                  isDiwali &&
                    "bg-[#FFD200] text-gray-950 border-4 border-dashed border-amber-600/30",
                  isRakhi &&
                    "bg-gradient-to-br from-pink-100 to-rose-200 text-pink-900 border-4 border-dashed border-pink-400/40",
                  isWedding &&
                    "bg-gradient-to-br from-amber-100 to-amber-200 text-amber-950 border-4 border-dashed border-amber-400/50",
                )}
              >
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-tighter">UP TO</span>
                <span className="text-lg sm:text-2xl font-black leading-none">{isRakhi ? "30%" : "40%"}</span>
                <span className="text-[10px] sm:text-xs font-black uppercase">OFF</span>
              </div>

              {/* Grid of 4 Personalized Product Cards with Direct Customizer Link */}
              <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
                {campaign.heroVisualProducts.map((prod, idx) => (
                  <Link
                    key={prod.slug + idx}
                    href={`/customize/${prod.slug}`}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-2xl p-2.5 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl",
                      isDiwali &&
                        "bg-white/10 border border-white/20 hover:border-amber-400/50 hover:bg-white/15 backdrop-blur-md",
                      isRakhi &&
                        "bg-white/90 border border-pink-200 hover:border-pink-400 shadow-sm",
                      isWedding &&
                        "bg-white/90 border border-amber-200/80 hover:border-amber-400 shadow-sm",
                      idx === 1 && "translate-y-2 sm:translate-y-3",
                      idx === 2 && "-translate-y-2 sm:-translate-y-3",
                    )}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-white shadow-inner">
                      <Image
                        src={prod.image}
                        alt={prod.title}
                        fill
                        sizes="(max-width: 768px) 50vw, 200px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <span className="absolute top-2 left-2 rounded-md bg-[#E5007D] px-2 py-0.5 text-[9px] font-bold text-white shadow-xs">
                        {prod.tag}
                      </span>
                    </div>

                    <div className="mt-2.5 flex items-center justify-between px-1">
                      <span
                        className={cn(
                          "text-xs font-bold line-clamp-1 transition-colors",
                          isDiwali && "text-white group-hover:text-[#FFD200]",
                          (isRakhi || isWedding) && "text-gray-900 group-hover:text-[#6C2BD9]",
                        )}
                      >
                        {prod.title}
                      </span>
                      <span
                        className={cn(
                          "text-xs font-black shrink-0",
                          isDiwali && "text-[#FFD200]",
                          (isRakhi || isWedding) && "text-[#E5007D]",
                        )}
                      >
                        {prod.price}
                      </span>
                    </div>

                    <div
                      className={cn(
                        "mt-1 flex items-center justify-between px-1 text-[10px] font-semibold",
                        isDiwali && "text-purple-200 group-hover:text-white",
                        (isRakhi || isWedding) && "text-gray-500 group-hover:text-[#6C2BD9]",
                      )}
                    >
                      <span>Customize Now</span>
                      <span>→</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
