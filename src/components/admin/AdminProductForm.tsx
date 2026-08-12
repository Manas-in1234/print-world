"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ProductFormProps {
  product?: {
    id: string;
    name: string;
    slug: string;
    description: string;
    category: string;
    base_price: number;
    featured: boolean;
    active: boolean;
    sort_order: number;
    image: string | null;
  };
}

export function AdminProductForm({ product }: ProductFormProps) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: product?.name ?? "",
    slug: product?.slug ?? "",
    description: product?.description ?? "",
    category: product?.category ?? "home",
    base_price: product?.base_price ?? 0,
    featured: product?.featured ?? false,
    active: product?.active ?? true,
    sort_order: product?.sort_order ?? 99,
    image: product?.image ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const url = product ? `/api/admin/products/${product.id}` : "/api/admin/products";
    const method = product ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, base_price: Number(form.base_price) }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Save failed");
      setLoading(false);
      return;
    }
    router.push("/admin/products");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-xl space-y-4">
      <Link href="/admin/products" className="text-sm text-muted hover:text-foreground">← Products</Link>
      <h1 className="font-display text-2xl font-semibold">{product ? "Edit Product" : "New Product"}</h1>
      {[
        ["name", "Name"],
        ["slug", "Slug"],
        ["description", "Description"],
        ["category", "Category slug"],
        ["base_price", "Base price"],
        ["image", "Image key"],
        ["sort_order", "Sort order"],
      ].map(([key, label]) => (
        <div key={key}>
          <label className="mb-1 block text-sm font-medium">{label}</label>
          <input
            value={String(form[key as keyof typeof form] ?? "")}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="w-full rounded-lg border border-card-border px-3 py-2 text-sm"
          />
        </div>
      ))}
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.featured} onChange={(e) => setForm((f) => ({ ...f, featured: e.target.checked }))} />
        Featured
      </label>
      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.active} onChange={(e) => setForm((f) => ({ ...f, active: e.target.checked }))} />
        Active
      </label>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button type="submit" disabled={loading} className="rounded-full bg-foreground px-6 py-3 text-sm font-medium text-background disabled:opacity-50">
        {loading ? "Saving…" : "Save Product"}
      </button>
    </form>
  );
}
