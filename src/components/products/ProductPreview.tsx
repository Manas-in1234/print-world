import type { ProductPlaceholder } from "@/types/product";
import type { ProductImageSource } from "@/lib/images/product-image";
import { ProductMockup } from "@/components/products/ProductMockup";
import { ClockPreview } from "@/components/products/ClockPreview";
import Image from "next/image";
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
      <Image
        src={source.storageUrl}
        alt={source.alt}
        fill
        className={cn("object-cover", className)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
      />
    );
  }

  if (source.type === "local" && source.localUrl) {
    return (
      <Image
        src={source.localUrl}
        alt={source.alt}
        fill
        className={cn("object-contain p-4", className)}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={priority}
        unoptimized={source.localUrl.endsWith(".svg")}
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
