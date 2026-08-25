import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ShopByCategory } from "@/components/home/ShopByCategory";
import { TrendingProducts } from "@/components/home/TrendingProducts";
import { PersonalizedGifts } from "@/components/home/PersonalizedGifts";
import { ShopByOccasion } from "@/components/home/ShopByOccasion";
import { FeaturedCollections } from "@/components/home/FeaturedCollections";
import { DealsSection } from "@/components/home/DealsSection";
import { HowItWorks } from "@/components/home/HowItWorks";
import { CorporateBulkOrders } from "@/components/home/CorporateBulkOrders";
import { AIStudioPromo } from "@/components/home/AIStudioPromo";
import { WhyPrintWorld } from "@/components/home/WhyPrintWorld";
import { TrustBenefitsStrip } from "@/components/home/TrustBenefitsStrip";
import { CelebrateOccasionsCarousel } from "@/components/home/CelebrateOccasionsCarousel";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getHomepageData } from "@/lib/catalog/homepage-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { products, productsError } = await getHomepageData();

  return (
    <>
      {/* 1. Header with Trust Bar, Main Purple Row, and Category Navigation */}
      <Navbar />

      <main id="main-content" className="flex-1 overflow-x-hidden bg-white">
        {/* 2. Static Premium Hero — Matching Reference Design */}
        <Hero />

        {/* 3. Festive Collections & Special Offers (Diwali, Rakhi, Wedding) */}
        <CelebrateOccasionsCarousel />

        {/* 4. Shop by Category */}
        <ShopByCategory />

        {/* 5. Trending Now */}
        <TrendingProducts products={products} error={productsError} />

        {/* 6. Personalized Gifts ("Made Personal. Made Special.") */}
        <PersonalizedGifts />

        {/* 7. Shop by Occasion */}
        <ShopByOccasion />

        {/* 8. Featured Collections (3-Column Feature Cards) */}
        <FeaturedCollections />

        {/* 9. Deals / Budget Store (Under ₹299 / ₹499 / ₹799 / ₹999) */}
        <DealsSection />

        {/* 10. How It Works */}
        <HowItWorks />

        {/* 11. Corporate & Bulk Orders */}
        <CorporateBulkOrders />

        {/* 12. AI Studio Promo */}
        <AIStudioPromo />

        {/* 13. Why Print World */}
        <WhyPrintWorld />

        {/* 14. Trust & Benefits Strip */}
        <TrustBenefitsStrip />

        {/* 15. Final CTA ("Your Idea Deserves to Be Printed.") */}
        <FinalCTA />
      </main>

      {/* 16. Footer */}
      <Footer />
    </>
  );
}
