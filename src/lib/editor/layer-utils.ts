import type { ClockShapeId } from "@/data/clock-shapes";
import type { DesignLayer, DesignState, ImageCropSettings, ImageFitMode } from "@/lib/editor/types";

/** Legacy designs stored pixel sizes on a ~400px canvas. */
const LEGACY_CANVAS_PX = 400;

export function defaultCropSettings(): ImageCropSettings {
  return {
    fitMode: "fit",
    cropX: 0,
    cropY: 0,
    cropScale: 1,
    cropActive: false,
  };
}

export function normalizeLayer(layer: DesignLayer): DesignLayer {
  const normalized: DesignLayer = {
    ...layer,
    opacity: layer.opacity ?? 100,
    aspectLocked: layer.aspectLocked ?? true,
  };

  if (normalized.width > 100) {
    normalized.width = Math.min(100, Math.round((normalized.width / LEGACY_CANVAS_PX) * 100));
  }
  if (normalized.height > 100) {
    normalized.height = Math.min(100, Math.round((normalized.height / LEGACY_CANVAS_PX) * 100));
  }

  if (normalized.type === "image") {
    normalized.crop = {
      ...defaultCropSettings(),
      ...normalized.crop,
    };
    if (!normalized.originalSrc && normalized.src) {
      normalized.originalSrc = normalized.src;
    }
  }

  return normalized;
}

export function normalizeDesignState(design: DesignState): DesignState {
  return {
    ...design,
    layers: design.layers.map(normalizeLayer),
  };
}

export function layerOpacity(layer: DesignLayer): number {
  return layer.opacity ?? 100;
}

export function getImageFitMode(layer: DesignLayer): ImageFitMode {
  return layer.crop?.fitMode ?? "fit";
}

export function applyFit(layer: DesignLayer): DesignLayer {
  if (layer.type !== "image") return layer;
  return {
    ...layer,
    crop: {
      ...defaultCropSettings(),
      ...layer.crop,
      fitMode: "fit",
      cropActive: false,
      cropX: 0,
      cropY: 0,
      cropScale: 1,
    },
  };
}

export function applyFill(layer: DesignLayer): DesignLayer {
  if (layer.type !== "image") return layer;
  return {
    ...layer,
    crop: {
      ...defaultCropSettings(),
      ...layer.crop,
      fitMode: "fill",
      cropActive: false,
    },
  };
}

export function centerCrop(layer: DesignLayer): DesignLayer {
  if (layer.type !== "image") return layer;
  return {
    ...layer,
    x: 50 - layer.width / 2,
    y: 50 - layer.height / 2,
    crop: {
      ...defaultCropSettings(),
      ...layer.crop,
      cropX: 0,
      cropY: 0,
    },
  };
}

export function resetCrop(layer: DesignLayer): DesignLayer {
  if (layer.type !== "image") return layer;
  return {
    ...layer,
    src: layer.originalSrc ?? layer.src,
    crop: defaultCropSettings(),
  };
}

export function toggleCropMode(layer: DesignLayer): DesignLayer {
  if (layer.type !== "image") return layer;
  const crop = { ...defaultCropSettings(), ...layer.crop };
  return {
    ...layer,
    crop: { ...crop, cropActive: !crop.cropActive },
  };
}

export function updateLayerSize(
  layer: DesignLayer,
  dimension: "width" | "height",
  value: number,
  aspectLocked: boolean,
): DesignLayer {
  const next = { ...layer, [dimension]: value };
  if (!aspectLocked || layer.width <= 0 || layer.height <= 0) return next;

  const ratio = layer.width / layer.height;
  if (dimension === "width") {
    next.height = Math.min(100, Math.max(5, Math.round(value / ratio)));
  } else {
    next.width = Math.min(100, Math.max(5, Math.round(value * ratio)));
  }
  return next;
}

export function getClockShapeClipClass(shapeId: ClockShapeId | null): string | undefined {
  if (!shapeId) return undefined;
  const classes: Record<ClockShapeId, string> = {
    round: "rounded-full",
    square: "rounded-xl",
    rectangle: "rounded-lg",
    oval: "rounded-[50%]",
    rhombus: "[clip-path:polygon(50%_5%,95%_50%,50%_95%,5%_50%)]",
    heart: "clip-heart",
    custom: "rounded-2xl border border-dashed border-accent/30",
  };
  return classes[shapeId];
}
