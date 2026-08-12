"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { formatPrice } from "@/lib/format-price";
import { AdminOrderActions } from "@/components/admin/AdminOrderActions";

type Order = {
  id: string;
  order_number: string;
  customer_name: string;
  customer_email: string;
  total: number;
  status: string;
  created_at: string;
};

const STATUSES = ["Pending", "Paid", "Processing", "Design Review", "Production", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

export function AdminOrdersTable({ orders }: { orders: Order[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return orders;
    return orders.filter(
      (o) =>
        o.order_number.toLowerCase().includes(q) ||
        o.customer_name.toLowerCase().includes(q) ||
        o.customer_email.toLowerCase().includes(q) ||
        o.status.toLowerCase().includes(q),
    );
  }, [orders, query]);

  return (
    <div>
      <input
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search orders…"
        className="mb-4 w-full max-w-md rounded-lg border border-card-border px-4 py-2 text-sm"
      />
      <div className="overflow-x-auto rounded-2xl border border-card-border">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left">
            <tr>
              <th className="p-4">Order</th>
              <th className="p-4">Customer</th>
              <th className="p-4">Total</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((o) => (
              <tr key={o.id} className="border-t border-card-border">
                <td className="p-4">
                  <Link href={`/admin/orders/${o.id}`} className="font-medium hover:text-accent">{o.order_number}</Link>
                </td>
                <td className="p-4">{o.customer_name}<br /><span className="text-muted">{o.customer_email}</span></td>
                <td className="p-4">{formatPrice(Number(o.total))}</td>
                <td className="p-4">{o.status}</td>
                <td className="p-4">
                  <AdminOrderActions orderId={o.id} currentStatus={o.status} statuses={STATUSES} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
