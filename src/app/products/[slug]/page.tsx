import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/catalog/products";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Container } from "@/components/ui/Container";
import { ProductPreview } from "@/components/products/ProductPreview";
import { ProductDetailActions } from "@/components/products/ProductDetailActions";
import { ProductCard } from "@/components/products/ProductCard";
import { resolveProductImage } from "@/lib/images/product-image";
import { formatPrice } from "@/lib/format-price";

export const dynamic = "force-dynamic";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ shape?: string }>;
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.name} — Print World`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
    },
  };
}

export default async function ProductPage({ params, searchParams }: ProductPageProps) {
  const { slug } = await params;
  const { shape } = await searchParams;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const { data: allProducts } = await getProducts();
  const related = allProducts.filter((p) => p.slug !== slug).slice(0, 3);

  const imageSource = resolveProductImage(
    product.imageKey,
    product.images[0]?.url,
    product.name,
    product.slug,
  );

  return (
    <>
      <Navbar />
      <main id="main-content" className="flex-1 py-12 sm:py-16">
        <Container>
          <Link
            href="/products"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4" aria-hidden="true">
              <path fillRule="evenodd" d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z" clipRule="evenodd" />
            </svg>
            Back to products
          </Link>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div>
              <div className="relative aspect-square overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-surface to-background shadow-soft">
                <ProductPreview
                  imageKey={product.imageKey}
                  imageSource={imageSource}
                  priority
                />
              </div>
              {product.images.length > 1 && (
                <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
                  {product.images.map((img) => (
                    <div key={img.id} className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg border border-card-border bg-card">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={img.url} alt={img.altText ?? product.name} className="h-full w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex flex-col justify-center">
              <p className="text-sm font-medium uppercase tracking-[0.2em] text-accent capitalize">
                {product.category}
              </p>
              <h1 className="mt-2 font-display text-3xl font-semibold text-foreground sm:text-4xl">
                {product.name}
              </h1>
              <p className="mt-2 text-lg font-semibold">
                Starting {formatPrice(product.startingPrice, product.currency)}
              </p>
              <p className="mt-4 text-base leading-relaxed text-muted">
                {product.description}
              </p>
              {product.shapes.length > 0 && (
                <p className="mt-3 text-sm text-muted">
                  Available in {product.shapes.length} shape{product.shapes.length > 1 ? "s" : ""}:{" "}
                  {product.shapes.map((s) => s.name).join(", ")}
                </p>
              )}
              <div className="mt-8">
                <ProductDetailActions
                  product={product}
                  initialShapeSlug={shape}
                />
              </div>
            </div>
          </div>

          {related.length > 0 && (
            <section className="mt-16 border-t border-card-border pt-16">
              <h2 className="font-display text-2xl font-semibold text-foreground">You May Also Like</h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </section>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}
