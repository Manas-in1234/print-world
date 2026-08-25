"use client";

import { useState, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";

interface CampaignItem {
  id: string;
  title: string;
  subtitle: string;
  offer: string;
  tags: string[];
  cta: string;
  href: string;
  icon: string;
  badgeBg: string;
  badgeText: string;
  cardBg: string;
  btnBg: string;
  images: {
    src: string;
    alt: string;
    label: string;
  }[];
}

const campaigns: CampaignItem[] = [
  {
    id: "diwali",
    title: "Diwali Festive Offers",
    subtitle: "Light up celebrations with personalized gifts",
    offer: "UP TO 40% OFF",
    tags: ["Custom Photo Frames", "Festive Mugs", "Shubh Diwali Clocks"],
    cta: "Shop Diwali Gifts →",
    href: "/diwali",
    icon: "🪔",
    badgeBg: "bg-[#FFD200]",
    badgeText: "text-gray-950",
    cardBg: "from-[#2A063B] via-[#3C0A52] to-[#1F032C]",
    btnBg: "bg-[#E5007D] hover:bg-[#c9006e] text-white",
    images: [
      {
        src: "/product-assets/acrylic-frame.jpg",
        alt: "Personalized Photo Frame",
        label: "Photo Frame",
      },
      {
        src: "/product-assets/mug.jpg",
        alt: "Festive Personalized Mug",
        label: "Festive Mug",
      },
    ],
  },
  {
    id: "raksha-bandhan",
    title: "Raksha Bandhan Special",
    subtitle: "Celebrate the sibling bond with gifts they'll cherish",
    offer: "UP TO 30% OFF",
    tags: ["Best Brother Tees", "Superhero Mugs", "Sibling Keepsakes"],
    cta: "Shop Rakhi Gifts →",
    href: "/raksha-bandhan",
    icon: "🌸",
    badgeBg: "bg-white",
    badgeText: "text-pink-900 font-black",
    cardBg: "from-[#3B0526] via-[#560938] to-[#260319]",
    btnBg: "bg-[#E5007D] hover:bg-[#c9006e] text-white",
    images: [
      {
        src: "/product-assets/tshirt.jpg",
        alt: "Best Brother Custom T-Shirt",
        label: "Brother Tee",
      },
      {
        src: "/product-assets/mug.jpg",
        alt: "Superhero Sibling Mug",
        label: "Sibling Mug",
      },
    ],
  },
  {
    id: "wedding-gifts",
    title: "Wedding Gifts Made Memorable",
    subtitle: "Personalized gifts for the most beautiful beginnings",
    offer: "UP TO 40% OFF",
    tags: ["Acrylic Couple Frames", "Heirloom Clocks", "Couple Mug Pairs"],
    cta: "Explore Wedding Gifts →",
    href: "/wedding-gifts",
    icon: "💍",
    badgeBg: "bg-[#FDF0D5]",
    badgeText: "text-amber-950 font-black",
    cardBg: "from-[#2B1028] via-[#461A42] to-[#1A0A19]",
    btnBg: "bg-[#881337] hover:bg-[#680e29] text-white",
    images: [
      {
        src: "/product-assets/clock.jpg",
        alt: "Custom Heirloom Wall Clock",
        label: "Heirloom Clock",
      },
      {
        src: "/product-assets/acrylic-frame.jpg",
        alt: "Acrylic Couple Photo Frame",
        label: "Couple Frame",
      },
    ],
  },
];

export function CelebrateOccasionsCarousel() {
  const [startIndex, setStartIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const total = campaigns.length;

  const next = useCallback(() => {
    setStartIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setStartIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Touch Swipe handlers for mobile
  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;

    if (diff > 50) {
      next();
    } else if (diff < -50) {
      prev();
    }
    touchStartX.current = null;
  };

  // Reorder campaigns based on startIndex for carousel wrap-around
  const orderedCampaigns = [
    ...campaigns.slice(startIndex),
    ...campaigns.slice(0, startIndex),
  ];

  return (
    <section
      id="celebrate-every-occasion"
      className="bg-white py-12 sm:py-16 border-t border-gray-100"
      aria-label="Celebrate Every Occasion Festive Campaigns"
    >
      <Container>
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-pink-100 px-3 py-1 text-xs font-bold text-[#E5007D]">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Limited-Time Festive Savings</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-gray-950">
              Festive Collections & Special Offers
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-600 max-w-2xl">
              Curated festive campaigns with exclusive discounts, personalized gifts, and express delivery across India.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/services#personalized-products"
              className="text-xs sm:text-sm font-bold text-[#4B1FA8] hover:text-[#E5007D] transition-colors inline-flex items-center gap-1"
            >
              <span>View All Occasions</span>
              <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Carousel Arrow Controls */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={prev}
                aria-label="Previous festive offer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-xs transition-all hover:bg-gray-50 hover:text-black hover:border-gray-300 active:scale-95 cursor-pointer"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next festive offer"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-xs transition-all hover:bg-gray-50 hover:text-black hover:border-gray-300 active:scale-95 cursor-pointer"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Carousel Grid / Rail */}
        <div
          ref={containerRef}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          {/* Desktop 3-Card Layout / Mobile 1-Card carousel */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {orderedCampaigns.map((item, idx) => (
              <div
                key={item.id}
                className={cn(
                  "relative flex flex-col justify-between rounded-3xl p-6 sm:p-7 text-white shadow-xl transition-all duration-500 overflow-hidden border border-white/15",
                  `bg-gradient-to-b ${item.cardBg}`,
                  idx > 0 ? "hidden md:flex" : "flex",
                  idx === 2 ? "hidden lg:flex" : "",
                )}
              >
                {/* Top Row: Icon + Discount Badge */}
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/15 backdrop-blur-md text-xl border border-white/20">
                      {item.icon}
                    </div>
                    <span
                      className={cn(
                        "rounded-full px-3 py-1 text-xs font-black tracking-wide shadow-xs uppercase",
                        item.badgeBg,
                        item.badgeText,
                      )}
                    >
                      {item.offer}
                    </span>
                  </div>

                  {/* Title & Subtitle */}
                  <h3 className="mt-5 font-display text-xl sm:text-2xl font-black text-white leading-snug">
                    {item.title}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-white/80 font-medium leading-relaxed">
                    {item.subtitle}
                  </p>

                  {/* Real Product Images Side by Side */}
                  <div className="mt-5 grid grid-cols-2 gap-3">
                    {item.images.map((img, imgIdx) => (
                      <div
                        key={img.label + imgIdx}
                        className="relative aspect-square w-full overflow-hidden rounded-2xl bg-white p-1.5 shadow-sm"
                      >
                        <div className="relative h-full w-full overflow-hidden rounded-xl bg-gray-100">
                          <Image
                            src={img.src}
                            alt={img.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 40vw, 150px"
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Product Feature Pills */}
                  <div className="mt-5 flex flex-wrap gap-1.5">
                    {item.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="inline-flex items-center rounded-lg bg-white/15 px-2.5 py-1 text-[11px] font-bold text-white backdrop-blur-xs border border-white/10"
                      >
                        ✓ {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Bottom CTA Button */}
                <div className="mt-6 pt-2">
                  <Link
                    href={item.href}
                    className={cn(
                      "flex w-full items-center justify-center gap-2 rounded-xl py-3.5 px-4 text-sm font-extrabold shadow-md transition-all duration-200 active:scale-98 text-center",
                      item.btnBg,
                    )}
                  >
                    <span>{item.cta}</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile Dot Indicators */}
          <div className="mt-6 flex items-center justify-center gap-2 md:hidden">
            {campaigns.map((c, index) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setStartIndex(index)}
                aria-label={`Go to ${c.title}`}
                className={cn(
                  "h-2 rounded-full transition-all",
                  startIndex === index
                    ? "w-6 bg-[#4B1FA8]"
                    : "w-2 bg-gray-300 hover:bg-gray-400",
                )}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
