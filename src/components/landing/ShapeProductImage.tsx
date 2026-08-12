"use client";

import { useState } from "react";
import Image from "next/image";
import type { ResolvedShapeImage } from "@/lib/images/product-shape-images";
import { ProductPreview } from "@/components/products/ProductPreview";
import { ProductMockup } from "@/components/products/ProductMockup";
import { ClockShapePreview } from "@/components/products/ClockShapePreview";
import { cn } from "@/lib/cn";

interface ShapeProductImageProps {
  resolved: ResolvedShapeImage;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: "cover" | "contain";
}

/** Shape-aware product image — storage → local shape/main → mockup preview. */
export function ShapeProductImage({
  resolved,
  priority = false,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  objectFit = "cover",
}: ShapeProductImageProps) {
  if (resolved.useMockup || resolved.mode === "mockup") {
    return (
      <ProductPreview
        imageKey={resolved.imageKey}
        imageSource={resolved.imageSource}
        priority={priority}
        className={className}
      />
    );
  }

  const src =
    resolved.mode === "storage" && resolved.storageUrl
      ? resolved.storageUrl
      : resolved.localImageUrl;

  if (!src) {
    return (
      <ProductPreview
        imageKey={resolved.imageKey}
        imageSource={resolved.imageSource}
        priority={priority}
        className={className}
      />
    );
  }

  return (
    <ShapeImageWithFallback
      key={src}
      src={src}
      fallbackSrc={resolved.localFallbackUrl ?? undefined}
      alt={resolved.alt}
      priority={priority}
      sizes={sizes}
      objectFit={objectFit}
      className={className}
      imageKey={resolved.imageKey}
      clockShapeId={resolved.clockShapeId}
    />
  );
}

function ShapeImageWithFallback({
  src,
  fallbackSrc,
  alt,
  priority,
  sizes,
  objectFit,
  className,
  imageKey,
  clockShapeId,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  priority: boolean;
  sizes: string;
  objectFit: "cover" | "contain";
  className?: string;
  imageKey: ResolvedShapeImage["imageKey"];
  clockShapeId?: ResolvedShapeImage["clockShapeId"];
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [useMockup, setUseMockup] = useState(false);

  if (useMockup) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        {imageKey === "clock" && clockShapeId ? (
          <ClockShapePreview shape={clockShapeId} />
        ) : imageKey === "clock" ? (
          <ClockShapePreview shape="round" />
        ) : (
          <ProductMockup type={imageKey} />
        )}
      </div>
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      fill
      priority={priority}
      sizes={sizes}
      loading={priority ? undefined : "lazy"}
      className={cn(
        objectFit === "contain" ? "object-contain p-2 sm:p-4" : "object-cover",
        className,
      )}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setUseMockup(true);
        }
      }}
    />
  );
}

/** Compact thumbnail for shape selectors. */
export function ShapeThumbnail({
  resolved,
  selected,
  label,
  onClick,
}: {
  resolved: ResolvedShapeImage;
  selected: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      aria-label={`Select ${label} shape`}
      className={cn(
        "relative h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 bg-surface transition-all sm:h-20 sm:w-20",
        selected ? "border-foreground ring-2 ring-accent/30" : "border-card-border hover:border-accent",
      )}
    >
      <ShapeProductImage resolved={resolved} sizes="80px" objectFit="cover" />
    </button>
  );
}
