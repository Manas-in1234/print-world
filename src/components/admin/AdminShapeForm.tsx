"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Shape = {
  id: string;
  product_id: string;
  name: string;
  slug: string;
  shape_type: string;
  preview_image: string | null;
  price_adjustment: number;
  sort_order: number;
  active: boolean;
};

export function AdminShapeForm({
  shape,
  products,
}: {
  shape?: Shape;
  products: { id: string; name: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    product_id: shape?.product_id ?? products[0]?.id ?? "",
    name: shape?.name ?? "",
    slug: shape?.slug ?? "",
    shape_type: shape?.shape_type ?? "acrylic",
    preview_image: shape?.preview_image ?? "",
    price_adjustment: shape?.price_adjustment ?? 0,
    sort_order: shape?.sort_order ?? 99,
    active: shape?.active ?? true,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const url = shape ? `/api/admin/shapes/${shape.id}` : "/api/admin/shapes";
    const res = await fetch(url, {
      method: shape ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price_adjustment: Number(form.price_adjustment),
        sort_order: Number(form.sort_order),
        preview_image: form.preview_image || null,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Save failed");
      setLoading(false);
      return;
    }
    router.push("/admin/shapes");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-4">
      <Link href="/admin/shapes" className="text-sm text-muted">← Shapes</Link>
      <h1 className="font-display text-2xl font-semibold">{shape ? "Edit Shape" : "New Shape"}</h1>
      <div>
        <label className="mb-1 block text-sm font-medium">Product</label>
        <select value={form.product_id} onChange={(e) => setForm((f) => ({ ...f, product_id: e.target.value }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm">
          {products.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
      </div>
      {(["name", "slug", "shape_type", "preview_image"] as const).map((key) => (
        <div key={key}>
          <label className="mb-1 block text-sm font-medium capitalize">{key.replace("_", " ")}</label>
          <input value={form[key]} onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" required={key !== "preview_image"} />
        </div>
      ))}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="mb-1 block text-sm font-medium">Price adjustment</label>
          <input type="number" value={form.price_adjustment} onChange={(e) => setForm((f) => ({ ...f, price_adjustment: Number(e.target.value) }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
        </div>
        <div>
          <label className="mb-1 block text-sm font-medium">Sort order</label>
          <input type="number" value={form.sort_order} onChange={(e) => setForm((f) => ({ ...f, sort_order: Number(e.target.value) }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
        </div>
      </div>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
        Active
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="rounded-full bg-foreground px-6 py-3 text-sm text-background disabled:opacity-50">
        {loading ? "Saving…" : "Save"}
      </button>
    </form>
  );
}
