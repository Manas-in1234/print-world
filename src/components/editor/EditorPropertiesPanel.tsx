"use client";

import { FONT_OPTIONS, type DesignLayer } from "@/lib/editor/types";
import {
  applyFill,
  applyFit,
  centerCrop,
  layerOpacity,
  resetCrop,
  toggleCropMode,
  updateLayerSize,
} from "@/lib/editor/layer-utils";
import { cn } from "@/lib/cn";

interface EditorPropertiesPanelProps {
  selectedLayer: DesignLayer | undefined;
  onPatch: (id: string, patch: Partial<DesignLayer>, trackHistory?: boolean) => void;
  onReplaceLayer: (id: string, layer: DesignLayer, trackHistory?: boolean) => void;
  onSliderStart: () => void;
  unitPrice: string;
  onSave: () => void;
  onAddToCart: () => void;
  saveMsg: string | null;
}

export function EditorPropertiesPanel({
  selectedLayer,
  onPatch,
  onReplaceLayer,
  onSliderStart,
  unitPrice,
  onSave,
  onAddToCart,
  saveMsg,
}: EditorPropertiesPanelProps) {
  const disabled = !selectedLayer;

  return (
    <aside className="order-3 space-y-5 rounded-2xl border border-card-border bg-card p-4 shadow-soft lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
      <h2 className="font-display text-lg font-semibold tracking-tight">Properties</h2>

      {!selectedLayer ? (
        <p className="rounded-xl border border-dashed border-card-border bg-surface/50 px-4 py-8 text-center text-sm text-muted">
          Select a layer to edit
        </p>
      ) : (
        <div className="space-y-4">
          <TransformSliders
            layer={selectedLayer}
            disabled={disabled}
            onPatch={onPatch}
            onSliderStart={onSliderStart}
            onReplaceLayer={onReplaceLayer}
          />

          {selectedLayer.type === "text" && (
            <TextControls layer={selectedLayer} onPatch={onPatch} onSliderStart={onSliderStart} />
          )}

          {selectedLayer.type === "image" && (
            <ImageControls
              layer={selectedLayer}
              onPatch={onPatch}
              onReplaceLayer={onReplaceLayer}
              onSliderStart={onSliderStart}
            />
          )}
        </div>
      )}

      <div className="space-y-2 border-t border-card-border pt-4">
        <p className="text-lg font-semibold">{unitPrice}</p>
        <button
          type="button"
          onClick={onSave}
          className="w-full rounded-xl border border-card-border bg-background px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent"
        >
          Save Design
        </button>
        <button
          type="button"
          onClick={onAddToCart}
          className="w-full rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-background transition-colors hover:bg-accent-hover"
        >
          Add to Cart
        </button>
        {saveMsg && <p className="text-xs text-accent">{saveMsg}</p>}
      </div>
    </aside>
  );
}

function TransformSliders({
  layer,
  disabled,
  onPatch,
  onReplaceLayer,
  onSliderStart,
}: {
  layer: DesignLayer;
  disabled: boolean;
  onPatch: EditorPropertiesPanelProps["onPatch"];
  onReplaceLayer: EditorPropertiesPanelProps["onReplaceLayer"];
  onSliderStart: () => void;
}) {
  const opacity = layerOpacity(layer);
  const locked = layer.aspectLocked ?? true;

  return (
    <div className="space-y-3 rounded-xl border border-card-border/80 bg-surface/30 p-3">
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs font-medium uppercase tracking-wide text-muted">Transform</span>
        <button
          type="button"
          disabled={disabled}
          onClick={() => onPatch(layer.id, { aspectLocked: !locked }, true)}
          className={cn(
            "rounded-lg border px-2 py-1 text-[10px] font-medium uppercase tracking-wide transition-colors",
            locked ? "border-accent/40 bg-accent/10 text-foreground" : "border-card-border text-muted",
          )}
          aria-pressed={locked}
          aria-label={locked ? "Aspect ratio locked" : "Aspect ratio unlocked"}
        >
          {locked ? "Lock" : "Unlock"}
        </button>
      </div>

      <PropertySlider
        label="Width"
        value={layer.width}
        min={5}
        max={100}
        unit="%"
        disabled={disabled}
        onStart={onSliderStart}
        onChange={(v) =>
          onReplaceLayer(
            layer.id,
            updateLayerSize(layer, "width", v, locked),
            false,
          )
        }
      />
      <PropertySlider
        label="Height"
        value={layer.height}
        min={5}
        max={100}
        unit="%"
        disabled={disabled}
        onStart={onSliderStart}
        onChange={(v) =>
          onReplaceLayer(
            layer.id,
            updateLayerSize(layer, "height", v, locked),
            false,
          )
        }
      />
      <PropertySlider
        label="Rotation"
        value={layer.rotation}
        min={-180}
        max={180}
        unit="°"
        disabled={disabled}
        onStart={onSliderStart}
        onChange={(v) => onPatch(layer.id, { rotation: v }, false)}
      />
      <PropertySlider
        label="Opacity"
        value={opacity}
        min={0}
        max={100}
        unit="%"
        disabled={disabled}
        onStart={onSliderStart}
        onChange={(v) => onPatch(layer.id, { opacity: v }, false)}
      />
    </div>
  );
}

