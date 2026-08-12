"use client";

import { useState } from "react";

export function AdminSettingsEditor({
  initialShipping,
}: {
  initialShipping: { flatRate?: number; freeThreshold?: number };
}) {
  const [flatRate, setFlatRate] = useState(initialShipping.flatRate ?? 99);
  const [freeThreshold, setFreeThreshold] = useState(initialShipping.freeThreshold ?? 999);
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping: { flatRate: Number(flatRate), freeThreshold: Number(freeThreshold) },
      }),
    });
    const data = await res.json();
    setMsg(res.ok ? "Settings saved." : data.error ?? "Save failed");
    setLoading(false);
  }

  return (
    <div className="max-w-lg space-y-4 rounded-2xl border border-card-border bg-card p-6">
      <h2 className="font-semibold">Shipping</h2>
      <label className="block text-sm">Flat rate (₹)</label>
      <input type="number" value={flatRate} onChange={(e) => setFlatRate(Number(e.target.value))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <label className="block text-sm">Free shipping threshold (₹)</label>
      <input type="number" value={freeThreshold} onChange={(e) => setFreeThreshold(Number(e.target.value))} className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <button type="button" onClick={save} disabled={loading} className="rounded-full bg-foreground px-6 py-3 text-sm text-background disabled:opacity-50">
        {loading ? "Saving…" : "Save Settings"}
      </button>
      {msg && <p className="text-sm text-accent">{msg}</p>}
    </div>
  );
}
