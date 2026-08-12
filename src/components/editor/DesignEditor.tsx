"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { CatalogProduct, CatalogShape } from "@/lib/catalog/mappers";
import type { ProductEditorConfig } from "@/lib/editor/product-configs";
import { toPreviewShapeId } from "@/lib/catalog/shape-utils";
import {
  createDefaultDesign,
  createImageLayer,
  createTextLayer,
  FONT_OPTIONS,
  HAND_STYLES,
  MUG_COLORS,
  NUMBER_STYLES,
  SHIRT_COLORS,
  type DesignLayer,
  type DesignState,
} from "@/lib/editor/types";
import { DesignHistory } from "@/lib/editor/history";
import { useCartActions } from "@/lib/cart/cart-context";
import { Button } from "@/components/ui/Button";
import { ProductMockup } from "@/components/products/ProductMockup";
import { ClockShapePreview } from "@/components/products/ClockShapePreview";
import { AcrylicPreview } from "@/components/products/AcrylicPreview";
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

export function DesignEditor({ product, config, shapes, initialShapeSlug, initialDesign, savedDesignId: initialSavedId, initialAiImage }: DesignEditorProps) {
  const router = useRouter();
  const { addItem } = useCartActions();
  const historyRef = useRef(new DesignHistory());
  const dragStateRef = useRef<{ layerId: string; origX: number; origY: number } | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [design, setDesign] = useState<DesignState>(() => {
    if (initialDesign) return initialDesign;
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

  const updateLayer = (id: string, patch: Partial<DesignLayer>) => {
    updateDesign((d) => ({
      ...d,
      layers: d.layers.map((l) => (l.id === id ? { ...l, ...patch } : l)),
    }), false);
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
        setAiError(null);
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
    }
    else setSaveMsg(data.error ?? "Save failed — login to save designs");
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
    <div className="flex flex-col gap-6 lg:grid lg:grid-cols-[280px_1fr_280px]">
      {/* Toolbar */}
      <aside className="space-y-4 rounded-2xl border border-card-border bg-card p-4 shadow-soft lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-display text-lg font-semibold">Tools</h2>
        <div className="grid grid-cols-2 gap-2">
          <ToolBtn onClick={addText}>Add Text</ToolBtn>
          <ToolBtn onClick={() => document.getElementById("file-upload")?.click()} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </ToolBtn>
          <input id="file-upload" type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={(e) => { const f = e.target.files?.[0]; if (f) uploadImage(f); e.target.value = ""; }} />
          {uploadError && <p className="text-xs text-red-600">{uploadError}</p>}
          <ToolBtn onClick={undo}>Undo</ToolBtn>
          <ToolBtn onClick={redo}>Redo</ToolBtn>
          <ToolBtn onClick={reset}>Reset</ToolBtn>
          <ToolBtn onClick={deleteSelected} disabled={!selectedId}>Delete</ToolBtn>
        </div>

        {config.supportsShirtColor && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Shirt Color</p>
            <div className="flex flex-wrap gap-2">
              {SHIRT_COLORS.map((c) => (
                <button key={c} type="button" className={cn("h-8 w-8 rounded-full border-2", design.options.shirtColor === c ? "border-accent" : "border-transparent")} style={{ background: c }} onClick={() => updateDesign((d) => ({ ...d, options: { ...d.options, shirtColor: c } }), false)} aria-label={`Color ${c}`} />
              ))}
            </div>
          </div>
        )}

        {config.supportsMugColor && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Mug Color</p>
            <div className="flex flex-wrap gap-2">
              {MUG_COLORS.map((c) => (
                <button key={c} type="button" className={cn("h-8 w-8 rounded-full border-2", design.options.mugColor === c ? "border-accent" : "border-transparent")} style={{ background: c }} onClick={() => updateDesign((d) => ({ ...d, options: { ...d.options, mugColor: c } }), false)} />
              ))}
            </div>
          </div>
        )}

        {config.supportsShapes && shapes.length > 0 && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Shape</p>
            <select value={shapeSlug ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, shapeSlug: e.target.value } }), false)} className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm">
              {shapes.map((s) => (
                <option key={s.id} value={s.slug}>{s.name}</option>
              ))}
            </select>
          </div>
        )}

        {config.supportsSize && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Size</p>
            <select value={design.options.size ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, size: e.target.value } }), false)} className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm">
              {product.variants.filter((v) => v.variantType === "size").map((v) => (
                <option key={v.id} value={v.name}>{v.name} — {formatPrice(v.price)}</option>
              ))}
            </select>
          </div>
        )}

        {config.supportsMaterial && (
          <div>
            <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">Material</p>
            <select value={design.options.material ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, material: e.target.value } }), false)} className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm">
              <option value="">Default</option>
              {product.variants.filter((v) => v.variantType === "material").map((v) => (
                <option key={v.id} value={v.name}>{v.name}</option>
              ))}
            </select>
          </div>
        )}

        {config.supportsClockOptions && (
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-wide text-muted">Clock Style</p>
            <select value={design.options.handStyle ?? HAND_STYLES[0]} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, handStyle: e.target.value } }), false)} className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm">
              {HAND_STYLES.map((h) => <option key={h} value={h}>{h} Hands</option>)}
            </select>
            <select value={design.options.numberStyle ?? NUMBER_STYLES[0]} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, numberStyle: e.target.value } }), false)} className="w-full rounded-lg border border-card-border bg-background px-3 py-2 text-sm">
              {NUMBER_STYLES.map((n) => <option key={n} value={n}>{n} Numbers</option>)}
            </select>
          </div>
        )}

        {config.supportsCollage && shapeSlug?.includes("collage") && (
          <p className="text-xs text-muted">Collage layout active for selected shape.</p>
        )}

        {config.supportsCardFields && (
          <div className="space-y-2">
            <input placeholder="Name" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" value={design.options.cardName ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, cardName: e.target.value } }), false)} />
            <input placeholder="Title" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" value={design.options.cardTitle ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, cardTitle: e.target.value } }), false)} />
            <input placeholder="Phone" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" value={design.options.cardPhone ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, cardPhone: e.target.value } }), false)} />
            <input placeholder="Email" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" value={design.options.cardEmail ?? ""} onChange={(e) => updateDesign((d) => ({ ...d, options: { ...d.options, cardEmail: e.target.value } }), false)} />
          </div>
        )}

        <div className="border-t border-card-border pt-4">
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted">AI Studio</p>
          <textarea value={aiPrompt} onChange={(e) => setAiPrompt(e.target.value)} placeholder="Describe your design..." className="mb-2 w-full rounded-lg border border-card-border px-3 py-2 text-sm" rows={2} />
          <div className="grid grid-cols-2 gap-1">
            <ToolBtn onClick={() => generateAI("artwork")} disabled={aiLoading}>AI Art</ToolBtn>
            <ToolBtn onClick={() => generateAI("tshirt")} disabled={aiLoading}>AI Tee</ToolBtn>
            <ToolBtn onClick={() => generateAI("logo")} disabled={aiLoading}>AI Logo</ToolBtn>
            <ToolBtn onClick={() => generateAI("assistant")} disabled={aiLoading}>Assistant</ToolBtn>
          </div>
          {aiError && <p className="mt-2 text-xs text-red-600">{aiError}</p>}
        </div>
      </aside>

      {/* Canvas — preview first on mobile */}
      <div className="relative order-first lg:order-none">
        <div
          className="relative mx-auto aspect-square max-w-xl overflow-hidden rounded-2xl border border-card-border bg-gradient-to-br from-surface to-background shadow-soft origin-center transition-transform"
          style={{ transform: `scale(${design.zoom})` }}
        >
          <EditorPreview config={config} design={design} shapeSlug={shapeSlug} previewKey={selectedShape?.previewKey} />
          {design.layers.map((layer) => (
            <div
              key={layer.id}
              className={cn("absolute cursor-move border-2", selectedId === layer.id ? "border-accent" : "border-transparent")}
              style={{
                left: `${layer.x}%`,
                top: `${layer.y}%`,
                width: layer.width,
                height: layer.height,
                transform: `rotate(${layer.rotation}deg)`,
                zIndex: layer.zIndex + 10,
              }}
              onClick={() => setSelectedId(layer.id)}
              onPointerDown={(e) => {
                e.preventDefault();
                setSelectedId(layer.id);
                const el = e.currentTarget as HTMLElement;
                const startX = e.clientX;
                const startY = e.clientY;
                const origX = layer.x;
                const origY = layer.y;
                dragStateRef.current = { layerId: layer.id, origX, origY };
                let frame = 0;
                let pendingX = origX;
                let pendingY = origY;
                const onMove = (ev: PointerEvent) => {
                  pendingX = origX + ((ev.clientX - startX) / 400) * 100;
                  pendingY = origY + ((ev.clientY - startY) / 400) * 100;
                  if (frame) return;
                  frame = requestAnimationFrame(() => {
                    frame = 0;
                    el.style.left = `${pendingX}%`;
                    el.style.top = `${pendingY}%`;
                  });
                };
                const onUp = () => {
                  if (frame) cancelAnimationFrame(frame);
                  window.removeEventListener("pointermove", onMove);
                  window.removeEventListener("pointerup", onUp);
                  updateLayer(layer.id, { x: pendingX, y: pendingY });
                  dragStateRef.current = null;
                };
                window.addEventListener("pointermove", onMove);
                window.addEventListener("pointerup", onUp);
              }}
            >
              {layer.type === "text" ? (
                <p style={{ fontFamily: layer.fontFamily, fontSize: layer.fontSize, color: layer.color, fontWeight: layer.bold ? "bold" : "normal", fontStyle: layer.italic ? "italic" : "normal", textAlign: layer.align }}>{layer.content}</p>
              ) : layer.src ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={layer.src} alt="" className="h-full w-full object-contain pointer-events-none" />
              ) : null}
            </div>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-center gap-2">
          <span className="text-sm text-muted">Zoom</span>
          <input type="range" min={0.5} max={1.5} step={0.1} value={design.zoom} onChange={(e) => updateDesign((d) => ({ ...d, zoom: Number(e.target.value) }), false)} className="w-32" />
        </div>
      </div>

      {/* Properties */}
      <aside className="space-y-4 rounded-2xl border border-card-border bg-card p-4 shadow-soft lg:sticky lg:top-24 lg:self-start">
        <h2 className="font-display text-lg font-semibold">Properties</h2>
        {selectedLayer?.type === "text" && (
          <div className="space-y-3">
            <textarea value={selectedLayer.content} onChange={(e) => updateLayer(selectedLayer.id, { content: e.target.value })} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" rows={2} />
            <select value={selectedLayer.fontFamily} onChange={(e) => updateLayer(selectedLayer.id, { fontFamily: e.target.value })} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm">
              {FONT_OPTIONS.map((f) => <option key={f} value={f}>{f.split(",")[0]}</option>)}
            </select>
            <input type="number" value={selectedLayer.fontSize} onChange={(e) => updateLayer(selectedLayer.id, { fontSize: Number(e.target.value) })} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" min={8} max={120} />
            <input type="color" value={selectedLayer.color} onChange={(e) => updateLayer(selectedLayer.id, { color: e.target.value })} className="h-10 w-full" />
            <div className="flex gap-2">
              <ToolBtn onClick={() => updateLayer(selectedLayer.id, { align: "left" })}>Left</ToolBtn>
              <ToolBtn onClick={() => updateLayer(selectedLayer.id, { align: "center" })}>Center</ToolBtn>
              <ToolBtn onClick={() => updateLayer(selectedLayer.id, { align: "right" })}>Right</ToolBtn>
            </div>
            <div className="flex gap-2">
              <ToolBtn onClick={() => updateLayer(selectedLayer.id, { bold: !selectedLayer.bold })}>{selectedLayer.bold ? "Bold ✓" : "Bold"}</ToolBtn>
              <ToolBtn onClick={() => updateLayer(selectedLayer.id, { italic: !selectedLayer.italic })}>{selectedLayer.italic ? "Italic ✓" : "Italic"}</ToolBtn>
            </div>
            <input type="range" min={-180} max={180} value={selectedLayer.rotation} onChange={(e) => updateLayer(selectedLayer.id, { rotation: Number(e.target.value) })} />
          </div>
        )}
        {selectedLayer?.type === "image" && (
          <div className="space-y-3">
            <label className="text-xs text-muted">Width</label>
            <input type="range" min={20} max={400} value={selectedLayer.width} onChange={(e) => updateLayer(selectedLayer.id, { width: Number(e.target.value) })} />
            <label className="text-xs text-muted">Height</label>
            <input type="range" min={20} max={400} value={selectedLayer.height} onChange={(e) => updateLayer(selectedLayer.id, { height: Number(e.target.value) })} />
            <label className="text-xs text-muted">Rotation</label>
            <input type="range" min={-180} max={180} value={selectedLayer.rotation} onChange={(e) => updateLayer(selectedLayer.id, { rotation: Number(e.target.value) })} />
          </div>
        )}
        {!selectedLayer && <p className="text-sm text-muted">Select a layer to edit</p>}

        <div className="border-t border-card-border pt-4 space-y-2">
          <p className="text-lg font-semibold">{formatPrice(unitPrice)}</p>
          <Button onClick={saveDesign} variant="secondary" size="sm" className="w-full">Save Design</Button>
          <Button onClick={addToCart} size="lg" className="w-full">Add to Cart</Button>
          {saveMsg && <p className="text-xs text-accent">{saveMsg}</p>}
        </div>
      </aside>
    </div>
  );
}

