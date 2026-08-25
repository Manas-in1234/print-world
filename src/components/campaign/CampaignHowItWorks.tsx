"use client";

import Link from "next/link";

interface CampaignHowItWorksProps {
  primaryCtaHref?: string;
}

export function CampaignHowItWorks({
  primaryCtaHref = "/customize/custom-mug",
}: CampaignHowItWorksProps) {
  const steps = [
    {
      number: "01",
      title: "Choose Your Product",
      description:
        "Pick from custom t-shirts, acrylic frames, mugs, clocks, posters, or gift hampers.",
      icon: "🎁",
    },
    {
      number: "02",
      title: "Upload Photo or Design",
      description:
        "Upload family photos, heartfelt text, or generate fresh art using our AI Studio.",
      icon: "🖼️",
    },
    {
      number: "03",
      title: "Personalize in Real-Time",
      description:
        "Adjust fonts, colors, and layout on high-precision live 3D mockups before ordering.",
      icon: "✨",
    },
    {
      number: "04",
      title: "Fast Pan-India Delivery",
      description:
        "We print on premium materials, securely pack, and deliver right to your doorstep.",
      icon: "🚀",
    },
  ];

  return (
    <section className="py-14 sm:py-20 bg-white border-t border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="inline-block rounded-full bg-purple-100 px-3.5 py-1 text-xs font-extrabold text-[#6C2BD9]">
            Simple 4-Step Process
          </span>
          <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl font-black text-gray-900">
            Make It Truly Yours
          </h2>
          <p className="mt-3 text-sm sm:text-base text-gray-600">
            Create custom gifts in minutes with real-time preview and premium industrial grade printing.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="relative flex flex-col justify-between rounded-2xl border border-gray-200/90 bg-gradient-to-b from-white to-[#F6F7FB]/50 p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#6C2BD9]/30 hover:shadow-md"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{step.icon}</span>
                  <span className="font-mono text-xs font-black text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full border border-purple-100">
                    Step {step.number}
                  </span>
                </div>

                <h3 className="mt-5 font-display text-base sm:text-lg font-bold text-gray-900">
                  {step.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-gray-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="mt-6 pt-3 border-t border-gray-100 text-[11px] font-bold text-[#6C2BD9] flex items-center gap-1">
                <span>Fast & Easy</span>
                <span>✓</span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={primaryCtaHref}
            className="inline-flex items-center justify-center rounded-xl bg-[#E5007D] px-8 py-3.5 text-base font-bold text-white shadow-lg shadow-pink-900/20 hover:bg-[#c9006e] transition-all hover:-translate-y-0.5"
          >
            <span>Start Creating</span>
            <svg
              className="ml-2 h-4 w-4"
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
    </section>
  );
}
