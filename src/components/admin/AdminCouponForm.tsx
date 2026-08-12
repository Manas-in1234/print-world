"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Coupon = {
  id: string;
  code: string;
  description: string | null;
  discount_type: string;
  discount_value: number;
  min_order: number | null;
  active: boolean;
  expires_at: string | null;
};

export function AdminCouponForm({ coupon }: { coupon?: Coupon }) {
  const router = useRouter();
  const [form, setForm] = useState({
    code: coupon?.code ?? "",
    description: coupon?.description ?? "",
    discount_type: coupon?.discount_type ?? "percent",
    discount_value: coupon?.discount_value ?? 10,
    min_order: coupon?.min_order ?? 0,
    active: coupon?.active ?? true,
    expires_at: coupon?.expires_at?.slice(0, 10) ?? "",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    const url = coupon ? `/api/admin/coupons/${coupon.id}` : "/api/admin/coupons";
    const res = await fetch(url, {
      method: coupon ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        discount_value: Number(form.discount_value),
        min_order: Number(form.min_order),
        expires_at: form.expires_at ? new Date(form.expires_at).toISOString() : null,
      }),
    });
    const data = await res.json();
    if (!res.ok) {
      setError(data.error ?? "Save failed");
      setLoading(false);
      return;
    }
    router.push("/admin/coupons");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="max-w-lg space-y-4">
      <Link href="/admin/coupons" className="text-sm text-muted">← Coupons</Link>
      <h1 className="font-display text-2xl font-semibold">{coupon ? "Edit Coupon" : "New Coupon"}</h1>
      <input placeholder="Code" value={form.code} onChange={(e) => setForm((f) => ({ ...f, code: e.target.value }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm uppercase" required />
      <input placeholder="Description" value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <select value={form.discount_type} onChange={(e) => setForm((f) => ({ ...f, discount_type: e.target.value }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm">
        <option value="percent">Percent</option>
        <option value="fixed">Fixed amount</option>
      </select>
      <input type="number" placeholder="Discount value" value={form.discount_value} onChange={(e) => setForm((f) => ({ ...f, discount_value: Number(e.target.value) }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <input type="number" placeholder="Min order" value={form.min_order} onChange={(e) => setForm((f) => ({ ...f, min_order: Number(e.target.value) }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <input type="date" value={form.expires_at} onChange={(e) => setForm((f) => ({ ...f, expires_at: e.target.value }))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
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
