"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";

interface DealItem {
  name: string;
  price: number;
  originalPrice: number;
  slug: string;
  image: string;
  tag: string;
}

const dealsData: Record<string, DealItem[]> = {
  "under-299": [
    {
      name: "Custom Business Cards (100 pcs)",
      price: 199,
      originalPrice: 299,
      slug: "business-card",
      image: "/product-assets/business-card.jpg",
      tag: "Best Value",
    },
    {
      name: "Custom HD Wall Poster",
      price: 249,
      originalPrice: 349,
      slug: "custom-poster",
      image: "/product-assets/poster.jpg",
      tag: "Vibrant Print",
    },
  ],
  "under-499": [
    {
      name: "Custom Ceramic Coffee Mug",
      price: 299,
      originalPrice: 399,
      slug: "custom-mug",
      image: "/product-assets/mug.jpg",
      tag: "Top Seller",
    },
    {
      name: "Custom Graphic T-Shirt",
      price: 499,
      originalPrice: 699,
      slug: "custom-t-shirt",
      image: "/product-assets/tshirt.jpg",
      tag: "100% Cotton",
    },
  ],
  "under-799": [
    {
      name: "Acrylic Photo Desktop Frame",
      price: 699,
      originalPrice: 999,
      slug: "acrylic-photo-frame",
      image: "/product-assets/acrylic-frame.jpg",
      tag: "High Gloss",
    },
    {
      name: "Couple Matching T-Shirts",
      price: 749,
      originalPrice: 1099,
      slug: "custom-t-shirt",
      image: "/product-assets/tshirt.jpg",
      tag: "Special Combo",
    },
  ],
  "under-999": [
    {
      name: "Designer Custom Wall Clock",
      price: 799,
      originalPrice: 1199,
      slug: "custom-clock",
      image: "/product-assets/clock.jpg",
      tag: "7 Shapes",
    },
    {
      name: "Large Acrylic Wall Portrait",
      price: 899,
      originalPrice: 1299,
      slug: "acrylic-photo-frame",
      image: "/product-assets/acrylic-frame.jpg",
      tag: "Premium Finish",
    },
  ],
};

const tabs = [
  { id: "under-299", label: "Under ₹299" },
  { id: "under-499", label: "Under ₹499" },
  { id: "under-799", label: "Under ₹799" },
  { id: "under-999", label: "Under ₹999" },
];

export function DealsSection() {
  const [activeTab, setActiveTab] = useState("under-499");
  const currentDeals = dealsData[activeTab] || dealsData["under-499"];

  return (
    <section className="bg-[#F8F8FA] py-12 sm:py-16">
      <Container>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-[#FFD200]/25 px-2.5 py-0.5 text-xs font-bold text-amber-950">
              <span>⚡</span>
              <span>Pocket-Friendly Value Deals</span>
            </div>
            <h2 className="mt-2 font-display text-2xl font-bold text-gray-900 sm:text-3xl">
              Deals & Budget Store
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-gray-500">
              Unbeatable prices on personalized custom creations
            </p>
          </div>

          {/* Tab Selector */}
          <div className="flex flex-wrap gap-2 rounded-xl bg-white p-1.5 shadow-xs border border-gray-200">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all ${
                  activeTab === tab.id
                    ? "bg-[#6C2BD9] text-white shadow-xs"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {currentDeals.map((deal) => {
            const discountPct = Math.round(
              ((deal.originalPrice - deal.price) / deal.originalPrice) * 100
            );

            return (
              <div
                key={deal.name}
                className="group flex flex-col sm:flex-row overflow-hidden rounded-2xl border border-gray-200 bg-white p-4 shadow-xs transition-all duration-300 hover:border-[#E5007D]/40 hover:shadow-md gap-4"
              >
                <div className="relative aspect-square w-full sm:w-44 shrink-0 overflow-hidden rounded-xl bg-gray-50">
                  <Image
                    src={deal.image}
                    alt={deal.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-106"
                    sizes="(max-width: 640px) 100vw, 176px"
                  />
                  <span className="absolute left-2 top-2 rounded-md bg-[#E5007D] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    {deal.tag}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between">
                  <div>
                    <span className="inline-block rounded-sm bg-emerald-50 px-2 py-0.5 text-[11px] font-bold text-emerald-700">
                      SAVE {discountPct}% TODAY
                    </span>
                    <h3 className="mt-2 font-display text-base sm:text-lg font-bold text-gray-900 group-hover:text-[#E5007D] transition-colors">
                      {deal.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-2">
                      <span className="text-xl font-extrabold text-gray-950">
                        ₹{deal.price}
                      </span>
                      <span className="text-xs text-gray-400 line-through">
                        ₹{deal.originalPrice}
                      </span>
                      <span className="text-xs font-semibold text-emerald-600">
                        ({discountPct}% off)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center gap-2 pt-3 border-t border-gray-100">
                    <Link
                      href={`/customize/${deal.slug}`}
                      className="flex-1 inline-flex items-center justify-center rounded-xl bg-[#E5007D] px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#C70068] active:scale-95 shadow-xs"
                    >
                      Customize Now
                    </Link>
                    <Link
                      href={`/products/${deal.slug}`}
                      className="rounded-xl border border-gray-200 px-3.5 py-2 text-xs font-bold text-gray-700 hover:bg-gray-50"
                    >
                      View
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
