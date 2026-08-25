"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { campaignSlides, type CampaignSlide } from "@/data/campaign-pages";
import { cn } from "@/lib/cn";

export function CampaignSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const totalSlides = campaignSlides.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  }, [totalSlides]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  }, [totalSlides]);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Auto-rotation every 5 seconds; pauses when hovered
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(timer);
  }, [isHovered, nextSlide]);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      // Swiped Left -> Next Slide
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      // Swiped Right -> Prev Slide
      prevSlide();
    }

    touchStartX.current = null;
    touchEndX.current = null;
  };

  const currentSlide: CampaignSlide = campaignSlides[currentIndex];

  return (
    <section
      id="festive-campaign-slider"
      className="relative py-4 sm:py-6 lg:py-8 overflow-hidden"
      aria-label="Festive promotional offers slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Banner Card Container with Authentic Theme Background */}
        <div
          className={cn(
            "relative rounded-3xl overflow-hidden shadow-2xl border transition-all duration-500",
            `bg-gradient-to-br ${currentSlide.bgGradient}`,
            currentSlide.borderColor,
          )}
        >
          {/* Decorative Ambient Background Glows */}
          <div
            className={cn(
              "pointer-events-none absolute -top-12 -right-12 h-96 w-96 rounded-full blur-3xl transition-all duration-700",
              currentSlide.glowColor,
            )}
            aria-hidden="true"
          />
          <div
            className="pointer-events-none absolute -bottom-16 -left-16 h-80 w-80 rounded-full bg-[#E5007D]/20 blur-3xl"
            aria-hidden="true"
          />

          {/* Slide Content Grid */}
          <div className="relative z-10 px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center min-h-[460px] sm:min-h-[480px]">
            {/* Left Content Side */}
            <div className="lg:col-span-6 xl:col-span-7 flex flex-col items-start text-left">
              {/* Top Row: Icon + Campaign Offer Badge */}
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-xl sm:text-2xl shadow-inner border border-white/20">
                  {currentSlide.icon}
                </div>
                <span
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-black tracking-wide shadow-sm uppercase",
                    currentSlide.badgeBg,
                    currentSlide.badgeText,
                  )}
                >
                  {currentSlide.offer}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-bold text-amber-200/90 bg-white/10 rounded-full px-2.5 py-0.5 border border-white/15">
                  <Sparkles className="h-3 w-3 text-amber-300" />
                  <span>Limited Time Deal</span>
                </span>
              </div>

              {/* Campaign Title */}
              <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.1] drop-shadow-sm">
                {currentSlide.title}
              </h2>

              {/* Campaign Subtitle */}
              <p className="mt-2.5 sm:mt-3 text-sm sm:text-base lg:text-lg text-purple-100/90 max-w-xl font-medium leading-relaxed">
                {currentSlide.subtitle}
              </p>

              {/* Product Tags / Feature Pills */}
              <div className="mt-4 sm:mt-5 flex flex-wrap gap-2">
                {currentSlide.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center rounded-xl bg-white/15 px-3 py-1.5 text-xs font-bold text-white backdrop-blur-md border border-white/15 shadow-xs"
                  >
                    ✓ {tag}
                  </span>
                ))}
              </div>

              {/* CTA Button Link */}
              <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-4 w-full sm:w-auto">
                <Link
                  href={currentSlide.href}
                  className={cn(
                    "inline-flex items-center justify-center gap-2 rounded-2xl px-8 py-3.5 text-sm sm:text-base font-extrabold tracking-wide shadow-xl transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group",
                    currentSlide.btnBg,
                  )}
                >
                  <span>{currentSlide.cta}</span>
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/services#personalized-products"
                  className="hidden sm:inline-flex items-center text-xs font-bold text-purple-200 hover:text-white transition-colors underline-offset-4 hover:underline"
                >
                  View all occasions
                </Link>
              </div>
            </div>

            {/* Right Side: Product Collage Showcase (2-3 Real Products) */}
            <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center">
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-2.5 sm:gap-3.5 w-full max-w-md lg:max-w-none">
                {currentSlide.images.map((img, idx) => (
                  <Link
                    key={img.label + idx}
                    href={currentSlide.href}
                    className={cn(
                      "group relative flex flex-col overflow-hidden rounded-2xl bg-white/90 p-2 text-gray-900 shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl border border-white/40",
                      idx === 2 ? "col-span-2 sm:col-span-1" : "",
                      idx === 1 ? "sm:translate-y-2" : "",
                    )}
                  >
                    <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100">
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-width: 640px) 45vw, (max-width: 1024px) 25vw, 160px"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      {img.price && (
                        <span className="absolute bottom-1.5 right-1.5 rounded-md bg-black/75 px-1.5 py-0.5 text-[10px] font-black text-[#FFD200] backdrop-blur-xs">
                          {img.price}
                        </span>
                      )}
                    </div>
                    <div className="mt-2 flex items-center justify-between px-1">
                      <span className="text-[11px] sm:text-xs font-bold line-clamp-1 text-gray-900 group-hover:text-[#6C2BD9] transition-colors">
                        {img.label}
                      </span>
                      <span className="text-[11px] font-bold text-[#E5007D] shrink-0">
                        Custom
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          {/* Prev Arrow */}
          <button
            type="button"
            onClick={prevSlide}
            aria-label="Previous campaign slide"
            className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 shadow-md transition-all duration-200 hover:bg-black/70 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Next Arrow */}
          <button
            type="button"
            onClick={nextSlide}
            aria-label="Next campaign slide"
            className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 z-20 flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-md border border-white/20 shadow-md transition-all duration-200 hover:bg-black/70 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-amber-400"
          >
            <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>

          {/* Slide Indicator Dots / Pills */}
          <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-black/30 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/15">
            {campaignSlides.map((slide, index) => (
              <button
                key={slide.id}
                type="button"
                onClick={() => goToSlide(index)}
                aria-label={`Go to ${slide.title}`}
                className={cn(
                  "h-2 rounded-full transition-all duration-300 focus:outline-none",
                  currentIndex === index
                    ? "w-6 sm:w-8 bg-[#FFD200] shadow-xs"
                    : "w-2 bg-white/50 hover:bg-white/80",
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
