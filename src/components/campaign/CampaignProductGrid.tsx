"use client";

import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { ProductCard } from "@/components/products/ProductCard";

interface CampaignProductGridProps {
  products: CatalogProduct[];
  title?: string;
  subtitle?: string;
}

export function CampaignProductGrid({
  products,
  title = "Trending This Season",
  subtitle = "Our most popular personalized gifts loved by customers across India.",
}: CampaignProductGridProps) {
  if (!products || products.length === 0) return null;

  return (
    <section id="trending" className="py-12 sm:py-16 bg-[#F6F7FB]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-md bg-pink-100 px-2.5 py-1 text-xs font-extrabold text-[#E5007D]">
              <span>🔥 Top Festive Picks</span>
            </div>
            <h2 className="mt-2 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              {subtitle}
            </p>
          </div>

          <Link
            href="/products"
            className="inline-flex items-center text-sm font-bold text-[#6C2BD9] hover:text-[#E5007D] transition-colors"
          >
            <span>Explore All Gifts</span>
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

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}
