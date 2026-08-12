import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProductGrid } from "@/components/home/ProductGrid";
import { DesignSteps } from "@/components/home/DesignSteps";
import { CustomizationPromo } from "@/components/home/CustomizationPromo";
import { ClockCollection } from "@/components/home/ClockCollection";
import { AIStudioSection } from "@/components/home/AIStudioSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { BusinessSection } from "@/components/home/BusinessSection";
import { TrustSection } from "@/components/home/TrustSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getHomepageData } from "@/lib/catalog/homepage-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { hero, products, allProducts, productsError, shapes } = await getHomepageData();

  const clockProduct = allProducts.find((p) => p.slug === "custom-clock");
  const clockStorageUrl = clockProduct?.images[0]?.url ?? null;
  const clockProductId = clockProduct?.id ?? "";
  const clockBasePrice = clockProduct?.startingPrice ?? 799;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <Hero hero={hero} />
        <ProductGrid id="products" products={products} error={productsError} />
        <CustomizationPromo />
        <ClockCollection
          shapes={shapes.clock}
          productStorageUrl={clockStorageUrl}
          productId={clockProductId}
          basePrice={clockBasePrice}
        />
        <AIStudioSection />
        <BusinessSection />
        <FeatureSection />
        <DesignSteps />
        <TrustSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
