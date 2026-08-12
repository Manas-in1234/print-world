import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { ProductCategorySection } from "@/components/home/ProductCategorySection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { DesignSteps } from "@/components/home/DesignSteps";
import { CustomizationPromo } from "@/components/home/CustomizationPromo";
import { ProductCollections } from "@/components/home/ProductCollections";
import { AcrylicCollection } from "@/components/home/AcrylicCollection";
import { ShapeExplorer } from "@/components/home/ShapeExplorer";
import { ClockCollection } from "@/components/home/ClockCollection";
import { AIStudioSection } from "@/components/home/AIStudioSection";
import { FeatureSection } from "@/components/home/FeatureSection";
import { BusinessSection } from "@/components/home/BusinessSection";
import { InspirationSection } from "@/components/home/InspirationSection";
import { FinalCTA } from "@/components/home/FinalCTA";
import { getHomepageData } from "@/lib/catalog/homepage-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { hero, products, productsError, shapes } = await getHomepageData();

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 overflow-x-hidden">
        <Hero hero={hero} />
        <ProductCategorySection />
        <ProductGrid id="products" products={products} error={productsError} />
        <DesignSteps />
        <CustomizationPromo />
        <ProductCollections />
        <AcrylicCollection shapes={shapes.acrylic} />
        <ShapeExplorer shapes={shapes.explore} />
        <ClockCollection shapes={shapes.clock} />
        <AIStudioSection />
        <FeatureSection />
        <BusinessSection />
        <InspirationSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
