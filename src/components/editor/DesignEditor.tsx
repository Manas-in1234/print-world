"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogProduct, CatalogShape } from "@/lib/catalog/mappers";
import type { ProductEditorConfig } from "@/lib/editor/product-configs";
import {
  createDefaultDesign,
  createImageLayer,
  createTextLayer,
  HAND_STYLES,
  MUG_COLORS,
  NUMBER_STYLES,
  SHIRT_COLORS,
  type DesignLayer,
  type DesignState,
} from "@/lib/editor/types";
import { DesignHistory } from "@/lib/editor/history";
import { normalizeDesignState } from "@/lib/editor/layer-utils";
import { useCartActions } from "@/lib/cart/cart-context";
import { ProductMockup } from "@/components/products/ProductMockup";
import { ClockShapePreview } from "@/components/products/ClockShapePreview";
import { AcrylicPreview } from "@/components/products/AcrylicPreview";
import { ShapeProductImage, ShapeThumbnail } from "@/components/landing/ShapeProductImage";
import { EditorLayerView } from "@/components/editor/EditorLayerView";
import { EditorPropertiesPanel } from "@/components/editor/EditorPropertiesPanel";
import { CLOCK_SHAPE_DEFINITIONS, getClockShapeAlt, toClockShapeId } from "@/data/clock-shapes";
import { resolveShapeImage } from "@/lib/images/product-shape-images";
import type { AcrylicVariant } from "@/types/navigation";
import { cn } from "@/lib/cn";
import { formatPrice } from "@/lib/format-price";

interface DesignEditorProps {
  product: CatalogProduct;
  config: ProductEditorConfig;
  shapes: CatalogShape[];
  initialShapeSlug?: string;
  initialDesign?: DesignState;
  savedDesignId?: string;
  initialAiImage?: string;
}

