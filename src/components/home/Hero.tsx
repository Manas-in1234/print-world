"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";

export function Hero() {
  return (
    <section className="bg-white py-4 sm:py-6 lg:py-8" aria-label="Print World Hero Banner">
      <Container>
        {/* Large Rounded Hero Banner Container */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-pink-100/70 bg-[#FAF7FD] shadow-xs">
          
          {/* DESKTOP / TABLET HERO (>640px): 
              Single authoritative uploaded hero image spanning the background,
              with text rendered strictly on the empty pastel left side */}
          <div className="relative hidden min-h-[460px] md:min-h-[480px] lg:min-h-[540px] sm:flex items-center">
            {/* Authoritative Single Uploaded Image Asset */}
            <div className="absolute inset-0 h-full w-full select-none pointer-events-none">
              <Image
                src="/product-assets/hero-banner-clean.png"
                alt="Personalized custom t-shirt, photo mug, acrylic photo frame, wall clock, mountain poster, and business card"
                fill
                priority
                quality={100}
                className="object-cover object-[center_60%]"
                sizes="(max-width: 1280px) 100vw, 1200px"
              />
            </div>

            {/* Left Content Area (Positioned on Empty Left Area of Uploaded Image) */}
            <div className="relative z-10 w-full max-w-md sm:max-w-lg lg:max-w-xl pl-8 pr-4 sm:pl-10 lg:pl-14 py-10 lg:py-14">
              {/* Main Headline */}
              <h1 className="font-display text-4xl sm:text-5xl lg:text-[4.25rem] xl:text-[4.75rem] font-black tracking-tight leading-[1.02] text-gray-950">
                <span className="text-[#3C1777]">Make It </span>
                <span className="text-[#E5007D]">Yours.</span>
              </h1>

              {/* Subheading */}
              <p className="mt-3.5 sm:mt-4 text-base sm:text-lg lg:text-xl font-bold leading-snug text-gray-900">
                Personalized gifts, prints and products
                <br className="hidden sm:inline" /> made for your moments.
              </p>

              {/* Secondary Description */}
              <p className="mt-2 text-xs sm:text-sm font-semibold leading-relaxed text-[#6C2BD9]">
                Design it your way. Preview it instantly. Order it online.
              </p>

              {/* CTA Buttons */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link
                  href="/customize/custom-t-shirt"
                  className="inline-flex items-center justify-center rounded-xl bg-[#E5007D] px-6 sm:px-7 py-3.5 text-sm font-black text-white shadow-md shadow-pink-500/25 transition-all hover:bg-[#c9006e] hover:shadow-lg active:scale-98"
                >
                  Start Creating
                </Link>
                <Link
                  href="/products"
                  className="inline-flex items-center justify-center rounded-xl border-2 border-[#4B1FA8]/30 bg-white/95 px-6 sm:px-7 py-3.5 text-sm font-black text-[#4B1FA8] shadow-2xs transition-all hover:bg-purple-50 hover:border-[#4B1FA8] active:scale-98"
                >
                  Explore Products →
                </Link>
              </div>

              {/* Trust Row Below CTA (Row 1: Personalized + Premium Printing, Row 2: Delivered Across India) */}
              <div className="mt-7 sm:mt-8 flex flex-col gap-y-2 text-xs sm:text-sm font-bold text-gray-800">
                <div className="flex items-center gap-x-5 sm:gap-x-6">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base">🎁</span>
                    <span>Personalized</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base">🏅</span>
                    <span>Premium Printing</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base">🚚</span>
                    <span>Delivered Across India</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* MOBILE HERO (<640px):
              Clean vertical stacked layout so both text and the full uploaded product artwork
              remain 100% visible, legible, and uncropped */}
          <div className="flex flex-col sm:hidden px-6 pt-7 pb-5 bg-gradient-to-b from-[#FFF5F8] via-[#FAF5FF] to-[#F0F7FF]">
            {/* Top Text Content */}
            <div className="flex flex-col items-start">
              <h1 className="font-display text-4xl font-black tracking-tight leading-tight text-gray-950">
                <span className="text-[#3C1777]">Make It </span>
                <span className="text-[#E5007D]">Yours.</span>
              </h1>

              <p className="mt-2.5 text-sm font-bold leading-snug text-gray-900">
                Personalized gifts, prints and products made for your moments.
              </p>

              <p className="mt-1.5 text-xs font-semibold leading-relaxed text-[#6C2BD9]">
                Design it your way. Preview it instantly. Order it online.
              </p>

              {/* Mobile CTA Buttons */}
              <div className="mt-5 flex w-full flex-col gap-2.5">
                <Link
                  href="/customize/custom-t-shirt"
                  className="flex w-full items-center justify-center rounded-xl bg-[#E5007D] py-3 text-sm font-black text-white shadow-md shadow-pink-500/20 active:scale-98"
                >
                  Start Creating
                </Link>
                <Link
                  href="/products"
                  className="flex w-full items-center justify-center rounded-xl border-2 border-[#4B1FA8]/30 bg-white py-3 text-sm font-black text-[#4B1FA8] active:scale-98"
                >
                  Explore Products →
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 flex flex-col gap-y-2 text-xs sm:text-sm font-bold text-gray-800">
                <div className="flex items-center gap-x-4">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base">🎁</span>
                    <span>Personalized</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base">🏅</span>
                    <span>Premium Printing</span>
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="inline-flex items-center gap-1.5">
                    <span className="text-base">🚚</span>
                    <span>Delivered Across India</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Mobile Image: Exact uploaded product artwork in its entirety */}
            <div className="relative mt-5 aspect-[16/10] w-full overflow-hidden rounded-xl">
              <Image
                src="/product-assets/hero-banner.png"
                alt="Personalized gifts artwork"
                fill
                priority
                className="object-cover object-center"
                sizes="(max-width: 640px) 92vw, 400px"
              />
            </div>
          </div>


        </div>
      </Container>
    </section>
  );
}
