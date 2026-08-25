"use client";

import type { CampaignData } from "@/data/campaign-pages";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { CampaignHero } from "@/components/campaign/CampaignHero";
import { CampaignCategoryGrid } from "@/components/campaign/CampaignCategoryGrid";
import { CampaignProductGrid } from "@/components/campaign/CampaignProductGrid";
import { CampaignHowItWorks } from "@/components/campaign/CampaignHowItWorks";
import { CampaignGiftGuide } from "@/components/campaign/CampaignGiftGuide";
import { CampaignOfferBanner } from "@/components/campaign/CampaignOfferBanner";
import { CampaignTrustSection } from "@/components/campaign/CampaignTrustSection";
import { CampaignFinalCTA } from "@/components/campaign/CampaignFinalCTA";

interface CampaignViewProps {
  campaign: CampaignData;
  trendingProducts: CatalogProduct[];
}

export function CampaignView({
  campaign,
  trendingProducts,
}: CampaignViewProps) {
  return (
    <main className="min-h-screen bg-[#F6F7FB]">
      {/* 1. Hero Banner */}
      <CampaignHero campaign={campaign} />

      {/* 2. Shop by Category */}
      <CampaignCategoryGrid
        categories={campaign.categories}
        theme={campaign.theme}
      />

      {/* 3. Trending This Season */}
      <CampaignProductGrid
        products={trendingProducts}
        title="Trending This Season"
        subtitle="Explore the most loved personalized gifts with exclusive festival discounts."
      />

      {/* 4. Personalized Gift Section: Make It Truly Yours (4 Steps) */}
      <CampaignHowItWorks primaryCtaHref={campaign.finalCta.primaryHref} />

      {/* 5. Occasion / Recipient Gift Guide */}
      <CampaignGiftGuide
        title={campaign.giftGuideTitle}
        subtitle={campaign.giftGuideSubtitle}
        items={campaign.giftGuide}
      />

      {/* 6. Mid-Page Campaign Offer Banner */}
      <CampaignOfferBanner
        headline={campaign.offerBanner.headline}
        subheadline={campaign.offerBanner.subheadline}
        discount={campaign.offerBanner.discount}
        code={campaign.offerBanner.code}
        startingPrice={campaign.offerBanner.startingPrice}
        cta={campaign.offerBanner.cta}
        href={campaign.offerBanner.href}
        theme={campaign.theme}
      />

      {/* 7. Trust Section */}
      <CampaignTrustSection />

      {/* 8. Final CTA */}
      <CampaignFinalCTA
        headline={campaign.finalCta.headline}
        subheadline={campaign.finalCta.subheadline}
        primaryCta={campaign.finalCta.primaryCta}
        primaryHref={campaign.finalCta.primaryHref}
        secondaryCta={campaign.finalCta.secondaryCta}
        secondaryHref={campaign.finalCta.secondaryHref}
        theme={campaign.theme}
      />
    </main>
  );
}
