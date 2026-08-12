"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/cn";

interface ProductPreviewImageProps {
  src: string;
  fallbackSrc?: string;
  alt: string;
  className?: string;
  priority?: boolean;
  objectFit?: "cover" | "contain";
}

export function ProductPreviewImage({
  src,
  fallbackSrc,
  alt,
  className,
  priority = false,
  objectFit = "cover",
}: ProductPreviewImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);
  const [failed, setFailed] = useState(false);

  if (failed && !fallbackSrc) {
    return null;
  }

  const displaySrc = failed && fallbackSrc ? fallbackSrc : currentSrc;
  const isSvg = displaySrc.endsWith(".svg");

  return (
    <Image
      src={displaySrc}
      alt={alt}
      fill
      className={cn(
        objectFit === "contain" ? "object-contain p-2 sm:p-4" : "object-cover",
        className,
      )}
      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
      priority={priority}
      unoptimized={isSvg}
      onError={() => {
        if (fallbackSrc && currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        } else {
          setFailed(true);
        }
      }}
    />
  );
}
