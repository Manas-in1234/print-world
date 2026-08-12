import type { ProductPlaceholder } from "@/types/product";
import type { ProductImageSource } from "@/lib/images/product-image";
import { ProductMockup } from "@/components/products/ProductMockup";
import { ClockPreview } from "@/components/products/ClockPreview";
import { ProductPreviewImage } from "@/components/products/ProductPreviewImage";
import { cn } from "@/lib/cn";

interface ProductPreviewProps {
  imageKey: ProductPlaceholder;
  imageSource?: ProductImageSource;
  className?: string;
  priority?: boolean;
}

export function ProductPreview({
  imageKey,
  imageSource,
  className,
  priority = false,
}: ProductPreviewProps) {
  const source = imageSource ?? {
    type: "mockup" as const,
    mockupKey: imageKey,
    alt: "Product preview",
  };

  if (source.type === "storage" && source.storageUrl) {
    return (
      <ProductPreviewImage
        src={source.storageUrl}
        alt={source.alt}
        className={className}
        priority={priority}
        objectFit="cover"
      />
    );
  }

  if (source.type === "local" && source.localUrl) {
    return (
      <ProductPreviewImage
        src={source.localUrl}
        fallbackSrc={source.fallbackUrl}
        alt={source.alt}
        className={className}
        priority={priority}
        objectFit="cover"
      />
    );
  }

  const key = source.mockupKey ?? imageKey;
  const isClock = key === "clock";

  return (
    <div className={cn("relative h-full w-full", className)}>
      {isClock ? <ClockPreview /> : <ProductMockup type={key} />}
    </div>
  );
}