function ToolBtn({ children, onClick, disabled }: { children: React.ReactNode; onClick?: () => void; disabled?: boolean }) {
  return (
    <button type="button" onClick={onClick} disabled={disabled} className="rounded-lg border border-card-border bg-background px-2 py-2 text-xs font-medium transition-colors hover:border-accent disabled:opacity-40">
      {children}
    </button>
  );
}

function EditorPreview({ config, design, shapeSlug, previewKey }: { config: ProductEditorConfig; design: DesignState; shapeSlug?: string; previewKey?: string | null }) {
  if (config.previewType === "clock" && shapeSlug) {
    const shape = toPreviewShapeId(shapeSlug, previewKey);
    return <ClockShapePreview shape={shape} />;
  }
  if (config.previewType === "frame" && shapeSlug) {
    const variant = (previewKey ?? shapesToPreview(shapeSlug)) as AcrylicVariant;
    return <AcrylicPreview variant={variant} />;
  }
  if (config.previewType === "tshirt" && design.options.shirtColor) {
    return (
      <div className="relative h-full w-full" style={{ background: design.options.shirtColor }}>
        <ProductMockup type="tshirt" />
      </div>
    );
  }
  if (config.previewType === "mug" && design.options.mugColor) {
    return (
      <div className="relative h-full w-full" style={{ background: `linear-gradient(to bottom, ${design.options.mugColor}, ${design.options.mugColor}dd)` }}>
        <ProductMockup type="mug" />
      </div>
    );
  }
  if (config.previewType === "card") {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-neutral-100 p-6">
        <p className="font-display text-lg font-semibold">{design.options.cardName || "Your Name"}</p>
        <p className="text-sm text-muted">{design.options.cardTitle || "Title"}</p>
        <p className="text-xs">{design.options.cardPhone || "Phone"}</p>
        <p className="text-xs">{design.options.cardEmail || "email@example.com"}</p>
      </div>
    );
  }
  return <ProductMockup type={config.previewType} />;
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
