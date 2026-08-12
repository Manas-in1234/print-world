"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import type { DbSavedDesign } from "@/types/database";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/lib/cart/cart-context";
import type { DesignState } from "@/lib/editor/types";

interface DesignsListProps {
  designs: DbSavedDesign[];
  priceBySlug: Record<string, number>;
}

export function DesignsList({ designs: initial, priceBySlug }: DesignsListProps) {
  const router = useRouter();
  const { addItem } = useCart();
  const [designs, setDesigns] = useState(initial);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm("Delete this saved design?")) return;
    setBusyId(id);
    const res = await fetch(`/api/designs/${id}`, { method: "DELETE" });
    if (res.ok) {
      setDesigns((list) => list.filter((d) => d.id !== id));
    }
    setBusyId(null);
  }

  function handleAddToCart(design: DbSavedDesign) {
    const data = design.design_data as unknown as DesignState;
    addItem({
      productId: design.product_id ?? "",
      productSlug: design.product_slug,
      productName: design.name,
      imageKey: "poster",
      quantity: 1,
      unitPrice: priceBySlug[design.product_slug] ?? 0,
      customizationData: data,
      savedDesignId: design.id,
    });
    router.push("/cart");
  }

  if (designs.length === 0) {
    return (
      <div className="rounded-2xl border border-card-border bg-card p-12 text-center">
        <p className="text-muted">No saved designs yet.</p>
        <Button href="/products" className="mt-4" variant="secondary">
          Browse Products
        </Button>
      </div>
    );
  }

  return (
    <ul className="grid gap-4 sm:grid-cols-2">
      {designs.map((design) => (
        <li key={design.id} className="rounded-2xl border border-card-border bg-card p-6 shadow-soft">
          <h2 className="font-display text-lg font-semibold">{design.name}</h2>
          <p className="mt-1 text-sm text-muted capitalize">{design.product_slug.replace(/-/g, " ")}</p>
          <p className="mt-1 text-xs text-muted">
            Saved {new Date(design.updated_at).toLocaleDateString()}
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button
              href={`/customize/${design.product_slug}?designId=${design.id}`}
              variant="secondary"
              size="sm"
            >
              Edit
            </Button>
            <button
              type="button"
              onClick={() => handleAddToCart(design)}
              className="rounded-full border border-card-border px-4 py-2 text-sm font-medium hover:border-accent"
            >
              Add to Cart
            </button>
            <button
              type="button"
              disabled={busyId === design.id}
              onClick={() => handleDelete(design.id)}
              className="rounded-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 disabled:opacity-50"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
