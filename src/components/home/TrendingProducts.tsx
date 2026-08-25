"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { Container } from "@/components/ui/Container";
import { ProductCard } from "@/components/products/ProductCard";

interface TrendingProductsProps {
  products: CatalogProduct[];
  error?: string | null;
}

export function TrendingProducts({ products, error }: TrendingProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const displayProducts = products.slice(0, 6);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="bg-white py-6 sm:py-8 lg:py-10">
      <Container>
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-gray-950">
            Trending Now
          </h2>
          <Link
            href="/products"
            className="rounded-lg border border-pink-200 bg-white px-3.5 py-1 text-xs font-bold text-[#E5007D] shadow-2xs hover:bg-pink-50 transition-colors"
          >
            View All
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-900 mb-4">
            Unable to connect to live inventory; displaying catalog items.
          </div>
        )}

        {/* Carousel Container with Left/Right Arrow Navigation */}
        <div className="relative group">
          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("left")}
            aria-label="Previous trending products"
            className="absolute -left-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Products Row / Grid */}
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 pt-1 scroll-smooth scrollbar-none sm:grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-6 sm:gap-4 sm:pb-0"
          >
            {displayProducts.map((product, idx) => (
              <div
                key={product.id || product.slug}
                className="w-64 shrink-0 sm:w-auto"
              >
                <ProductCard product={product} badge={idx % 2 === 0 ? "Bestseller" : undefined} />
              </div>
            ))}
          </div>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={() => scroll("right")}
            aria-label="Next trending products"
            className="absolute -right-3 top-1/2 -translate-y-1/2 z-20 hidden sm:flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-700 shadow-md transition-all hover:bg-gray-50 hover:scale-105 active:scale-95"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </Container>
    </section>
  );
}
