import Link from "next/link";
import { notFound } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { formatPrice } from "@/lib/format-price";
import { AdminOrderActions } from "@/components/admin/AdminOrderActions";

export const dynamic = "force-dynamic";

const STATUSES = ["Pending", "Paid", "Processing", "Design Review", "Production", "Packed", "Shipped", "Out for Delivery", "Delivered", "Cancelled"];

interface Props { params: Promise<{ id: string }> }

export default async function AdminOrderDetailPage({ params }: Props) {
  const { id } = await params;
  const admin = createAdminClient();
  if (!admin) notFound();

  const { data: order } = await admin.from("orders").select("*").eq("id", id).maybeSingle();
  if (!order) notFound();

  const { data: items } = await admin.from("order_items").select("*").eq("order_id", id);
  const address = order.shipping_address as { address?: string; city?: string; pincode?: string };

  return (
    <div>
      <Link href="/admin/orders" className="text-sm text-muted hover:text-foreground">← Orders</Link>
      <h1 className="mt-4 font-display text-3xl font-semibold">{order.order_number}</h1>
      <p className="text-sm text-muted">Status: {order.status}</p>
      <div className="mt-4">
        <AdminOrderActions orderId={order.id} currentStatus={order.status} statuses={STATUSES} />
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-card-border bg-card p-6">
          <h2 className="font-semibold">Customer</h2>
          <p className="mt-2 text-sm">{order.customer_name}</p>
          <p className="text-sm text-muted">{order.customer_email}</p>
          <p className="text-sm text-muted">{order.customer_phone}</p>
        </div>
        <div className="rounded-2xl border border-card-border bg-card p-6">
          <h2 className="font-semibold">Shipping</h2>
          <p className="mt-2 text-sm text-muted">{address.address}</p>
          <p className="text-sm text-muted">{address.city} {address.pincode}</p>
          <p className="mt-4 text-lg font-semibold">{formatPrice(Number(order.total))}</p>
        </div>
      </div>
      <ul className="mt-8 divide-y divide-card-border rounded-2xl border border-card-border bg-card">
        {(items ?? []).map((item) => (
          <li key={item.id} className="p-4 text-sm">
            <p className="font-medium">{item.product_name} × {item.quantity}</p>
            <p className="text-muted">{formatPrice(Number(item.unit_price) * item.quantity)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
