import { Suspense } from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCatalog } from "@/components/products/ProductCatalog";
import { loadCatalogFromApi } from "@/lib/catalog/load-catalog-api";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "All Products | Print World",
  description: "Browse our full collection of premium personalized printing products.",
};

export default async function ProductsPage() {
  const catalog = await loadCatalogFromApi({});

  const queryError = catalog.error;

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
          {!catalog.configured && catalog.error && (
            <p className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
              {catalog.error}
            </p>
          )}
          {queryError && catalog.configured && (
            <p className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800" role="alert">
              Could not load products from Supabase: {queryError}
              {queryError.includes("infinite recursion") && (
                <span className="mt-2 block">
                  Run <code className="rounded bg-red-100 px-1">supabase/fix_rls_recursion.sql</code> in the Supabase SQL Editor.
                </span>
              )}
            </p>
          )}
          <Suspense fallback={<div className="py-12 text-center text-sm text-muted">Loading catalog...</div>}>
            <ProductCatalog
              products={catalog.products}
              categories={catalog.categories}
              queryError={queryError}
            />
          </Suspense>
        </Container>
      </main>
      <Footer />
    </>
  );
}