export function DesignEditor({
  product,
  config,
  shapes,
  initialShapeSlug,
  initialDesign,
  savedDesignId: initialSavedId,
  initialAiImage,
}: DesignEditorProps) {
  const router = useRouter();
  const { addItem } = useCartActions();
  const historyRef = useRef(new DesignHistory());
  const sliderHistoryPushed = useRef(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [design, setDesign] = useState<DesignState>(() => {
    if (initialDesign) return normalizeDesignState(initialDesign);
    const d = createDefaultDesign(product.slug);
    if (initialShapeSlug || config.defaultShape) {
      d.options.shapeSlug = initialShapeSlug ?? config.defaultShape;
    }
    if (config.supportsShirtColor) d.options.shirtColor = SHIRT_COLORS[0];
    if (config.supportsMugColor) d.options.mugColor = MUG_COLORS[0];
    if (config.supportsSize && product.variants.length) {
      d.options.size = product.variants.find((v) => v.variantType === "size")?.name;
    }
    if (config.supportsClockOptions) {
      d.options.handStyle = HAND_STYLES[0];
      d.options.numberStyle = NUMBER_STYLES[0];
    }
    return d;
  });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [savedDesignId, setSavedDesignId] = useState<string | undefined>(initialSavedId);
  const aiImageApplied = useRef(false);

  useEffect(() => {
    if (!initialAiImage || aiImageApplied.current) return;
    aiImageApplied.current = true;
    const layer = createImageLayer(initialAiImage, initialAiImage);
    setDesign((d) => ({ ...d, layers: [...d.layers, layer] }));
    setSelectedId(layer.id);
  }, [initialAiImage]);

  const selectedLayer = design.layers.find((l) => l.id === selectedId);

  const updateDesign = useCallback((updater: (d: DesignState) => DesignState, trackHistory = true) => {
    setDesign((prev) => {
      if (trackHistory) historyRef.current.push(prev);
      return updater(prev);
    });
  }, []);

  const beginSliderEdit = useCallback(() => {
    if (!sliderHistoryPushed.current) {
      historyRef.current.push(design);
      sliderHistoryPushed.current = true;
    }
  }, [design]);

  const endSliderEdit = useCallback(() => {
    sliderHistoryPushed.current = false;
  }, []);

  useEffect(() => {
    const onUp = () => endSliderEdit();
    window.addEventListener("pointerup", onUp);
    return () => window.removeEventListener("pointerup", onUp);
  }, [endSliderEdit]);

  const patchLayer = useCallback(
    (id: string, patch: Partial<DesignLayer>, trackHistory = false) => {
      updateDesign(
        (d) => ({
          ...d,
          layers: d.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)),
        }),
        trackHistory,
      );
    },
    [updateDesign],
  );

  const replaceLayer = useCallback(
    (id: string, layer: DesignLayer, trackHistory = false) => {
      updateDesign(
        (d) => ({
          ...d,
          layers: d.layers.map((l) => (l.id === id ? layer : l)),
        }),
        trackHistory,
      );
    },
    [updateDesign],
  );

  const undo = () => {
    const prev = historyRef.current.undo(design);
    if (prev) setDesign(prev);
  };

  const redo = () => {
    const next = historyRef.current.redo(design);
    if (next) setDesign(next);
  };

  const reset = () => {
    historyRef.current.reset();
    setDesign(createDefaultDesign(product.slug));
    setSelectedId(null);
  };

  const addText = () => {
    const layer = createTextLayer();
    updateDesign((d) => ({ ...d, layers: [...d.layers, layer] }));
    setSelectedId(layer.id);
  };

  const uploadImage = async (file: File) => {
    setUploadError(null);
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: fd });
      const data = await res.json();
      if (!res.ok) {
        setUploadError(data.error ?? "Upload failed. Please try again.");
        return;
      }
      const layer = createImageLayer(data.previewUrl, data.originalUrl);
      updateDesign((d) => ({ ...d, layers: [...d.layers, layer] }));
      setSelectedId(layer.id);
    } catch {
      setUploadError("Upload failed. Check your connection and try again.");
    } finally {
      setUploading(false);
    }
  };

  const deleteSelected = () => {
    if (!selectedId) return;
    updateDesign((d) => ({
      ...d,
      layers: d.layers.filter((l) => l.id !== selectedId),
    }));
    setSelectedId(null);
  };

  const generateAI = async (type: "logo" | "artwork" | "tshirt" | "assistant") => {
    setAiLoading(true);
    setAiError(null);
    try {
      const res = await fetch("/api/ai/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type, prompt: aiPrompt, theme: aiPrompt }),
      });
      const data = await res.json();
      if (!res.ok) {
        setAiError(data.error ?? "AI is not configured yet. Add OPENAI_API_KEY to enable AI generation.");
        return;
      }
      if (type === "assistant") {
        setSaveMsg(data.text);
        return;
      }
      if (data.url) {
        const layer = createImageLayer(data.url, data.url);
        updateDesign((d) => ({ ...d, layers: [...d.layers, layer] }));
        setSelectedId(layer.id);
      }
    } catch {
      setAiError("AI request failed");
    } finally {
      setAiLoading(false);
    }
  };

  const saveDesign = async () => {
    const res = await fetch("/api/designs/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        productId: product.id,
        productSlug: product.slug,
        name: `${product.name} Design`,
        designData: design,
      }),
    });
    const data = await res.json();
    if (res.ok) {
      setSaveMsg("Design saved!");
      if (data.id) setSavedDesignId(data.id);
    } else {
      setSaveMsg(data.error ?? "Save failed — login to save designs");
    }
  };

  const unitPrice = useMemo(() => {
    const shape = shapes.find((s) => s.slug === design.options.shapeSlug);
    const sizeVariant = product.variants.find((v) => v.name === design.options.size);
    if (sizeVariant) return sizeVariant.price;
    if (shape) return shape.startingPrice;
    return product.startingPrice;
  }, [design.options, shapes, product]);

  const addToCart = () => {
    const shape = shapes.find((s) => s.slug === design.options.shapeSlug);
    addItem({
      productId: product.id,
      productSlug: product.slug,
      productName: product.name,
      variantName: design.options.size ?? design.options.material,
      shapeId: shape?.id,
      shapeName: shape?.name,
      imageKey: product.imageKey,
      quantity: 1,
      unitPrice,
      customizationData: design,
      savedDesignId,
    });
    router.push("/cart");
  };

  const shapeSlug = design.options.shapeSlug ?? config.defaultShape;
  const selectedShape = shapes.find((s) => s.slug === shapeSlug);

  return (
    <div className="flex flex-col gap-5 lg:grid lg:grid-cols-[minmax(0,17rem)_1fr_minmax(0,17rem)] lg:gap-6">
      {/* Tools */}
      <aside className="order-1 space-y-4 rounded-2xl border border-card-border bg-card p-4 shadow-soft lg:sticky lg:top-24 lg:max-h-[calc(100vh-7rem)] lg:self-start lg:overflow-y-auto">
        <h2 className="font-display text-lg font-semibold tracking-tight">Tools</h2>
        <div className="grid grid-cols-2 gap-2">
          <ToolBtn icon="text" onClick={addText}>
            Add Text
          </ToolBtn>
          <ToolBtn
            icon="upload"
            onClick={() => document.getElementById("file-upload")?.click()}
            disabled={uploading}
          >
            {uploading ? "Uploading…" : "Upload"}
          </ToolBtn>
          <input
            id="file-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            className="hidden"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) uploadImage(f);
              e.target.value = "";
            }}
          />
          <ToolBtn icon="undo" onClick={undo}>
            Undo
          </ToolBtn>
          <ToolBtn icon="redo" onClick={redo}>
            Redo
          </ToolBtn>
          <ToolBtn icon="reset" onClick={reset}>
            Reset
          </ToolBtn>
          <ToolBtn icon="delete" onClick={deleteSelected} disabled={!selectedId}>
            Delete
          </ToolBtn>
        </div>
        {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}

        {config.supportsShirtColor && (
          <OptionBlock label="Shirt Color">
            <div className="flex flex-wrap gap-2">
              {SHIRT_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform hover:scale-105",
                    design.options.shirtColor === c ? "border-accent ring-2 ring-accent/30" : "border-transparent",
                  )}
                  style={{ background: c }}
                  onClick={() =>
                    updateDesign((d) => ({ ...d, options: { ...d.options, shirtColor: c } }), false)
                  }
                  aria-label={`Shirt color ${c}`}
                />
              ))}
            </div>
          </OptionBlock>
        )}

        {config.supportsMugColor && (
          <OptionBlock label="Mug Color">
            <div className="flex flex-wrap gap-2">
              {MUG_COLORS.map((c) => (
                <button
                  key={c}
                  type="button"
                  className={cn(
                    "h-8 w-8 rounded-full border-2 transition-transform hover:scale-105",
                    design.options.mugColor === c ? "border-accent ring-2 ring-accent/30" : "border-transparent",
                  )}
                  style={{ background: c }}
                  onClick={() =>
                    updateDesign((d) => ({ ...d, options: { ...d.options, mugColor: c } }), false)
                  }
                  aria-label={`Mug color ${c}`}
                />
              ))}
            </div>
          </OptionBlock>
        )}

        {config.supportsShapes && shapes.length > 0 && (
          <OptionBlock label="Shape">
            <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
              {shapes.map((s) => {
                const thumb = resolveShapeImage({
                  productSlug: product.slug,
                  imageKey: product.imageKey,
                  shapeSlug: s.slug,
                  previewKey: s.previewKey,
                  shapeStorageUrl: s.previewKey?.startsWith("http") ? s.previewKey : null,
                  productStorageUrl: product.images[0]?.url,
                  alt:
                    product.slug === "custom-clock"
                      ? getClockShapeAlt(s.name)
                      : `${s.name} shape`,
                });
                return (
                  <ShapeThumbnail
                    key={s.id}
                    resolved={thumb}
                    selected={shapeSlug === s.slug}
                    label={s.name}
                    onClick={() =>
                      updateDesign(
                        (d) => ({ ...d, options: { ...d.options, shapeSlug: s.slug } }),
                        true,
                      )
                    }
                  />
                );
              })}
            </div>
          </OptionBlock>
        )}

        {config.supportsSize && (
          <OptionBlock label="Size">
            <select
              value={design.options.size ?? ""}
              onChange={(e) =>
                updateDesign((d) => ({ ...d, options: { ...d.options, size: e.target.value } }), false)
              }
              className="w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm"
              aria-label="Product size"
            >
              {product.variants
                .filter((v) => v.variantType === "size")
                .map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name} — {formatPrice(v.price)}
                  </option>
                ))}
            </select>
          </OptionBlock>
        )}

        {config.supportsMaterial && (
          <OptionBlock label="Material">
            <select
              value={design.options.material ?? ""}
              onChange={(e) =>
                updateDesign((d) => ({ ...d, options: { ...d.options, material: e.target.value } }), false)
              }
              className="w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm"
              aria-label="Product material"
            >
              <option value="">Default</option>
              {product.variants
                .filter((v) => v.variantType === "material")
                .map((v) => (
                  <option key={v.id} value={v.name}>
                    {v.name}
                  </option>
                ))}
            </select>
          </OptionBlock>
        )}

        {config.supportsClockOptions && (
          <OptionBlock label="Clock Style">
            <div className="space-y-2">
              <select
                value={design.options.handStyle ?? HAND_STYLES[0]}
                onChange={(e) =>
                  updateDesign((d) => ({ ...d, options: { ...d.options, handStyle: e.target.value } }), false)
                }
                className="w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm"
                aria-label="Clock hand style"
              >
                {HAND_STYLES.map((h) => (
                  <option key={h} value={h}>
                    {h} Hands
                  </option>
                ))}
              </select>
              <select
                value={design.options.numberStyle ?? NUMBER_STYLES[0]}
                onChange={(e) =>
                  updateDesign((d) => ({ ...d, options: { ...d.options, numberStyle: e.target.value } }), false)
                }
                className="w-full rounded-xl border border-card-border bg-background px-3 py-2 text-sm"
                aria-label="Clock number style"
              >
                {NUMBER_STYLES.map((n) => (
                  <option key={n} value={n}>
                    {n} Numbers
                  </option>
                ))}
              </select>
            </div>
          </OptionBlock>
        )}

        {config.supportsCardFields && (
          <div className="space-y-2">
            {(
              [
                ["cardName", "Name"],
                ["cardTitle", "Title"],
                ["cardPhone", "Phone"],
                ["cardEmail", "Email"],
              ] as const
            ).map(([key, placeholder]) => (
              <input
                key={key}
                placeholder={placeholder}
                className="w-full rounded-xl border border-card-border px-3 py-2 text-sm"
                value={design.options[key] ?? ""}
                onChange={(e) =>
                  updateDesign((d) => ({ ...d, options: { ...d.options, [key]: e.target.value } }), false)
                }
              />
            ))}
          </div>
        )}

        <div className="border-t border-card-border pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">AI Studio</p>
          <textarea
            value={aiPrompt}
            onChange={(e) => setAiPrompt(e.target.value)}
            placeholder="Describe your design…"
            className="mb-2 w-full rounded-xl border border-card-border px-3 py-2 text-sm"
            rows={2}
            aria-label="AI prompt"
          />
          <div className="grid grid-cols-2 gap-1.5">
            <ToolBtn onClick={() => generateAI("artwork")} disabled={aiLoading}>
              AI Art
            </ToolBtn>
            <ToolBtn onClick={() => generateAI("tshirt")} disabled={aiLoading}>
              AI Tee
            </ToolBtn>
            <ToolBtn onClick={() => generateAI("logo")} disabled={aiLoading}>
              AI Logo
            </ToolBtn>
            <ToolBtn onClick={() => generateAI("assistant")} disabled={aiLoading}>
              Assistant
            </ToolBtn>
          </div>
          {aiError && <p className="mt-2 text-xs text-red-600">{aiError}</p>}
        </div>
      </aside>

      {/* Canvas */}
      <div className="order-2 lg:order-none">
        <div
          className="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-surface to-background shadow-soft"
          style={{ transform: `scale(${design.zoom})`, transformOrigin: "center center" }}
          onClick={() => setSelectedId(null)}
          role="application"
          aria-label="Design preview canvas"
        >
          <EditorPreview
            config={config}
            design={design}
            product={product}
            shapeSlug={shapeSlug}
            previewKey={selectedShape?.previewKey}
          />
          {design.layers.map((layer) => (
            <EditorLayerView
              key={layer.id}
              layer={layer}
              selected={selectedId === layer.id}
              config={config}
              shapeSlug={shapeSlug}
              previewKey={selectedShape?.previewKey}
              onSelect={() => setSelectedId(layer.id)}
              onDragEnd={(id, x, y) => patchLayer(id, { x, y }, true)}
              onCropDrag={(id, cropX, cropY) =>
                patchLayer(
                  id,
                  {
                    crop: {
                      ...(design.layers.find((l) => l.id === id)?.crop ?? {
                        fitMode: "fit",
                        cropScale: 1,
                        cropActive: true,
                      }),
                      cropX,
                      cropY,
                    },
                  },
                  true,
                )
              }
            />
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-3">
          <span className="text-sm text-muted">Zoom</span>
          <input
            type="range"
            min={0.5}
            max={1.5}
            step={0.1}
            value={design.zoom}
            onPointerDown={beginSliderEdit}
            onChange={(e) =>
              updateDesign((d) => ({ ...d, zoom: Number(e.target.value) }), false)
            }
            className="w-36 accent-accent"
            aria-label="Canvas zoom"
          />
        </div>
      </div>

      {/* Properties */}
      <EditorPropertiesPanel
        selectedLayer={selectedLayer}
        onPatch={patchLayer}
        onReplaceLayer={replaceLayer}
        onSliderStart={beginSliderEdit}
        unitPrice={formatPrice(unitPrice)}
        onSave={saveDesign}
        onAddToCart={addToCart}
        saveMsg={saveMsg}
      />
    </div>
  );
}

function OptionBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      {children}
    </div>
  );
}

