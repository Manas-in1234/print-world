"use client";

import { useState } from "react";

export function AdminDesignDelete({ designId }: { designId: string }) {
  const [busy, setBusy] = useState(false);

  async function remove() {
    if (!confirm("Delete this saved design?")) return;
    setBusy(true);
    await fetch(`/api/admin/designs/${designId}`, { method: "DELETE" });
    window.location.reload();
  }

  return (
    <button type="button" disabled={busy} onClick={remove} className="text-sm text-red-600 hover:underline disabled:opacity-50">
      Delete
    </button>
  );
}
