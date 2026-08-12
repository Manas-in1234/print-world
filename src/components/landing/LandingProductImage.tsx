"use client";

import { useState } from "react";
import Image from "next/image";
import type { ResolvedLandingImage } from "@/lib/images/resolve-landing-image";
import { ProductPreview } from "@/components/products/ProductPreview";
import { ProductMockup } from "@/components/products/ProductMockup";
import { ClockPreview } from "@/components/products/ClockPreview";
import { cn } from "@/lib/cn";

interface LandingProductImageProps {
  resolved: ResolvedLandingImage;
  priority?: boolean;
  className?: string;
  sizes?: string;
  objectFit?: "cover" | "contain";
}

/** Landing hero/card image — storage → local JPG → ProductPreview mockup. */
export function LandingProductImage({
  resolved,
  priority = false,
  className,
  sizes = "(max-width: 1024px) 100vw, 50vw",
  objectFit = "cover",
}: LandingProductImageProps) {
  if (resolved.mode === "mockup") {
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
    <ImageWithErrorFallback
      src={src}
      fallbackSrc={resolved.localFallbackUrl ?? undefined}
      alt={resolved.alt}
      priority={priority}
      sizes={sizes}
      objectFit={objectFit}
      className={className}
      mockupKey={resolved.imageKey}
    />
  );
}

function ImageWithErrorFallback({
  src,
  fallbackSrc,
  alt,
  priority,
  sizes,
  objectFit,
  className,
  mockupKey,
}: {
  src: string;
  fallbackSrc?: string;
  alt: string;
  priority: boolean;
  sizes: string;
  objectFit: "cover" | "contain";
  className?: string;
  mockupKey: ResolvedLandingImage["imageKey"];
}) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [useMockup, setUseMockup] = useState(false);

  if (useMockup) {
    return (
      <div className={cn("relative h-full w-full", className)}>
        {mockupKey === "clock" ? <ClockPreview /> : <ProductMockup type={mockupKey} />}
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
