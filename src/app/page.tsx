import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { CategorySection } from "@/components/home/CategorySection";
import { ProductGrid } from "@/components/home/ProductGrid";
import { AcrylicCollection } from "@/components/home/AcrylicCollection";
import { ShapeExplorer } from "@/components/home/ShapeExplorer";
import { ClockCollection } from "@/components/home/ClockCollection";
import { AIStudioSection } from "@/components/home/AIStudioSection";
import { DesignSteps } from "@/components/home/DesignSteps";
import { FeatureSection } from "@/components/home/FeatureSection";
import { getHomepageData } from "@/lib/catalog/homepage-data";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { hero, products, productsError, shapes } = await getHomepageData();

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1">
        <Hero hero={hero} />
        <CategorySection />
        <ProductGrid id="products" products={products} error={productsError} />
        <AcrylicCollection shapes={shapes.acrylic} />
        <ShapeExplorer shapes={shapes.explore} />
        <ClockCollection shapes={shapes.clock} />
        <AIStudioSection />
        <DesignSteps />
        <FeatureSection />
      </main>
      <Footer />
    </>
  );
}
