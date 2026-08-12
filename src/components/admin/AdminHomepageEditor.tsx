"use client";

import { useState } from "react";

export function AdminHomepageEditor({
  initialHero,
  initialFeatured,
}: {
  initialHero: { headline?: string; subheadline?: string };
  initialFeatured: string[];
}) {
  const [headline, setHeadline] = useState(initialHero.headline ?? "Turn Your Ideas Into Something Real.");
  const [subheadline, setSubheadline] = useState(initialHero.subheadline ?? "Premium personalized printing, crafted your way.");
  const [featured, setFeatured] = useState(initialFeatured.join(", "));
  const [msg, setMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function save() {
    setLoading(true);
    setMsg(null);
    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        hero: { headline, subheadline },
        featured_products: featured.split(",").map((s) => s.trim()).filter(Boolean),
      }),
    });
    const data = await res.json();
    setMsg(res.ok ? "Homepage saved." : data.error ?? "Save failed");
    setLoading(false);
  }

  return (
    <div className="max-w-lg space-y-4 rounded-2xl border border-card-border bg-card p-6">
      <h2 className="font-semibold">Hero</h2>
      <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <input value={subheadline} onChange={(e) => setSubheadline(e.target.value)} placeholder="Subheadline" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <h2 className="font-semibold pt-4">Featured product slugs</h2>
      <input value={featured} onChange={(e) => setFeatured(e.target.value)} placeholder="custom-t-shirt, acrylic-photo-frame" className="w-full rounded-lg border border-card-border px-3 py-2 text-sm" />
      <p className="text-xs text-muted">Comma-separated product slugs</p>
      <button type="button" onClick={save} disabled={loading} className="rounded-full bg-foreground px-6 py-3 text-sm text-background disabled:opacity-50">
        {loading ? "Saving…" : "Save Homepage"}
      </button>
      {msg && <p className="text-sm text-accent">{msg}</p>}
    </div>
  );
}