function ToolBtn({
  children,
  onClick,
  disabled,
  icon,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  icon?: "text" | "upload" | "undo" | "redo" | "reset" | "delete";
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className="flex items-center justify-center gap-1.5 rounded-xl border border-card-border bg-background px-2.5 py-2.5 text-xs font-medium transition-all hover:border-accent hover:bg-surface disabled:cursor-not-allowed disabled:opacity-40"
    >
      {icon && <ToolIcon name={icon} />}
      {children}
    </button>
  );
}

function ToolIcon({ name }: { name: NonNullable<Parameters<typeof ToolBtn>[0]["icon"]> }) {
  const paths: Record<string, string> = {
    text: "M4 6h16M8 6v14m8-14v14M6 20h12",
    upload: "M12 16V4m0 0l-4 4m4-4l4 4M4 20h16",
    undo: "M9 14L4 9l5-5M4 9h12a4 4 0 0 1 0 8h-2",
    redo: "M15 14l5-5-5-5M20 9H8a4 4 0 0 0 0 8h2",
    reset: "M4 4v5h5M20 20v-5h-5M4 9a9 9 0 0 1 15-6M20 15a9 9 0 0 1-15 6",
    delete: "M6 7h12M9 7V5h6v2m-1 0v12H10V7",
  };
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="h-3.5 w-3.5 shrink-0 opacity-70" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d={paths[name]} />
    </svg>
  );
}

