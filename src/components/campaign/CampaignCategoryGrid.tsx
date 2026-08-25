"use client";

import Link from "next/link";
import Image from "next/image";
import type { CampaignCategoryItem } from "@/data/campaign-pages";

interface CampaignCategoryGridProps {
  categories: CampaignCategoryItem[];
  theme?: string;
}

export function CampaignCategoryGrid({
  categories,
}: CampaignCategoryGridProps) {
  return (
    <section id="categories" className="py-12 sm:py-16 bg-white border-y border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#E5007D]">
              Festive Catalog
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              Shop by Category
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              Select a gift category to customize with your photos, personal names, and bespoke messages.
            </p>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center text-sm font-bold text-[#6C2BD9] hover:text-[#E5007D] transition-colors"
          >
            <span>View all products</span>
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

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={cat.name + idx}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200/90 bg-white p-5 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E5007D]/40 hover:shadow-lg"
            >
              <div>
                {/* Image Container with Badges */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                  <Image
                    src={cat.image}
                    alt={cat.name}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {cat.badge && (
                    <span className="absolute top-3 left-3 rounded-md bg-[#6C2BD9] px-2.5 py-1 text-[11px] font-bold text-white shadow-xs">
                      {cat.badge}
                    </span>
                  )}
                  <span className="absolute bottom-3 right-3 rounded-lg bg-black/75 px-2.5 py-1 text-xs font-black text-amber-300 backdrop-blur-xs">
                    {cat.price}
                  </span>
                </div>

                {/* Category Info */}
                <div className="mt-4">
                  <h3 className="font-display text-lg font-bold text-gray-900 group-hover:text-[#6C2BD9] transition-colors">
                    {cat.name}
                  </h3>
                  <p className="mt-1.5 text-xs sm:text-sm text-gray-600 leading-relaxed">
                    {cat.desc}
                  </p>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-5 pt-4 border-t border-gray-100 flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-600">
                  ⚡ Express Dispatch
                </span>
                <Link
                  href={cat.href}
                  className="inline-flex items-center justify-center rounded-lg bg-[#6C2BD9] px-4 py-2 text-xs font-bold text-white shadow-xs transition-all hover:bg-[#E5007D]"
                >
                  <span>Customize</span>
                  <svg
                    className="ml-1.5 h-3.5 w-3.5"
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
          ))}
        </div>
      </div>
    </section>
  );
}
