"use client";

import type { ProductEditorConfig } from "@/lib/editor/product-configs";
import type { DesignLayer } from "@/lib/editor/types";
import { getClockShapeClipClass, layerOpacity } from "@/lib/editor/layer-utils";
import { toClockShapeId } from "@/data/clock-shapes";
import { cn } from "@/lib/cn";

interface EditorLayerViewProps {
  layer: DesignLayer;
  selected: boolean;
  config: ProductEditorConfig;
  shapeSlug?: string;
  previewKey?: string | null;
  onSelect: () => void;
  onDragEnd: (id: string, x: number, y: number) => void;
  onCropDrag: (id: string, cropX: number, cropY: number) => void;
}

export function EditorLayerView({
  layer,
  selected,
  config,
  shapeSlug,
  previewKey,
  onSelect,
  onDragEnd,
  onCropDrag,
}: EditorLayerViewProps) {
  const opacity = layerOpacity(layer) / 100;
  const clockShapeId =
    config.previewType === "clock" ? toClockShapeId(shapeSlug ?? "", previewKey) : null;
  const shapeClipClass = clockShapeId ? getClockShapeClipClass(clockShapeId) : undefined;

  const fitMode = layer.crop?.fitMode ?? "fit";
  const cropScale = layer.crop?.cropScale ?? 1;
  const cropX = layer.crop?.cropX ?? 0;
  const cropY = layer.crop?.cropY ?? 0;
  const cropActive = layer.crop?.cropActive ?? false;

  return (
    <div
      className={cn(
        "absolute touch-none",
        cropActive ? "cursor-crosshair" : "cursor-move",
        selected ? "ring-2 ring-accent ring-offset-1" : "ring-1 ring-transparent",
      )}
      style={{
        left: `${layer.x}%`,
        top: `${layer.y}%`,
        width: `${layer.width}%`,
        height: `${layer.height}%`,
        transform: `rotate(${layer.rotation}deg)`,
        zIndex: layer.zIndex + 10,
        opacity,
      }}
      onClick={(e) => {
        e.stopPropagation();
        onSelect();
      }}
      onPointerDown={(e) => {
        e.preventDefault();
        e.stopPropagation();
        onSelect();

        const startX = e.clientX;
        const startY = e.clientY;
        const origX = layer.x;
        const origY = layer.y;
        const origCropX = cropX;
        const origCropY = cropY;
        const isCropDrag = cropActive && layer.type === "image";
        const el = e.currentTarget as HTMLElement;

        let frame = 0;
        let pendingX = origX;
        let pendingY = origY;
        let pendingCropX = origCropX;
        let pendingCropY = origCropY;

        const onMove = (ev: PointerEvent) => {
          const dx = ((ev.clientX - startX) / 400) * 100;
          const dy = ((ev.clientY - startY) / 400) * 100;

          if (isCropDrag) {
            pendingCropX = Math.max(-50, Math.min(50, origCropX + dx));
            pendingCropY = Math.max(-50, Math.min(50, origCropY + dy));
          } else {
            pendingX = origX + dx;
            pendingY = origY + dy;
          }

          if (frame) return;
          frame = requestAnimationFrame(() => {
            frame = 0;
            if (isCropDrag) {
              const img = el.querySelector<HTMLElement>("[data-crop-inner]");
              if (img) {
                img.style.transform = `translate(${pendingCropX}%, ${pendingCropY}%) scale(${cropScale})`;
              }
            } else {
              el.style.left = `${pendingX}%`;
              el.style.top = `${pendingY}%`;
            }
          });
        };

        const onUp = () => {
          if (frame) cancelAnimationFrame(frame);
          window.removeEventListener("pointermove", onMove);
          window.removeEventListener("pointerup", onUp);
          if (isCropDrag) {
            onCropDrag(layer.id, pendingCropX, pendingCropY);
          } else {
            onDragEnd(layer.id, pendingX, pendingY);
          }
        };

        window.addEventListener("pointermove", onMove);
        window.addEventListener("pointerup", onUp);
      }}
    >
      <div
        className={cn("relative h-full w-full overflow-hidden", layer.type === "image" && shapeClipClass)}
      >
        {layer.type === "text" ? (
          <p
            className="h-full w-full break-words"
            style={{
              fontFamily: layer.fontFamily,
              fontSize: layer.fontSize,
              color: layer.color,
              fontWeight: layer.bold ? "bold" : "normal",
              fontStyle: layer.italic ? "italic" : "normal",
              textAlign: layer.align,
            }}
          >
            {layer.content}
          </p>
        ) : layer.src ? (
          <div className="relative h-full w-full overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={layer.src}
              alt=""
              data-crop-inner
              className="pointer-events-none h-full w-full"
              style={{
                objectFit: fitMode === "fill" ? "cover" : "contain",
                transform: `translate(${cropX}%, ${cropY}%) scale(${cropScale})`,
                transformOrigin: "center center",
              }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
