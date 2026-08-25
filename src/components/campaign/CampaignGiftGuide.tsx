"use client";

import Link from "next/link";
import Image from "next/image";
import type { CampaignGiftGuideItem } from "@/data/campaign-pages";

interface CampaignGiftGuideProps {
  title: string;
  subtitle: string;
  items: CampaignGiftGuideItem[];
}

export function CampaignGiftGuide({
  title,
  subtitle,
  items,
}: CampaignGiftGuideProps) {
  return (
    <section className="py-14 sm:py-20 bg-[#F6F7FB] border-t border-gray-200/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10 sm:mb-14">
          <div>
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#6C2BD9]">
              Curated Gift Guide
            </span>
            <h2 className="mt-1 font-display text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              {title}
            </h2>
            <p className="mt-2 text-sm sm:text-base text-gray-600 max-w-2xl">
              {subtitle}
            </p>
          </div>
        </div>

        {/* 5 recipient cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {items.map((item, idx) => (
            <Link
              key={item.recipient + idx}
              href={item.href}
              className="group flex flex-col justify-between overflow-hidden rounded-2xl border border-gray-200 bg-white p-3.5 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[#6C2BD9]/40 hover:shadow-lg"
            >
              <div>
                <div className="relative aspect-square w-full overflow-hidden rounded-xl bg-gray-50 border border-gray-100">
                  <Image
                    src={item.image}
                    alt={item.recipient}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 33vw, 220px"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span className="absolute top-2 left-2 rounded-md bg-[#6C2BD9] px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">
                    {item.tag}
                  </span>
                </div>

                <div className="mt-3.5 px-1">
                  <h3 className="font-display text-base font-bold text-gray-900 group-hover:text-[#E5007D] transition-colors">
                    {item.recipient}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100 px-1 flex items-center justify-between text-xs font-bold text-[#6C2BD9] group-hover:text-[#E5007D] transition-colors">
                <span>View Gifts</span>
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
