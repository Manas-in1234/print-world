"use client";

export function AdminOrderActions({
  orderId,
  currentStatus,
  statuses,
}: {
  orderId: string;
  currentStatus: string;
  statuses: string[];
}) {
  async function updateStatus(status: string) {
    await fetch("/api/admin/orders/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, status }),
    });
    window.location.reload();
  }

  return (
    <select value={currentStatus} onChange={(e) => updateStatus(e.target.value)} className="rounded-lg border border-card-border px-2 py-1 text-xs">
      {statuses.map((s) => (
        <option key={s} value={s}>{s}</option>
      ))}
    </select>
  );
}