function TextControls({
  layer,
  onPatch,
  onSliderStart,
}: {
  layer: DesignLayer;
  onPatch: EditorPropertiesPanelProps["onPatch"];
  onSliderStart: () => void;
}) {
  return (
    <div className="space-y-3 rounded-xl border border-card-border/80 bg-surface/30 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">Text</p>
      <textarea
        value={layer.content ?? ""}
        onChange={(e) => onPatch(layer.id, { content: e.target.value }, false)}
        onBlur={() => onSliderStart()}
        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm"
        rows={2}
        aria-label="Text content"
      />
      <select
        value={layer.fontFamily}
        onChange={(e) => onPatch(layer.id, { fontFamily: e.target.value }, true)}
        className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm"
        aria-label="Font family"
      >
        {FONT_OPTIONS.map((f) => (
            <option key={f} value={f}>
              {f.split(",")[0]}
            </option>
          ))}
      </select>
      <PropertySlider
        label="Font size"
        value={layer.fontSize ?? 24}
        min={8}
        max={120}
        unit="px"
        onStart={onSliderStart}
        onChange={(v) => onPatch(layer.id, { fontSize: v }, false)}
      />
      <input
        type="color"
        value={layer.color ?? "#2c2c2c"}
        onChange={(e) => onPatch(layer.id, { color: e.target.value }, true)}
        className="h-10 w-full rounded-lg border border-card-border"
        aria-label="Text color"
      />
      <div className="flex flex-wrap gap-2">
        {(["left", "center", "right"] as const).map((align) => (
          <PanelBtn
            key={align}
            active={layer.align === align}
            onClick={() => onPatch(layer.id, { align }, true)}
          >
            {align.charAt(0).toUpperCase() + align.slice(1)}
          </PanelBtn>
        ))}
        <PanelBtn active={layer.bold} onClick={() => onPatch(layer.id, { bold: !layer.bold }, true)}>
          Bold
        </PanelBtn>
        <PanelBtn active={layer.italic} onClick={() => onPatch(layer.id, { italic: !layer.italic }, true)}>
          Italic
        </PanelBtn>
      </div>
    </div>
  );
}

function ImageControls({
  layer,
  onPatch,
  onReplaceLayer,
  onSliderStart,
}: {
  layer: DesignLayer;
  onPatch: EditorPropertiesPanelProps["onPatch"];
  onReplaceLayer: EditorPropertiesPanelProps["onReplaceLayer"];
  onSliderStart: () => void;
}) {
  const crop = layer.crop;
  const cropActive = crop?.cropActive ?? false;

  return (
    <div className="space-y-3 rounded-xl border border-card-border/80 bg-surface/30 p-3">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">Image</p>
      <div className="grid grid-cols-2 gap-2">
        <PanelBtn
          active={crop?.fitMode === "fit" && !cropActive}
          onClick={() => onReplaceLayer(layer.id, applyFit(layer), true)}
        >
          Fit
        </PanelBtn>
        <PanelBtn
          active={crop?.fitMode === "fill" && !cropActive}
          onClick={() => onReplaceLayer(layer.id, applyFill(layer), true)}
        >
          Fill
        </PanelBtn>
        <PanelBtn active={cropActive} onClick={() => onReplaceLayer(layer.id, toggleCropMode(layer), true)}>
          Crop
        </PanelBtn>
        <PanelBtn onClick={() => onReplaceLayer(layer.id, centerCrop(layer), true)}>Center</PanelBtn>
      </div>
      <PanelBtn className="w-full" onClick={() => onReplaceLayer(layer.id, resetCrop(layer), true)}>
        Reset Crop
      </PanelBtn>

      {cropActive && (
        <div className="space-y-2 border-t border-card-border/60 pt-3">
          <p className="text-[10px] font-medium uppercase tracking-wide text-muted">Crop adjust</p>
          <PropertySlider
            label="Pan horizontal"
            value={crop?.cropX ?? 0}
            min={-50}
            max={50}
            unit="%"
            onStart={onSliderStart}
            onChange={(v) =>
              onPatch(layer.id, { crop: { ...crop!, cropX: v } }, false)
            }
          />
          <PropertySlider
            label="Pan vertical"
            value={crop?.cropY ?? 0}
            min={-50}
            max={50}
            unit="%"
            onStart={onSliderStart}
            onChange={(v) =>
              onPatch(layer.id, { crop: { ...crop!, cropY: v } }, false)
            }
          />
          <PropertySlider
            label="Zoom"
            value={Math.round((crop?.cropScale ?? 1) * 100)}
            min={50}
            max={300}
            unit="%"
            onStart={onSliderStart}
            onChange={(v) =>
              onPatch(layer.id, { crop: { ...crop!, cropScale: v / 100 } }, false)
            }
          />
        </div>
      )}
    </div>
  );
}

function PropertySlider({
  label,
  value,
  min,
  max,
  unit,
  disabled,
  onStart,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit: string;
  disabled?: boolean;
  onStart: () => void;
  onChange: (value: number) => void;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");

  return (
    <div className={cn(disabled && "pointer-events-none opacity-40")}>
      <div className="mb-1 flex items-center justify-between gap-2">
        <label htmlFor={id} className="text-xs font-medium text-foreground">
          {label}
        </label>
        <span className="text-xs tabular-nums text-muted">
          {Math.round(value)}
          {unit}
        </span>
      </div>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        value={value}
        disabled={disabled}
        onPointerDown={onStart}
        onChange={(e) => onChange(Number(e.target.value))}
        className="h-2 w-full cursor-pointer accent-accent"
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
      />
    </div>
  );
}

function PanelBtn({
  children,
  onClick,
  active,
  className,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  className?: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "rounded-lg border px-2.5 py-2 text-xs font-medium transition-colors",
        active
          ? "border-accent bg-accent/10 text-foreground"
          : "border-card-border bg-background text-foreground/80 hover:border-accent/50",
        className,
      )}
    >
      {children}
    </button>
  );
}
