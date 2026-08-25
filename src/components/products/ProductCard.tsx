import Link from "next/link";
import type { CatalogProduct } from "@/lib/catalog/mappers";
import { Button } from "@/components/ui/Button";
import { AddToCartButton } from "@/components/products/AddToCartButton";
import { ProductPreview } from "@/components/products/ProductPreview";
import { formatPrice } from "@/lib/format-price";
import { resolveProductImage } from "@/lib/images/product-image";
import { cn } from "@/lib/cn";

interface ProductCardProps {
  product: CatalogProduct;
  badge?: string;
}

export function ProductCard({ product, badge }: ProductCardProps) {
  const imageSource = resolveProductImage(
    product.imageKey,
    product.images[0]?.url,
    product.name,
    product.slug,
  );
  const isClock = product.imageKey === "clock";

  // Calculate an optional realistic original price for visual discount display
  const originalPrice = Math.round(product.startingPrice * 1.25);
  const displayBadge = badge || (product.startingPrice <= 499 ? "Bestseller" : "Popular");

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[#E5007D]/40 hover:shadow-md h-full">
      <Link
        href={`/products/${product.slug}`}
        className={cn(
          "relative aspect-[4/3] w-full overflow-hidden bg-gray-50",
          isClock && "bg-gradient-to-br from-neutral-50 via-white to-purple-50/20",
        )}
      >
        <ProductPreview imageKey={product.imageKey} imageSource={imageSource} />
        
        {/* Badge */}
        <span className="absolute left-2.5 top-2.5 rounded-md bg-[#E5007D] px-2 py-0.5 text-[10px] font-bold tracking-wide text-white shadow-xs">
          {displayBadge}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-4 sm:p-5">
        <Link href={`/products/${product.slug}`} className="group-hover:text-[#E5007D] transition-colors">
          <h3 className="font-display text-base sm:text-lg font-bold text-gray-900 line-clamp-1">
            {product.name}
          </h3>
        </Link>

        <p className="mt-1 flex-1 text-xs leading-relaxed text-gray-500 line-clamp-2">
          {product.shortDescription}
        </p>

        {/* Pricing with Rupee and strike-through */}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="text-base sm:text-lg font-extrabold text-gray-950">
            {formatPrice(product.startingPrice, product.currency)}
          </span>
          <span className="text-xs text-gray-400 line-through">
            ₹{originalPrice}
          </span>
          <span className="text-xs font-bold text-emerald-600">
            20% OFF
          </span>
        </div>

        {/* Action Controls: Add to Cart + Customize */}
        <div className="mt-4 flex items-center gap-1.5 pt-3 border-t border-gray-100">
          <AddToCartButton
            product={product}
            className="flex-1 whitespace-nowrap px-2.5 py-1.5 text-xs font-bold text-gray-800 hover:text-[#E5007D] hover:bg-pink-50 border border-gray-200 rounded-lg transition-colors"
          />
          <Button
            href={`/customize/${product.slug}`}
            variant="secondary"
            size="xs"
            className="whitespace-nowrap px-2.5 py-1.5 text-xs font-bold shrink-0 rounded-lg hover:border-[#6C2BD9] hover:text-[#6C2BD9]"
          >
            Customize
          </Button>
        </div>
      </div>
    </article>
  );
}
