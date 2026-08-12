"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  active: boolean;
};

export function AdminCategoryForm({ category }: { category?: Category }) {
  const router = useRouter();
  const [form, setForm] = useState({
    name: category?.name ?? "",
    slug: category?.slug ?? "",
    description: category?.description ?? "",
    active: category?.active ?? true,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const url = category ? `/api/admin/categories/${category.id}` : "/api/admin/categories";
    const res = await fetch(url, {
      method: category ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Save failed");
      setLoading(false);
      return;
    }
    router.push("/admin/categories");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-4">
      <Link href="/admin/categories" className="text-sm text-muted">← Categories</Link>
      <h1 className="font-display text-2xl font-semibold">{category ? "Edit Category" : "New Category"}</h1>
      {(["name", "slug", "description"] as const).map((key) => (
        <div key={key}>
          <label className="mb-1 block text-sm font-medium capitalize">{key}</label>
          <input
            value={form[key]}
            onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
            className="w-full rounded-lg border border-card-border px-3 py-2 text-sm"
            required={key !== "description"}
          />
        </div>
      ))}
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
