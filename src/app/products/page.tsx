import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { getProducts, getCategories } from "@/lib/catalog/products";
import { SUPABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/supabase/env";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const [productsResult, categoriesResult] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  const queryError = productsResult.error ?? categoriesResult.error;

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Catalog"
            title="All Products"
            description="Browse our full collection of premium personalized printing products."
            align="left"
            className="mb-8"
          />
          {!productsResult.configured && (
            <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {SUPABASE_NOT_CONFIGURED_MESSAGE} Redeploy after adding variables in Vercel.
            </p>
          )}
          {queryError && (
            <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              Could not load products from Supabase: {queryError}
              {queryError.includes("infinite recursion") && (
                <span className="mt-2 block">
                  Run <code className="rounded bg-red-100 px-1">supabase/fix_rls_recursion.sql</code> in the Supabase SQL Editor.
                </span>
              )}
            </p>
          )}
          <ProductCatalog
            products={productsResult.data}
            categories={categoriesResult.data.map((c) => ({ slug: c.slug, name: c.name }))}
            queryError={queryError}
          />
        </Container>
      </main>
      <Footer />
    </>
  );
}
