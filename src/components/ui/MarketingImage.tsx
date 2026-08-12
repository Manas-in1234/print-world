"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface MarketingImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  fill?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

/** Local marketing image with automatic fallback — never shows a broken image. */
export function MarketingImage({
  src,
  fallbackSrc,
  alt,
  fill = true,
  width,
  height,
  className,
  sizes = "50vw",
  priority = false,
  objectFit = "cover",
}: MarketingImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [exhausted, setExhausted] = useState(false);

  if (exhausted) {
    return (
      <div
        className={cn(
          "flex h-full w-full items-center justify-center bg-gradient-to-br from-surface to-background text-xs text-muted",
          className,
        )}
        aria-hidden="true"
      >
        {alt}
      </div>
    );
  }

  const fitClass = objectFit === "contain" ? "object-contain" : "object-cover";

  if (fill) {
    return (
      <Image
        src={currentSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        loading={priority ? undefined : "lazy"}
        className={cn(fitClass, className)}
        onError={() => {
          if (fallbackSrc && currentSrc !== fallbackSrc) {
            setCurrentSrc(fallbackSrc);
          } else {
            setExhausted(true);
          }
        }}
      />
    );
  }

  return (
    <Image
      src={currentSrc}
      alt={alt}
      width={width ?? 400}
      height={height ?? 300}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      className={cn(fitClass, className)}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setExhausted(true);
        }
      }}
    />
  );
}