function EditorPreview({
  config,
  design,
  product,
  shapeSlug,
  previewKey,
}: {
  config: ProductEditorConfig;
  design: DesignState;
  product: CatalogProduct;
  shapeSlug?: string;
  previewKey?: string | null;
}) {
  if ((config.previewType === "clock" || config.previewType === "frame") && shapeSlug) {
    const clockDef = CLOCK_SHAPE_DEFINITIONS.find((d) => d.slug === shapeSlug);
    const resolved = resolveShapeImage({
      productSlug: product.slug,
      imageKey: product.imageKey,
      shapeSlug,
      previewKey,
      shapeStorageUrl: previewKey?.startsWith("http") ? previewKey : null,
      productStorageUrl: product.images[0]?.url,
      alt:
        config.previewType === "clock"
          ? getClockShapeAlt(clockDef?.name ?? shapeSlug)
          : product.name,
    });

    if (!resolved.useMockup) {
      return (
        <div className="pointer-events-none absolute inset-0 z-0">
          <ShapeProductImage resolved={resolved} sizes="512px" objectFit="contain" />
        </div>
      );
    }

    if (config.previewType === "clock") {
      const shape = toClockShapeId(shapeSlug, previewKey) ?? "round";
      return (
        <div className="pointer-events-none absolute inset-0 z-0">
          <ClockShapePreview shape={shape} />
        </div>
      );
    }

    const variant = (previewKey ?? shapesToPreview(shapeSlug)) as AcrylicVariant;
    return (
      <div className="pointer-events-none absolute inset-0 z-0">
        <AcrylicPreview variant={variant} />
      </div>
    );
  }
  if (config.previewType === "tshirt" && design.options.shirtColor) {
    return (
      <div className="pointer-events-none absolute inset-0 z-0" style={{ background: design.options.shirtColor }}>
        <ProductMockup type="tshirt" />
      </div>
    );
  }
  if (config.previewType === "mug" && design.options.mugColor) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0"
        style={{
          background: `linear-gradient(to bottom, ${design.options.mugColor}, ${design.options.mugColor}dd)`,
        }}
      >
        <ProductMockup type="mug" />
      </div>
    );
  }
  if (config.previewType === "card") {
    return (
      <div className="pointer-events-none absolute inset-0 z-0 flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 p-6">
        <p className="font-display text-lg font-semibold">{design.options.cardName || "Your Name"}</p>
        <p className="text-sm text-muted">{design.options.cardTitle || "Title"}</p>
        <p className="text-xs">{design.options.cardPhone || "Phone"}</p>
        <p className="text-xs">{design.options.cardEmail || "email@example.com"}</p>
      </div>
    );
  }
  return (
    <div className="pointer-events-none absolute inset-0 z-0">
      <ProductMockup type={config.previewType} />
    </div>
  );
}

function shapesToPreview(slug: string): string {
  const map: Record<string, string> = {
    "bean-portrait": "bean-portrait",
    "egg-portrait": "egg-portrait",
    "bean-landscape": "bean-landscape",
    "egg-landscape": "egg-landscape",
    "5-photo-collage": "photo-collage-5",
    "large-square-collage": "large-square-collage",
    "couple-acrylic": "couple-acrylic",
    "hexagon-7-photo": "hexagon-7-photo",
  };
  return map[slug] ?? slug.replace(/-explore$/, "");
}
